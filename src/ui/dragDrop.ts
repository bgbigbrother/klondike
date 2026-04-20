import type { PileRef } from '../game/types';
import type { IGameEngine } from '../game/gameEngine';
import type { GameState } from '../game/types';
import type { IRenderer } from './renderer';

/** Extended engine interface that includes getState (implemented by GameEngine but not in IGameEngine) */
interface IGameEngineWithState extends IGameEngine {
  getState(): GameState;
}

export interface IDragDropHandler {
  attach(container: HTMLElement): void;
  onDragStart(handler: (source: PileRef, cardIndex: number) => void): void;
  onDrop(handler: (source: PileRef, target: PileRef) => void): void;
}

/** Internal drag state — module-level for reliability across events */
interface DragState {
  source: PileRef;
  cardIndex: number;
  /** Number of cards being dragged (1 for single card, >1 for tableau stack) */
  count: number;
}

let activeDrag: DragState | null = null;

// Rank/suit helpers for building ghost card image URLs
const RANK_TO_IMG: Record<number, string> = {
  1:'A',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9',10:'T',11:'J',12:'Q',13:'K',
};
const SUIT_TO_IMG: Record<string, string> = {
  spades:'S', hearts:'H', diamonds:'D', clubs:'C',
};
function rankMap(r: number): string { return RANK_TO_IMG[r] ?? String(r); }
function suitMap(s: string): string { return SUIT_TO_IMG[s] ?? s[0].toUpperCase(); }

/**
 * Parse a pile element ID into a PileRef.
 * Supported IDs: "stock", "waste", "foundation-N", "tableau-N"
 */
function parsePileId(id: string): PileRef | null {
  if (id === 'stock') return { type: 'stock', index: 0 };
  if (id === 'waste') return { type: 'waste', index: 0 };

  const foundationMatch = id.match(/^foundation-(\d)$/);
  if (foundationMatch) return { type: 'foundation', index: parseInt(foundationMatch[1], 10) };

  const tableauMatch = id.match(/^tableau-(\d)$/);
  if (tableauMatch) return { type: 'tableau', index: parseInt(tableauMatch[1], 10) };

  return null;
}

/**
 * Walk up the DOM from an element to find the nearest pile container element
 * (one with a recognised pile ID), returning both the element and its PileRef.
 */
function findPileFromElement(el: Element | null): { element: HTMLElement; pileRef: PileRef } | null {
  let current: Element | null = el;
  while (current && current !== document.body) {
    const id = (current as HTMLElement).id;
    if (id) {
      const ref = parsePileId(id);
      if (ref) return { element: current as HTMLElement, pileRef: ref };
    }
    current = current.parentElement;
  }
  return null;
}

/**
 * Determine the PileRef for the element that was dragged.
 * For tableau cards, also returns the cardIndex stored in dataset.
 */
function getDragSource(target: EventTarget | null): { pileRef: PileRef; cardIndex: number } | null {
  if (!(target instanceof Element)) return null;

  // Check if the dragged element itself is a card inside a tableau column
  const el = target as HTMLElement;
  if (el.dataset.cardIndex !== undefined && el.dataset.col !== undefined) {
    const col = parseInt(el.dataset.col, 10);
    const cardIndex = parseInt(el.dataset.cardIndex, 10);
    return {
      pileRef: { type: 'tableau', index: col },
      cardIndex,
    };
  }

  // Otherwise find the pile container
  const pile = findPileFromElement(el);
  if (!pile) return null;

  // For non-tableau piles the card index is always the top card (last element)
  // We use -1 as a sentinel meaning "top card"
  return { pileRef: pile.pileRef, cardIndex: -1 };
}

export class DragDropHandler implements IDragDropHandler {
  private engine: IGameEngineWithState;
  private renderer: IRenderer;
  private dragStartHandlers: Array<(source: PileRef, cardIndex: number) => void> = [];
  private dropHandlers: Array<(source: PileRef, target: PileRef) => void> = [];
  private attached = false;
  private container: HTMLElement | null = null;

