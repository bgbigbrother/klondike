import type { GameState, Move } from './types';
import { SCORE } from './types';

/**
 * Returns true when all 4 foundations each have 13 cards (Ace through King).
 */
export function checkWin(state: GameState): boolean {
  return state.foundations.every(pile => pile.length === 13);
}

/**
 * Returns true when the stock is empty and every card in every tableau column
 * is face-up (meaning all remaining cards are visible and playable).
 */
export function canAutoComplete(state: GameState): boolean {
  if (state.stock.length > 0) return false;
  return state.tableau.every(col => col.every(card => card.faceUp));
}

/**
 * Iterates valid foundation moves from tableau and waste until the game is won,
 * calling onMove for each move made.
 */
export function autoComplete(state: GameState, onMove: (move: Move) => void): void {
  while (!checkWin(state)) {
    let moved = false;

    if (state.waste.length > 0) {
      const result = tryMoveToFoundation(state, 'waste', 0, onMove);
      if (result) { moved = true; continue; }
    }

    for (let col = 0; col < state.tableau.length; col++) {
      const column = state.tableau[col];
      if (column.length === 0) continue;
      const result = tryMoveToFoundation(state, 'tableau', col, onMove);
      if (result) { moved = true; break; }
    }

    if (!moved) break;
  }
}

function tryMoveToFoundation(
  state: GameState,
  pileType: 'waste' | 'tableau',
  pileIndex: number,
  onMove: (move: Move) => void,
): boolean {
  const sourcePile = pileType === 'waste' ? state.waste : state.tableau[pileIndex];
  if (!sourcePile || sourcePile.length === 0) return false;

  const card = sourcePile[sourcePile.length - 1];
  if (!card.faceUp) return false;

  for (let fi = 0; fi < state.foundations.length; fi++) {
    const foundation = state.foundations[fi];
    const valid =
      foundation.length === 0
        ? card.rank === 1
        : card.suit === foundation[foundation.length - 1].suit &&
          card.rank === foundation[foundation.length - 1].rank + 1;

    if (valid) {
      sourcePile.splice(sourcePile.length - 1, 1);

      let flippedCard = false;
      if (pileType === 'tableau') {
        const col = state.tableau[pileIndex];
        if (col.length > 0 && !col[col.length - 1].faceUp) {
          col[col.length - 1].faceUp = true;
          flippedCard = true;
        }
      }

      foundation.push({ ...card, faceUp: true });

      let scoreDelta = SCORE.TO_FOUNDATION;
      if (flippedCard) scoreDelta += SCORE.FLIP_TABLEAU;
      state.score = Math.max(0, state.score + scoreDelta);
      state.moves += 1;

      onMove({
        from: { type: pileType, index: pileIndex },
        to: { type: 'foundation', index: fi },
        cards: [{ ...card }],
        scoreDelta,
        flippedCard,
      });

      return true;
    }
  }

  return false;
}
