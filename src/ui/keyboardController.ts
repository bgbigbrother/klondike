import type { Card, PileRef } from '../game/types';
import type { GameEngine } from '../game/gameEngine';
import type { IRenderer } from './renderer';
import type { LayoutConfig } from './layout';

export interface KeyboardState {
  cursor: PileRef | null;
  selection: KeyboardSelection | null;
}

export interface KeyboardSelection {
  from: PileRef;
  cards: Card[];        // snapshot of selected cards (for rendering)
  count: number;        // number of cards currently selected (1..faceUpCount)
  faceUpCount: number;  // total contiguous face-up cards in the source column at selection time
}

export interface IKeyboardController {
  attach(): void;
  detach(): void;
  getState(): KeyboardState;
  /** Called by main.ts after a new game starts externally (e.g. button click) */
  onNewGame(): void;
}

/** Tag names of interactive form elements that should suppress key handling */
const INTERACTIVE_TAGS = new Set(['INPUT', 'SELECT', 'TEXTAREA', 'BUTTON']);

/** Ordered top-row pile sequence */
const TOP_ROW_SEQUENCE: PileRef[] = [
  { type: 'stock',      index: 0 },
  { type: 'waste',      index: 0 },
  { type: 'foundation', index: 0 },
  { type: 'foundation', index: 1 },
  { type: 'foundation', index: 2 },
  { type: 'foundation', index: 3 },
];

export class KeyboardController implements IKeyboardController {
  private engine: GameEngine;
  private renderer: IRenderer;
  private afterAction: () => void;
  private onNewGameCallback: (() => void) | undefined;

  private state: KeyboardState = {
    cursor: null,
    selection: null,
  };

  private attached = false;
  private boundHandler: (e: KeyboardEvent) => void;

  constructor(engine: GameEngine, renderer: IRenderer, afterAction: () => void, onNewGame?: () => void) {
    this.engine = engine;
    this.renderer = renderer;
    this.afterAction = afterAction;
    this.onNewGameCallback = onNewGame;
    this.boundHandler = this._handleKeyDown.bind(this);
  }

  attach(): void {
    if (this.attached) return; // idempotent
    this.attached = true;
    this.state = {
      cursor: { type: 'stock', index: 0 },
      selection: null,
    };
    document.addEventListener('keydown', this.boundHandler);
  }

  detach(): void {
    if (!this.attached) return; // no-op if not attached
    this.attached = false;
    document.removeEventListener('keydown', this.boundHandler);
  }

  getState(): KeyboardState {
    return this.state;
  }

  onNewGame(): void {
    this.state = {
      cursor: { type: 'stock', index: 0 },
      selection: null,
    };
  }

  private _isInputFocused(): boolean {
    const el = document.activeElement;
    if (!el) return false;
    const tag = el.tagName;
    if (INTERACTIVE_TAGS.has(tag)) return true;
    // Also check contenteditable
    if ((el as HTMLElement).isContentEditable) return true;
    return false;
  }