  constructor(engine: IGameEngineWithState, renderer: IRenderer) {
    this.engine = engine;
    this.renderer = renderer;
  }

  onDragStart(handler: (source: PileRef, cardIndex: number) => void): void {
    this.dragStartHandlers.push(handler);
  }

  onDrop(handler: (source: PileRef, target: PileRef) => void): void {
    this.dropHandlers.push(handler);
  }

  /** Attach all drag-and-drop event listeners to the container (idempotent). */
  attach(container: HTMLElement): void {
    if (this.attached) return;
    this.attached = true;
    this.container = container;

    // Make face-up cards draggable via event delegation on dragstart
    container.addEventListener('dragstart', this._onDragStart.bind(this));
    container.addEventListener('dragover', this._onDragOver.bind(this));
    container.addEventListener('dragenter', this._onDragEnter.bind(this));
    container.addEventListener('dragleave', this._onDragLeave.bind(this));
    container.addEventListener('drop', this._onDrop.bind(this));
    container.addEventListener('dragend', this._onDragEnd.bind(this));
  }

  // ─── Event handlers ────────────────────────────────────────────────────────

  private _onDragStart(e: DragEvent): void {
    const source = getDragSource(e.target);
    if (!source) {
      e.preventDefault();
      return;
    }

    const { pileRef, cardIndex } = source;
    const state = this.engine.getState();

    // Determine how many cards are being dragged
    let count = 1;
    let resolvedCardIndex = cardIndex;

    if (pileRef.type === 'tableau') {
      const col = state.tableau[pileRef.index];
      if (!col || col.length === 0) { e.preventDefault(); return; }

      // If cardIndex is -1 (pile container clicked), drag the top card
      const idx = cardIndex === -1 ? col.length - 1 : cardIndex;
      resolvedCardIndex = idx;

      // The dragged card must be face-up
      if (!col[idx].faceUp) { e.preventDefault(); return; }

      // Include all face-up cards from idx to top of column
      count = col.length - idx;
    } else if (pileRef.type === 'waste') {
      const waste = state.waste;
      if (waste.length === 0) { e.preventDefault(); return; }
      resolvedCardIndex = waste.length - 1;
      count = 1;
    } else if (pileRef.type === 'foundation') {
      const pile = state.foundations[pileRef.index];
      if (pile.length === 0) { e.preventDefault(); return; }
      resolvedCardIndex = pile.length - 1;
      count = 1;
    } else {
      // Stock is not draggable
      e.preventDefault();
      return;
    }

    activeDrag = { source: pileRef, cardIndex: resolvedCardIndex, count };

    // Pass drag info via dataTransfer as a fallback
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', JSON.stringify({ pileRef, cardIndex: resolvedCardIndex }));

      // Build a custom drag ghost showing the full stack of cards being dragged
      if (count > 1 && pileRef.type === 'tableau') {
        const ghost = this._buildStackGhost(state.tableau[pileRef.index].slice(resolvedCardIndex), e.target as HTMLElement);
        if (ghost) {
          document.body.appendChild(ghost);
          // Offset so the grab point aligns with the top card
          e.dataTransfer.setDragImage(ghost, ghost.offsetWidth / 2, 20);
          // Remove after a tick — browser has captured the image by then
          requestAnimationFrame(() => ghost.remove());
        }
      }
    }

    // Notify external listeners
    for (const h of this.dragStartHandlers) h(pileRef, resolvedCardIndex);

