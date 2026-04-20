import type { GameState, PileRef, Card, GameOptions } from './types';
import { SCORE, SUIT_COLOR } from './types';
import { createDeck, shuffle } from './deck';
import { UndoManager } from './undoManager';
import { applyScoreDelta } from './scoring';

export interface IGameEngine {
  newGame(): void;
  drawFromStock(): void;
  recycleWaste(): void;
  moveCard(from: PileRef, to: PileRef): boolean;
  moveStack(from: PileRef, count: number, to: PileRef): boolean;
  autoMoveToFoundation(from: PileRef): boolean;
  autoMoveAllToFoundation(): number;
  autoComplete(): void;
  undo(): void;
  canUndo(): boolean;
}

export function getInitialState(options: GameOptions = { stockPassLimit: 0, faceUpMode: false }): GameState {
  const deck = shuffle(createDeck());

  const tableau = Array.from({ length: 7 }, () => [] as GameState['tableau'][number]);
  let deckIndex = 0;

  for (let col = 0; col < 7; col++) {
    for (let row = 0; row <= col; row++) {
      const card = { ...deck[deckIndex++] };
      card.faceUp = options.faceUpMode ? true : row === col;
      tableau[col].push(card);
    }
  }

  const stock = deck.slice(deckIndex).map(c => ({ ...c, faceUp: false }));

  return {
    tableau,
    foundations: [[], [], [], []],
    stock,
    waste: [],
    score: 0,
    moves: 0,
    stockPasses: 0,
  };
}

export class GameEngine implements IGameEngine {
  private state: GameState;
  private undoManager: UndoManager;
  private options: GameOptions;

  constructor(options: GameOptions = { stockPassLimit: 0, faceUpMode: false }) {
    this.options = options;
    this.state = getInitialState(options);
    this.undoManager = new UndoManager();
  }

  getState(): GameState {
    return this.state;
  }

  setOptions(options: GameOptions): void {
    this.options = options;
  }

  newGame(options?: GameOptions): void {
    if (options) this.options = options;
    this.state = getInitialState(this.options);
    this.undoManager.clear();
  }

  drawFromStock(): void {
    const { stock, waste } = this.state;

    if (stock.length === 0 && waste.length === 0) return;

    if (stock.length === 0) {
      const limit = this.options.stockPassLimit;
      if (limit > 0 && this.state.stockPasses >= limit) return;
      this.recycleWaste();
      return;
    }

    const card = stock.pop()!;
    const prevFaceUp = card.faceUp;
    card.faceUp = true;
    waste.push(card);

    this.undoManager.push({
      execute() {},
      undo: () => {
        waste.pop();
        card.faceUp = prevFaceUp;
        stock.push(card);
      },
    });
  }

  recycleWaste(): void {
    const { stock, waste } = this.state;

    if (stock.length === 0 && waste.length === 0) return;

    const recycledCards = waste.splice(0, waste.length).reverse();
    recycledCards.forEach(c => { c.faceUp = false; });
    stock.push(...recycledCards);

    const prevScore = this.state.score;
    const prevPasses = this.state.stockPasses;
    this.state.score = applyScoreDelta(this.state, SCORE.RECYCLE_WASTE);
    this.state.stockPasses += 1;

    this.undoManager.push({
      execute() {},
      undo: () => {
        const restored = stock.splice(stock.length - recycledCards.length, recycledCards.length).reverse();
        restored.forEach(c => { c.faceUp = true; });
        waste.push(...restored);
        this.state.score = prevScore;
        this.state.stockPasses = prevPasses;
      },
    });
  }

  moveCard(from: PileRef, to: PileRef): boolean {
    return this.moveStack(from, 1, to);
  }