  private _handleKeyDown(e: KeyboardEvent): void {
    // Input guard: ignore events when a form element has focus
    if (this._isInputFocused()) return;

    const { key, metaKey, ctrlKey } = e;

    // Task 4.1 — New game shortcut: F2 or Meta+R
    if (key === 'F2' || (metaKey && key === 'r')) {
      e.preventDefault();
      if (this.onNewGameCallback) this.onNewGameCallback();
      return;
    }

    // Task 4.3 — Undo shortcut: Ctrl+Z (non-macOS) or Meta+Z (macOS)
    if ((ctrlKey && !metaKey && key === 'z') || (metaKey && key === 'z')) {
      e.preventDefault();
      if (this.engine.canUndo()) {
        this.engine.undo();
        this.afterAction();
      }
      return;
    }

    // Task 4.5 — Auto-move shortcut: A key
    if (key === 'a' || key === 'A') {
      e.preventDefault();
      this.engine.autoMoveAllToFoundation();
      this.afterAction();
      return;
    }

    // Task 7.1 / 7.5 — Space key: selection and action dispatch
    if (key === ' ') {
      e.preventDefault();
      this._handleSpace();
      return;
    }

    // Task 7.5 — Escape key: cancel selection
    if (key === 'Escape') {
      e.preventDefault();
      this._handleEscape();
      return;
    }

    // Task 5.1 — Left/right navigation within a zone
    if (key === 'ArrowLeft' || key === 'ArrowRight') {
      e.preventDefault();
      const cursor = this.state.cursor;
      if (!cursor) return;
      const topRowIdx = this._getTopRowIndex(cursor);
      if (topRowIdx !== -1) {
        // In top row
        const newIdx = key === 'ArrowRight'
          ? Math.min(topRowIdx + 1, TOP_ROW_SEQUENCE.length - 1)
          : Math.max(topRowIdx - 1, 0);
        this.state.cursor = { ...TOP_ROW_SEQUENCE[newIdx] };
      } else if (cursor.type === 'tableau') {
        // In tableau
        const newCol = key === 'ArrowRight'
          ? Math.min(cursor.index + 1, 6)
          : Math.max(cursor.index - 1, 0);
        this.state.cursor = { type: 'tableau', index: newCol };
      }
      this.renderer.setCursorHighlight(this.state.cursor);
      return;
    }

    // Task 5.3 — Up/down navigation between zones
    if (key === 'ArrowUp' || key === 'ArrowDown') {
      e.preventDefault();
      const cursor = this.state.cursor;
      if (!cursor) return;
      const layout = this.renderer.getLayout();
      if (key === 'ArrowUp') {
        const { selection } = this.state;
        // Resize selection only when cursor is still on the source tableau column
        if (selection && selection.from.type === 'tableau' &&
            cursor.type === 'tableau' && cursor.index === selection.from.index) {
          if (selection.count < selection.faceUpCount) {
            const newCount = selection.count + 1;
            const gameState = this.engine.getState();
            const col = gameState.tableau[selection.from.index];
            const newCards = col.slice(col.length - newCount);
            this.state.selection = {
              ...selection,
              count: newCount,
              cards: [...newCards],
            };
            this.renderer.render(this.engine.getState(), this.getState());
          }
          // else: count === faceUpCount → no-op
          return;
        }
        // Zone navigation (also used when selection is active but cursor moved away)
        if (cursor.type === 'tableau') {
          const colCenter = layout.positions.tableau[cursor.index].x + layout.cardWidth / 2;
          this.state.cursor = this._nearestTopRowPile(colCenter, layout);
        }
      } else if (key === 'ArrowDown') {
        const { selection } = this.state;
        // Resize selection only when cursor is still on the source tableau column
        if (selection && selection.from.type === 'tableau' &&
            cursor.type === 'tableau' && cursor.index === selection.from.index) {
          if (selection.count > 1) {
            const newCount = selection.count - 1;
            const gameState = this.engine.getState();
            const col = gameState.tableau[selection.from.index];
            const newCards = col.slice(col.length - newCount);
            this.state.selection = {
              ...selection,
              count: newCount,
              cards: [...newCards],
            };
            this.renderer.render(this.engine.getState(), this.getState());
          }
          // else: count === 1 → no-op
          return;
        }
        // No tableau selection active — existing zone navigation
        const topRowIdx = this._getTopRowIndex(cursor);
        if (topRowIdx !== -1) {
          if (cursor.type === 'stock' || cursor.type === 'waste') {
            this.state.cursor = { type: 'tableau', index: 0 };
          } else if (cursor.type === 'foundation') {
            const foundCenter = layout.positions.foundations[cursor.index].x + layout.cardWidth / 2;
            const col = this._nearestTableauColumn(foundCenter, layout);
            this.state.cursor = { type: 'tableau', index: col };
          }
        }
      }
      this.renderer.setCursorHighlight(this.state.cursor);
      return;
    }
  }

  /** Returns the index of the cursor in the top-row sequence, or -1 if not in top row */
  private _getTopRowIndex(cursor: PileRef): number {
    for (let i = 0; i < TOP_ROW_SEQUENCE.length; i++) {
      const ref = TOP_ROW_SEQUENCE[i];
      if (ref.type === cursor.type && ref.index === cursor.index) return i;
    }
    return -1;
  }