    // Dim the source cards while dragging
    requestAnimationFrame(() => {
      if (pileRef.type === 'tableau') {
        const pileEl = this.container?.querySelector<HTMLElement>(`#tableau-${pileRef.index}`);
        if (pileEl) {
          const cardEls = Array.from(pileEl.querySelectorAll<HTMLElement>('.card'));
          cardEls.slice(resolvedCardIndex).forEach(el => el.classList.add('card--dragging'));
        }
      }
    });
  }

  private _onDragOver(e: DragEvent): void {
    const pile = findPileFromElement(e.target as Element);
    if (!pile || !activeDrag) return;

    // Prevent default to signal this is a valid drop zone
    e.preventDefault();
    if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';

    // Determine if the move would be valid
    const valid = this._isValidDrop(activeDrag, pile.pileRef);
    this.renderer.highlightDropTarget(pile.pileRef, valid);
  }

  private _onDragEnter(e: DragEvent): void {
    e.preventDefault();
  }

  private _onDragLeave(e: DragEvent): void {
    // Only clear highlights when leaving a pile element (not its children)
    const pile = findPileFromElement(e.target as Element);
    if (!pile) return;

    // Check if we're moving to a child element — if so, don't clear
    const relatedTarget = e.relatedTarget as Element | null;
    if (relatedTarget && pile.element.contains(relatedTarget)) return;

    this.renderer.clearHighlights();
  }

  private _onDrop(e: DragEvent): void {
    e.preventDefault();
    this.renderer.clearHighlights();

    if (!activeDrag) return;

    const pile = findPileFromElement(e.target as Element);
    if (!pile) return;

    const { source, count } = activeDrag;
    const target = pile.pileRef;

    // No-op: same pile
    if (source.type === target.type && source.index === target.index) return;

    // Notify external drop listeners
    for (const h of this.dropHandlers) h(source, target);

    // Execute the move
    let success: boolean;
    if (count > 1) {
      success = this.engine.moveStack(source, count, target);
    } else {
      success = this.engine.moveCard(source, target);
    }

    if (success) {
      this.renderer.render(this.engine.getState());
    } else {
      // Animate the dragged card back to origin
      this._animateFailedDrop(e.target as Element);
    }

    activeDrag = null;
  }

  private _onDragEnd(_e: DragEvent): void {
    this.renderer.clearHighlights();
    // Remove dimming from any source cards
    this.container?.querySelectorAll('.card--dragging').forEach(el => el.classList.remove('card--dragging'));
    activeDrag = null;
  }

  // ─── Helpers ───────────────────────────────────────────────────────────────

  /**
   * Quick validity check for highlighting — mirrors GameEngine validation
   * without mutating state.
   */
  private _isValidDrop(drag: DragState, target: PileRef): boolean {
    const state = this.engine.getState();
    const { source, cardIndex, count } = drag;

    // Same pile → no-op
    if (source.type === target.type && source.index === target.index) return false;

    // Get the bottom card of the dragged stack
    let bottomCard;
    if (source.type === 'tableau') {
      const col = state.tableau[source.index];
      if (!col || cardIndex >= col.length) return false;
      bottomCard = col[cardIndex];
    } else if (source.type === 'waste') {
      const waste = state.waste;
      if (waste.length === 0) return false;
      bottomCard = waste[waste.length - 1];
    } else if (source.type === 'foundation') {
      const pile = state.foundations[source.index];
      if (pile.length === 0) return false;
      bottomCard = pile[pile.length - 1];
    } else {
      return false;
    }

    if (target.type === 'tableau') {
      const destCol = state.tableau[target.index];
      if (!destCol) return false;
      if (destCol.length === 0) return bottomCard.rank === 13; // King on empty
      const topCard = destCol[destCol.length - 1];
      if (!topCard.faceUp) return false;
      const SUIT_COLOR: Record<string, 'red' | 'black'> = {
        diamonds: 'red', hearts: 'red', clubs: 'black', spades: 'black',
      };
      return bottomCard.rank === topCard.rank - 1 &&
             SUIT_COLOR[bottomCard.suit] !== SUIT_COLOR[topCard.suit];
    }

    if (target.type === 'foundation') {
      if (count !== 1) return false;
      const foundationPile = state.foundations[target.index];
      if (!foundationPile) return false;
      if (foundationPile.length === 0) return bottomCard.rank === 1;
      const topCard = foundationPile[foundationPile.length - 1];
      return bottomCard.suit === topCard.suit && bottomCard.rank === topCard.rank + 1;
    }

    return false;
  }

  /**
   * Build an off-screen ghost element that renders the full dragged stack
   * so the browser uses it as the drag image.
   */
  private _buildStackGhost(cards: import('../game/types').Card[], draggedEl: HTMLElement): HTMLElement | null {
    if (!cards || cards.length === 0) return null;

    // Measure the card width from the dragged element itself
    const cardWidth = draggedEl.closest<HTMLElement>('.pile')?.offsetWidth
      ?? draggedEl.offsetWidth
      ?? 80;

    // Vertical offset between cards in the ghost — infer from live DOM positions
    // by looking at the top values of consecutive cards in the source column
    let FACE_UP_OFFSET = 28;
    let FACE_DOWN_OFFSET = 16;
    const pileEl = draggedEl.closest<HTMLElement>('.pile');
    if (pileEl) {
      const cardEls = Array.from(pileEl.querySelectorAll<HTMLElement>('.card'));
      if (cardEls.length >= 2) {
        const t0 = parseInt(cardEls[0].style.top || '0', 10);
        const t1 = parseInt(cardEls[1].style.top || '0', 10);
        FACE_DOWN_OFFSET = t1 - t0 || FACE_DOWN_OFFSET;
      }
      // Find first face-up card offset
      for (let i = 0; i < cardEls.length - 1; i++) {
        const state = this.engine.getState();
        const col = pileEl.id.match(/tableau-(\d)/);
        if (col) {
          const colCards = state.tableau[parseInt(col[1], 10)];
          if (colCards[i]?.faceUp) {
            const t0 = parseInt(cardEls[i].style.top || '0', 10);
            const t1 = parseInt(cardEls[i + 1].style.top || '0', 10);
            FACE_UP_OFFSET = t1 - t0 || FACE_UP_OFFSET;
            break;
          }
        }
      }
    }

    const totalHeight = cards.reduce((h, c, i) =>
      h + (i < cards.length - 1 ? (c.faceUp ? FACE_UP_OFFSET : FACE_DOWN_OFFSET) : 0), 0)
      + (draggedEl.offsetHeight || 112);

    const ghost = document.createElement('div');
    ghost.style.cssText = `
      position: fixed;
      top: -9999px;
      left: -9999px;
      width: ${cardWidth}px;
      height: ${totalHeight}px;
      pointer-events: none;
    `;

    let top = 0;
    for (const card of cards) {
      // Clone the actual rendered card element if possible, else create img
      const src = `/cards/${card.faceUp ? (rankMap(card.rank) + suitMap(card.suit)) : 'Red_Back'}.svg`;
      const img = document.createElement('img');
      img.src = src;
      img.style.cssText = `
        position: absolute;
        top: ${top}px;
        left: 0;
        width: ${cardWidth}px;
        border-radius: 4px;
        box-shadow: 2px 2px 6px rgba(0,0,0,0.4);
      `;
      ghost.appendChild(img);
      top += card.faceUp ? FACE_UP_OFFSET : FACE_DOWN_OFFSET;
    }

    return ghost;
  }

  /**
   * Add a CSS return-animation class to the dragged element briefly,
   * then remove it. This gives visual feedback for a failed drop.
   */
  private _animateFailedDrop(target: Element | null): void {
    if (!target) return;

    // Find the card element (the dragged element or its closest card ancestor)
    let cardEl: HTMLElement | null = null;
    if (target instanceof HTMLElement) {
      cardEl = target.closest<HTMLElement>('.card') ?? target;
    }
    if (!cardEl) return;

    cardEl.classList.add('card--return-animation');
    const onEnd = () => {
      cardEl!.classList.remove('card--return-animation');
      cardEl!.removeEventListener('animationend', onEnd);
    };
    cardEl.addEventListener('animationend', onEnd);

    // Fallback: remove class after 600ms in case animationend doesn't fire
    setTimeout(() => {
      cardEl!.classList.remove('card--return-animation');
    }, 600);
  }
}
