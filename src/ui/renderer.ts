import type { Card, GameState, PileRef, Suit, Rank } from '../game/types';
import type { KeyboardState, KeyboardSelection } from './keyboardController';
import { calculateLayout, type LayoutConfig } from './layout';
import { t } from '../i18n';

// Vertical offset (px) between stacked cards in tableau — overridden by layout
let TABLEAU_CARD_OFFSET = 28;
let TABLEAU_FACEDOWN_OFFSET = 16;

// cardsJS images base URL (relative to public root)
let cardsImagesUrl = '/cards/';
let cardsJsAvailable = true;

// Rank number → cardsJS rank letter/number
const RANK_MAP: Record<Rank, string> = {
  1:  'A',
  2:  '2',
  3:  '3',
  4:  '4',
  5:  '5',
  6:  '6',
  7:  '7',
  8:  '8',
  9:  '9',
  10: 'T',
  11: 'J',
  12: 'Q',
  13: 'K',
};

// Suit → cardsJS suit letter
const SUIT_MAP: Record<Suit, string> = {
  spades:   'S',
  hearts:   'H',
  diamonds: 'D',
  clubs:    'C',
};

// Unicode suit symbols for CSS fallback
const SUIT_SYMBOL: Record<Suit, string> = {
  spades:   '♠',
  hearts:   '♥',
  diamonds: '♦',
  clubs:    '♣',
};

const RANK_LABEL: Record<Rank, string> = {
  1:  'A',
  2:  '2',
  3:  '3',
  4:  '4',
  5:  '5',
  6:  '6',
  7:  '7',
  8:  '8',
  9:  '9',
  10: '10',
  11: 'J',
  12: 'Q',
  13: 'K',
};

/** Returns the cardsJS SVG filename for a card (e.g. "AS", "KH", "Red_Back") */
function cardImageId(card: Card): string {
  if (!card.faceUp) return 'Red_Back';
  return RANK_MAP[card.rank] + SUIT_MAP[card.suit];
}

/** Create an <img> element for a card using cardsJS SVG */
function createCardImgElement(card: Card): HTMLElement {
  if (cardsJsAvailable) {
    const img = document.createElement('img');
    img.className = 'card';
    img.src = `${cardsImagesUrl}${cardImageId(card)}.svg`;
    img.alt = card.faceUp ? `${RANK_LABEL[card.rank]}${SUIT_SYMBOL[card.suit]}` : t().cardBack;
    img.draggable = card.faceUp;
    // On error, fall back to CSS card
    img.onerror = () => {
      cardsJsAvailable = false;
      const fallback = createFallbackCardElement(card);
      img.replaceWith(fallback);
    };
    return img;
  }
  return createFallbackCardElement(card);
}

/** CSS fallback card element using Unicode suit symbols */
function createFallbackCardElement(card: Card): HTMLElement {
  const div = document.createElement('div');
  div.className = 'card card--fallback';
  div.draggable = card.faceUp;
  if (!card.faceUp) {
    div.classList.add('card--back');
    div.textContent = '🂠';
    return div;
  }
  const suit = card.suit;
  const isRed = suit === 'hearts' || suit === 'diamonds';
  div.classList.add(isRed ? 'card--red' : 'card--black');
  div.innerHTML = `<span class="card-rank">${RANK_LABEL[card.rank]}</span><span class="card-suit">${SUIT_SYMBOL[suit]}</span>`;
  return div;
}

export interface IRenderer {
  render(state: GameState, keyboardState?: KeyboardState): void;
  highlightDropTarget(pileRef: PileRef, valid: boolean): void;
  clearHighlights(): void;
  animateAutoComplete(moves: Array<{ from: PileRef; to: PileRef; cards: Card[] }>): Promise<void>;
  setCursorHighlight(pileRef: PileRef | null): void;
  setSelectionHighlight(selection: KeyboardSelection | null, state: GameState): void;
  getLayout(): LayoutConfig;
}

export class Renderer implements IRenderer {
  private container: HTMLElement;
  private layout: LayoutConfig;
  private lastState: GameState | null = null;