  /** Returns the nearest top-row pile given a horizontal center x */
  private _nearestTopRowPile(centerX: number, layout: LayoutConfig): PileRef {
    const centers: number[] = [
      layout.positions.stock.x + layout.cardWidth / 2,
      layout.positions.waste.x + layout.cardWidth / 2,
      ...layout.positions.foundations.map(p => p.x + layout.cardWidth / 2),
    ];
    let bestIdx = 0;
    let bestDist = Math.abs(centers[0] - centerX);
    for (let i = 1; i < centers.length; i++) {
      const dist = Math.abs(centers[i] - centerX);
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = i;
      }
    }
    return { ...TOP_ROW_SEQUENCE[bestIdx] };
  }

  /** Returns the nearest tableau column index given a horizontal center x */
  private _nearestTableauColumn(centerX: number, layout: LayoutConfig): number {
    let bestCol = 0;
    let bestDist = Math.abs(layout.positions.tableau[0].x + layout.cardWidth / 2 - centerX);
    for (let i = 1; i < 7; i++) {
      const dist = Math.abs(layout.positions.tableau[i].x + layout.cardWidth / 2 - centerX);
      if (dist < bestDist) {
        bestDist = dist;
        bestCol = i;
      }
    }
    return bestCol;
  }

  // Task 7.1 — Space key handler
  private _handleSpace(): void {
    const { cursor, selection } = this.state;
    if (!cursor) return;

    if (!selection) {
      // No selection active — initiate selection or action
      switch (cursor.type) {
        case 'stock': {
          // Req 7.1: draw from stock
          this.engine.drawFromStock();
          this.renderer.render(this.engine.getState(), this.getState());
          this.afterAction();
          break;
        }
        case 'waste': {
          // Req 7.2: select top card of waste
          const gameState = this.engine.getState();
          const waste = gameState.waste;
          if (waste.length === 0) return; // no card to select
          const topCard = waste[waste.length - 1];
          this.state.selection = {
            from: { type: 'waste', index: 0 },
            cards: [topCard],
            count: 1,
            faceUpCount: 1,
          };
          this.renderer.render(this.engine.getState(), this.getState());
          break;
        }
        case 'tableau': {
          // Req 7.3/7.4: select contiguous face-up stack; count starts at 1 when faceUpCount > 1
          const gameState = this.engine.getState();
          const col = gameState.tableau[cursor.index];
          const faceUpCount = this._countContiguousFaceUp(col);
          if (faceUpCount === 0) return; // no face-up cards
          const count = faceUpCount > 1 ? 1 : faceUpCount;
          const cards = col.slice(col.length - count);
          this.state.selection = {
            from: { type: 'tableau', index: cursor.index },
            cards: [...cards],
            count,
            faceUpCount,
          };
          this.renderer.render(this.engine.getState(), this.getState());
          break;
        }
        case 'foundation': {
          // Select top card of foundation if non-empty
          const gameState = this.engine.getState();
          const pile = gameState.foundations[cursor.index];
          if (pile.length === 0) return; // empty foundation, no-op
          const topCard = pile[pile.length - 1];
          this.state.selection = {
            from: { type: 'foundation', index: cursor.index },
            cards: [topCard],
            count: 1,
            faceUpCount: 1,
          };
          this.renderer.render(this.engine.getState(), this.getState());
          break;
        }
      }
    } else {
      // Selection active — attempt to move to cursor destination
      const from = selection.from;
      const to = cursor;

      let success = false;
      if (selection.count === 1) {
        success = this.engine.moveCard(from, to);
      } else {
        success = this.engine.moveStack(from, selection.count, to);
      }

      if (success) {
        // Req 7.5: valid move — clear selection, call afterAction
        this.state.selection = null;
        this.renderer.render(this.engine.getState(), this.getState());
        this.afterAction();
      } else {
        // Req 7.6: invalid move — keep selection, flash error highlight
        this.renderer.highlightDropTarget(cursor, false);
        setTimeout(() => {
          this.renderer.clearHighlights();
        }, 300);
      }
    }
  }

  // Task 7.5 — Escape key handler
  private _handleEscape(): void {
    const { selection } = this.state;
    if (!selection) return; // no-op when no selection

    // Req 7.7: cancel selection and return cursor to source pile
    const from = selection.from;
    this.state.selection = null;
    this.state.cursor = { ...from };
    this.renderer.render(this.engine.getState(), this.getState());
  }

  /** Count contiguous face-up cards from the top (end) of a tableau column */
  private _countContiguousFaceUp(col: Card[]): number {
    let count = 0;
    for (let i = col.length - 1; i >= 0; i--) {
      if (col[i].faceUp) {
        count++;
      } else {
        break;
      }
    }
    return count;
  }
}