  moveStack(from: PileRef, count: number, to: PileRef): boolean {
    const sourcePile = this._getPile(from);
    if (!sourcePile || sourcePile.length < count || count < 1) return false;

    const cards = sourcePile.slice(sourcePile.length - count);

    if (cards.some(c => !c.faceUp)) return false;

    const bottomCard = cards[0];

    if (to.type === 'tableau') {
      const destCol = this.state.tableau[to.index];
      if (!destCol) return false;

      if (destCol.length === 0) {
        if (bottomCard.rank !== 13) return false;
      } else {
        const topCard = destCol[destCol.length - 1];
        if (!topCard.faceUp) return false;
        if (bottomCard.rank !== topCard.rank - 1) return false;
        if (SUIT_COLOR[bottomCard.suit] === SUIT_COLOR[topCard.suit]) return false;
      }
    } else if (to.type === 'foundation') {
      if (count !== 1) return false;
      const card = cards[0];
      const foundationPile = this.state.foundations[to.index];
      if (!foundationPile) return false;

      if (foundationPile.length === 0) {
        if (card.rank !== 1) return false;
      } else {
        const topCard = foundationPile[foundationPile.length - 1];
        if (card.suit !== topCard.suit) return false;
        if (card.rank !== topCard.rank + 1) return false;
      }
    } else {
      return false;
    }

    sourcePile.splice(sourcePile.length - count, count);

    let flippedCard = false;
    if (from.type === 'tableau') {
      const srcCol = this.state.tableau[from.index];
      if (srcCol.length > 0 && !srcCol[srcCol.length - 1].faceUp) {
        srcCol[srcCol.length - 1].faceUp = true;
        flippedCard = true;
      }
    }

    const destPile = this._getPile(to)!;
    destPile.push(...cards);

    let scoreDelta = 0;
    if (to.type === 'foundation') {
      scoreDelta += SCORE.TO_FOUNDATION;
    } else if (to.type === 'tableau') {
      if (from.type === 'waste') scoreDelta += SCORE.WASTE_TO_TABLEAU;
      else if (from.type === 'foundation') scoreDelta += SCORE.FOUNDATION_TO_TABLEAU;
    }
    if (flippedCard) scoreDelta += SCORE.FLIP_TABLEAU;

    const prevScore = this.state.score;
    this.state.score = applyScoreDelta(this.state, scoreDelta);
    this.state.moves += 1;

    this.undoManager.push({
      execute() {},
      undo: () => {
        destPile.splice(destPile.length - count, count);

        if (flippedCard && from.type === 'tableau') {
          const srcCol = this.state.tableau[from.index];
          if (srcCol.length > 0) {
            srcCol[srcCol.length - 1].faceUp = false;
          }
        }

        sourcePile.push(...cards);

        this.state.score = prevScore;
        this.state.moves -= 1;
      },
    });

    return true;
  }

  private _getPile(ref: PileRef): Card[] | undefined {
    switch (ref.type) {
      case 'tableau':    return this.state.tableau[ref.index];
      case 'foundation': return this.state.foundations[ref.index];
      case 'waste':      return this.state.waste;
      case 'stock':      return this.state.stock;
    }
  }

  autoMoveToFoundation(from: PileRef): boolean {
    const sourcePile = this._getPile(from);
    if (!sourcePile || sourcePile.length === 0) return false;

    const card = sourcePile[sourcePile.length - 1];
    if (!card.faceUp) return false;

    for (let i = 0; i < this.state.foundations.length; i++) {
      const result = this.moveCard(from, { type: 'foundation', index: i });
      if (result) return true;
    }
    return false;
  }

  autoMoveAllToFoundation(): number {
    let totalMoved = 0;
    let movedInPass: number;

    do {
      movedInPass = 0;

      if (this.autoMoveToFoundation({ type: 'waste', index: 0 })) {
        movedInPass++;
      }

      for (let i = 0; i < this.state.tableau.length; i++) {
        if (this.autoMoveToFoundation({ type: 'tableau', index: i })) {
          movedInPass++;
        }
      }

      totalMoved += movedInPass;
    } while (movedInPass > 0);

    return totalMoved;
  }

  autoComplete(): void { /* TODO */ }
  undo(): void { this.undoManager.undo(); }
  canUndo(): boolean { return this.undoManager.canUndo(); }

  isStockLocked(): boolean {
    const limit = this.options.stockPassLimit;
    return this.state.stock.length === 0 &&
           limit > 0 &&
           this.state.stockPasses >= limit;
  }

  getOptions(): GameOptions { return this.options; }
}