  constructor(container: HTMLElement = document.getElementById('app')!) {
    this.container = container;
    const containerWidth = container.clientWidth > 0 ? container.clientWidth : Math.min(window.innerWidth, 1024);
    this.layout = calculateLayout(Math.min(containerWidth, 1024), window.innerHeight);
    this._applyLayout();

    const onResize = () => {
      const w = this.container.clientWidth > 0 ? this.container.clientWidth : Math.min(window.innerWidth, 1024);
      this.layout = calculateLayout(Math.min(w, 1024), window.innerHeight);
      this._applyLayout();
      if (this.lastState) this.render(this.lastState);
    };

    window.addEventListener('resize', onResize);
    document.addEventListener('fullscreenchange', onResize);

    // Recalculate after first paint when clientWidth is available
    requestAnimationFrame(() => {
      const w = this.container.clientWidth > 0 ? this.container.clientWidth : Math.min(window.innerWidth, 1024);
      this.layout = calculateLayout(Math.min(w, 1024), window.innerHeight);
      this._applyLayout();
      if (this.lastState) this.render(this.lastState);
    });

    // orientationchange fires on mobile before the viewport has updated,
    // so we wait a frame after it settles before recalculating.
    window.addEventListener('orientationchange', () => setTimeout(onResize, 100));
  }

  /** Apply computed layout as CSS custom properties on the container */
  private _applyLayout(): void {
    const l = this.layout;
    const root = this.container;
    root.style.setProperty('--card-width', `${l.cardWidth}px`);
    root.style.setProperty('--card-height', `${l.cardHeight}px`);
    root.style.setProperty('--pile-gap', `${l.gap}px`);
    root.style.setProperty('--layout-padding', `${l.padding}px`);

    // Update mutable offsets used by _renderTableau
    TABLEAU_CARD_OFFSET = l.tableauFaceUpOffset;
    TABLEAU_FACEDOWN_OFFSET = l.tableauFaceDownOffset;

    // When the container is wider than the 1024px max-width (e.g. fullscreen),
    // CSS centers the content box but absolute positions are relative to the
    // container's actual left edge. Compute the centering offset so piles stay
    // visually centered regardless of container width.
    const actualWidth = this.container.clientWidth;
    const contentWidth = Math.min(actualWidth, 1024);
    const xOffset = Math.floor((actualWidth - contentWidth) / 2);

    // Position each pile element absolutely using computed positions
    this._positionPile('#stock', l.positions.stock.x + xOffset, l.positions.stock.y);
    this._positionPile('#waste', l.positions.waste.x + xOffset, l.positions.waste.y);
    for (let i = 0; i < 4; i++) {
      this._positionPile(`#foundation-${i}`, l.positions.foundations[i].x + xOffset, l.positions.foundations[i].y);
    }
    for (let i = 0; i < 7; i++) {
      this._positionPile(`#tableau-${i}`, l.positions.tableau[i].x + xOffset, l.positions.tableau[i].y);
    }
  }

  private _positionPile(selector: string, x: number, y: number): void {
    const el = this.container.querySelector<HTMLElement>(selector);
    if (!el) return;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.width = `${this.layout.cardWidth}px`;
    el.style.minHeight = `${this.layout.cardHeight}px`;
  }

  render(state: GameState, keyboardState?: KeyboardState): void {
    this.lastState = state;
    this._renderStock(state);
    this._renderWaste(state);
    this._renderFoundations(state);
    this._renderTableau(state);
    if (keyboardState) {
      this.setCursorHighlight(keyboardState.cursor);
      this.setSelectionHighlight(keyboardState.selection, state);
    }
  }

  private _renderStock(state: GameState): void {
    const el = this.container.querySelector<HTMLElement>('#stock');
    if (!el) return;
    el.innerHTML = '';
    if (state.stock.length > 0) {
      const cardEl = createCardImgElement({ suit: 'spades', rank: 1, faceUp: false });
      cardEl.style.position = 'absolute';
      el.appendChild(cardEl);
    } else {
      // Show the pass-limit label on the empty stock placeholder
      const label = el.dataset.passLabel ?? '∞';
      const placeholder = document.createElement('div');
      placeholder.className = 'stock-empty-label';
      placeholder.textContent = el.dataset.stockLocked === 'true' ? '🚫' : label;
      el.appendChild(placeholder);
    }
  }

  private _renderWaste(state: GameState): void {
    const el = this.container.querySelector<HTMLElement>('#waste');
    if (!el) return;
    el.innerHTML = '';
    if (state.waste.length > 0) {
      const topCard = state.waste[state.waste.length - 1];
      const cardEl = createCardImgElement(topCard);
      cardEl.style.position = 'absolute';
      el.appendChild(cardEl);
    }
  }

  private _renderFoundations(state: GameState): void {
    // Suit symbols shown as placeholders on empty foundation piles
    const FOUNDATION_SUITS: string[] = ['♠', '♥', '♦', '♣'];

    for (let i = 0; i < 4; i++) {
      const el = this.container.querySelector<HTMLElement>(`#foundation-${i}`);
      if (!el) continue;
      el.innerHTML = '';
      const pile = state.foundations[i];
      if (pile.length > 0) {
        const topCard = pile[pile.length - 1];
        const cardEl = createCardImgElement(topCard);
        cardEl.style.position = 'absolute';
        el.appendChild(cardEl);
      } else {
        // Show all 4 suits so the player knows any suit can go here
        const placeholder = document.createElement('div');
        placeholder.className = 'foundation-placeholder';
        for (const suit of FOUNDATION_SUITS) {
          const span = document.createElement('span');
          span.textContent = suit;
          span.className = suit === '♥' || suit === '♦' ? 'suit-red' : 'suit-black';
          placeholder.appendChild(span);
        }
        el.appendChild(placeholder);
      }
    }
  }

  private _renderTableau(state: GameState): void {
    for (let col = 0; col < 7; col++) {
      const el = this.container.querySelector<HTMLElement>(`#tableau-${col}`);
      if (!el) continue;
      el.innerHTML = '';
      const column = state.tableau[col];
      let topOffset = 0;
      for (let i = 0; i < column.length; i++) {
        const card = column[i];
        const cardEl = createCardImgElement(card);
        cardEl.style.position = 'absolute';
        cardEl.style.top = `${topOffset}px`;
        cardEl.style.left = '0';
        cardEl.style.width = `${this.layout.cardWidth}px`;
        // Store card index for drag-drop use
        cardEl.dataset.cardIndex = String(i);
        cardEl.dataset.col = String(col);
        el.appendChild(cardEl);
        // Advance offset: face-down cards get smaller offset
        topOffset += card.faceUp ? TABLEAU_CARD_OFFSET : TABLEAU_FACEDOWN_OFFSET;
      }
      // Ensure the pile container is tall enough
      const minHeight = topOffset + this.layout.cardHeight;
      el.style.minHeight = `${minHeight}px`;
    }
  }

  setCursorHighlight(pileRef: PileRef | null): void {
    // Remove existing cursor highlight
    this.container.querySelectorAll('.pile--keyboard-cursor').forEach(el => {
      el.classList.remove('pile--keyboard-cursor');
    });
    if (pileRef) {
      const el = this._getPileElement(pileRef);
      if (el) el.classList.add('pile--keyboard-cursor');
    }
  }

  setSelectionHighlight(selection: KeyboardSelection | null, _state: GameState): void {
    // Remove existing selection highlight
    this.container.querySelectorAll('.card--keyboard-selected').forEach(el => {
      el.classList.remove('card--keyboard-selected');
    });
    if (!selection) return;
    const pileEl = this._getPileElement(selection.from);
    if (!pileEl) return;
    const cardEls = pileEl.querySelectorAll<HTMLElement>('.card');
    const total = cardEls.length;
    const start = total - selection.count;
    cardEls.forEach((el, i) => {
      if (i >= start) el.classList.add('card--keyboard-selected');
    });
  }

  highlightDropTarget(pileRef: PileRef, valid: boolean): void {
    const el = this._getPileElement(pileRef);
    if (!el) return;
    el.classList.remove('pile--valid-target', 'pile--invalid-target');
    el.classList.add(valid ? 'pile--valid-target' : 'pile--invalid-target');
  }

  clearHighlights(): void {
    this.container.querySelectorAll('.pile--valid-target, .pile--invalid-target').forEach(el => {
      el.classList.remove('pile--valid-target', 'pile--invalid-target');
    });
  }

  getLayout(): LayoutConfig {
    return this.layout;
  }

  async animateAutoComplete(moves: Array<{ from: PileRef; to: PileRef; cards: Card[] }>): Promise<void> {
    for (const move of moves) {
      const fromEl = this._getPileElement(move.from);
      const toEl = this._getPileElement(move.to);
      if (!fromEl || !toEl) continue;

      // Brief visual flash on destination
      toEl.classList.add('pile--valid-target');
      await delay(120);
      toEl.classList.remove('pile--valid-target');
    }
  }

  private _getPileElement(pileRef: PileRef): HTMLElement | null {
    switch (pileRef.type) {
      case 'stock':      return this.container.querySelector('#stock');
      case 'waste':      return this.container.querySelector('#waste');
      case 'foundation': return this.container.querySelector(`#foundation-${pileRef.index}`);
      case 'tableau':    return this.container.querySelector(`#tableau-${pileRef.index}`);
    }
  }
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
