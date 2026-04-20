/**
 * Card animation helpers.
 *
 * All animations work by creating a temporary "flying" card element that is
 * appended to document.body (so it sits above everything), animated via CSS
 * transitions, then removed once the transition ends.  The real game state is
 * rendered normally after the animation completes (or in parallel for deal).
 */

import type { Card, PileRef, GameState } from '../game/types';
import type { LayoutConfig } from './layout';

// ─── Shared helpers ───────────────────────────────────────────────────────────

const RANK_MAP: Record<number, string> = {
  1:'A',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9',10:'T',11:'J',12:'Q',13:'K',
};
const SUIT_MAP: Record<string, string> = {
  spades:'S', hearts:'H', diamonds:'D', clubs:'C',
};

function cardImgSrc(card: Card, faceUp: boolean): string {
  if (!faceUp) return '/cards/Red_Back.svg';
  return `/cards/${RANK_MAP[card.rank]}${SUIT_MAP[card.suit]}.svg`;
}

/** Absolute bounding rect of a pile element relative to the viewport */
function pileRect(pileEl: HTMLElement): DOMRect {
  return pileEl.getBoundingClientRect();
}

/** Create a flying card element positioned at (x, y) in viewport coords */
function createFlyingCard(
  card: Card,
  faceUp: boolean,
  x: number,
  y: number,
  width: number,
  height: number,
): HTMLElement {
  const el = document.createElement('img') as HTMLImageElement;
  el.src = cardImgSrc(card, faceUp);
  el.style.cssText = `
    position: fixed;
    left: ${x}px;
    top: ${y}px;
    width: ${width}px;
    height: ${height}px;
    pointer-events: none;
    z-index: 9999;
    border-radius: 6px;
    will-change: transform, opacity;
    transition: none;
  `;
  return el;
}

function delay(ms: number): Promise<void> {
  return new Promise(r => setTimeout(r, ms));
}

// ─── 1. Deal animation ────────────────────────────────────────────────────────

/**
 * Animate the initial deal like a real dealer: one card at a time, flying from
 * the stock to each tableau slot in deal order (col 0, col 1, … col 6, then
 * col 1 again for row 1, etc.).  Each card lands and stays visible as a placed
 * card before the next one is launched.
 */
export async function animateDeal(
  container: HTMLElement,
  layout: LayoutConfig,
  tableau: GameState['tableau'],
  renderFn: () => void,
  onCardLand?: () => void,
): Promise<void> {
  const stockEl = container.querySelector<HTMLElement>('#stock');
  if (!stockEl) { renderFn(); return; }

  const { cardWidth, cardHeight, tableauFaceDownOffset } = layout;

  // Hide tableau cards — we'll build them up card-by-card during the animation
  for (let col = 0; col < 7; col++) {
    const el = container.querySelector<HTMLElement>(`#tableau-${col}`);
    if (el) el.innerHTML = '';
  }

  // Klondike deal order: row 0 across all cols, then row 1 across cols 1-6, etc.
  // i.e. (col=0,row=0), (col=1,row=0), …, (col=6,row=0),
  //      (col=1,row=1), (col=2,row=1), …, (col=6,row=1), …
  const sequence: Array<{ col: number; row: number }> = [];
  for (let row = 0; row < 7; row++) {
    for (let col = row; col < 7; col++) {
      sequence.push({ col, row });
    }
  }

  // Track how many cards have been placed in each column so far
  const colCardCount = new Array(7).fill(0);

  const DURATION = 50; // ms flight time per card
  const PAUSE    = 10;  // ms pause after landing before next card

  const actualWidth = container.clientWidth;
  const contentWidth = Math.min(actualWidth, 1024);
  const xOffset = Math.floor((actualWidth - contentWidth) / 2);
  const appRect = container.getBoundingClientRect();

  for (const { col, row } of sequence) {
    const stockRect = pileRect(stockEl);
    const colPos = layout.positions.tableau[col];

    // Compute the vertical offset for this card in its column.
    // Cards placed so far in this column: colCardCount[col].
    // All cards except the very last in each column are face-down.
    // The last card (row === col) is face-up — but during the deal flight
    // everything flies face-down; we reveal face-up only when it lands.
    let topOffset = 0;
    for (let r = 0; r < colCardCount[col]; r++) {
      // r-th card in this column: face-up only if it's the last card of the column
      // At deal time, only row===col is face-up, but we haven't placed it yet,
      // so all previously placed cards are face-down.
      topOffset += tableauFaceDownOffset;
    }

    const destViewX = appRect.left + colPos.x + xOffset;
    const destViewY = appRect.top  + colPos.y + topOffset;

    // Flying card (always back-face during flight)
    const flyEl = document.createElement('img') as HTMLImageElement;
    flyEl.src = '/cards/Red_Back.svg';
    flyEl.style.cssText = `
      position: fixed;
      left: ${stockRect.left}px;
      top: ${stockRect.top}px;
      width: ${cardWidth}px;
      height: ${cardHeight}px;
      pointer-events: none;
      z-index: 9999;
      border-radius: 6px;
    `;
    document.body.appendChild(flyEl);

    // Force reflow, then animate
    flyEl.getBoundingClientRect();
    flyEl.style.transition = `left ${DURATION}ms cubic-bezier(0.22,0.61,0.36,1),
                               top  ${DURATION}ms cubic-bezier(0.22,0.61,0.36,1)`;
    flyEl.style.left = `${destViewX}px`;
    flyEl.style.top  = `${destViewY}px`;

    await delay(DURATION);
    flyEl.remove();
    onCardLand?.();

    // Place a permanent card element in the tableau column at this position
    const card = tableau[col][row];
    const placedEl = document.createElement('img') as HTMLImageElement;
    placedEl.src = cardImgSrc(card, card.faceUp);
    placedEl.className = 'card';
    placedEl.style.cssText = `
      position: absolute;
      top: ${topOffset}px;
      left: 0;
      width: ${cardWidth}px;
      pointer-events: none;
    `;

    const colEl = container.querySelector<HTMLElement>(`#tableau-${col}`);
    if (colEl) colEl.appendChild(placedEl);

    colCardCount[col]++;

    await delay(PAUSE);
  }

  // All cards placed — do the real render to show correct card faces
  renderFn();
}

// ─── 2. Stock flip animation ──────────────────────────────────────────────────

/**
 * Animate a card being drawn from the stock: the card does a 180° Y-axis flip
 * from back-face to front-face while moving from the stock to the waste pile.
 *
 * @param container  The #app element
 * @param card       The card that was drawn (already face-up in game state)
 * @param layout     Current layout config
 * @param renderFn   Called after the animation to show the real state
 */
export async function animateStockFlip(
  container: HTMLElement,
  card: Card,
  layout: LayoutConfig,
  renderFn: () => void,
): Promise<void> {
  const stockEl  = container.querySelector<HTMLElement>('#stock');
  const wasteEl  = container.querySelector<HTMLElement>('#waste');
  if (!stockEl || !wasteEl) { renderFn(); return; }

  const stockRect = pileRect(stockEl);
  const wasteRect = pileRect(wasteEl);
  const { cardWidth, cardHeight } = layout;

  const FLIP_HALF   = 150; // ms for each half of the flip
  const TRAVEL_MS   = 300; // ms for the lateral movement

  // Create a wrapper that handles the 3-D perspective
  const wrapper = document.createElement('div');
  wrapper.style.cssText = `
    position: fixed;
    left: ${stockRect.left}px;
    top: ${stockRect.top}px;
    width: ${cardWidth}px;
    height: ${cardHeight}px;
    pointer-events: none;
    z-index: 9999;
    perspective: 600px;
    will-change: left, top;
    transition: none;
  `;

  // Inner element that actually flips
  const inner = document.createElement('div');
  inner.style.cssText = `
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transition: none;
  `;

  // Back face
  const backImg = document.createElement('img') as HTMLImageElement;
  backImg.src = '/cards/Red_Back.svg';
  backImg.style.cssText = `
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    border-radius: 6px;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  `;

  // Front face
  const frontImg = document.createElement('img') as HTMLImageElement;
  frontImg.src = cardImgSrc(card, true);
  frontImg.style.cssText = `
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    border-radius: 6px;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    transform: rotateY(180deg);
  `;

  inner.appendChild(backImg);
  inner.appendChild(frontImg);
  wrapper.appendChild(inner);
  document.body.appendChild(wrapper);

  // Force reflow
  wrapper.getBoundingClientRect();

  // Start lateral movement to waste pile simultaneously
  wrapper.style.transition = `left ${TRAVEL_MS}ms cubic-bezier(0.25,0.46,0.45,0.94),
                               top  ${TRAVEL_MS}ms cubic-bezier(0.25,0.46,0.45,0.94)`;
  wrapper.style.left = `${wasteRect.left}px`;
  wrapper.style.top  = `${wasteRect.top}px`;

  // Flip: first half (0 → 90°) then second half (90° → 180°)
  inner.style.transition = `transform ${FLIP_HALF}ms ease-in`;
  inner.style.transform  = 'rotateY(90deg)';

  await delay(FLIP_HALF);

  inner.style.transition = `transform ${FLIP_HALF}ms ease-out`;
  inner.style.transform  = 'rotateY(180deg)';

  await delay(FLIP_HALF + 20);
  wrapper.remove();
  renderFn();
}

// ─── 3. Foundation move animation ────────────────────────────────────────────

/**
 * Animate a card flying from its source pile to the target foundation.
 * Used for double-click auto-move and the Auto-Move button.
 *
 * @param container   The #app element
 * @param card        The card being moved
 * @param from        Source PileRef
 * @param to          Destination PileRef (foundation)
 * @param layout      Current layout config
 * @param renderFn    Called after animation to show the real state
 */
export async function animateToFoundation(
  container: HTMLElement,
  card: Card,
  from: PileRef,
  to: PileRef,
  layout: LayoutConfig,
  renderFn: () => void,
): Promise<void> {
  // Resolve source element and get the top card element's position
  let sourceEl: HTMLElement | null = null;
  if (from.type === 'tableau') {
    sourceEl = container.querySelector<HTMLElement>(`#tableau-${from.index}`);
  } else if (from.type === 'waste') {
    sourceEl = container.querySelector<HTMLElement>('#waste');
  } else if (from.type === 'foundation') {
    sourceEl = container.querySelector<HTMLElement>(`#foundation-${from.index}`);
  }

  const destEl = container.querySelector<HTMLElement>(`#foundation-${to.index}`);
  if (!sourceEl || !destEl) { renderFn(); return; }

  // For tableau, find the top card element to get its exact position
  let srcRect: DOMRect;
  if (from.type === 'tableau') {
    const cards = sourceEl.querySelectorAll<HTMLElement>('.card');
    const topCard = cards[cards.length - 1];
    srcRect = topCard ? pileRect(topCard) : pileRect(sourceEl);
  } else {
    const cards = sourceEl.querySelectorAll<HTMLElement>('.card');
    const topCard = cards[cards.length - 1];
    srcRect = topCard ? pileRect(topCard) : pileRect(sourceEl);
  }

  const destRect = pileRect(destEl);
  const { cardWidth, cardHeight } = layout;

  const DURATION = 280;

  const el = createFlyingCard(card, true, srcRect.left, srcRect.top, cardWidth, cardHeight);
  document.body.appendChild(el);

  // Force reflow
  el.getBoundingClientRect();

  el.style.transition = `left ${DURATION}ms cubic-bezier(0.25,0.46,0.45,0.94),
                          top  ${DURATION}ms cubic-bezier(0.25,0.46,0.45,0.94),
                          transform ${DURATION}ms ease`;
  el.style.left = `${destRect.left}px`;
  el.style.top  = `${destRect.top}px`;
  // Slight arc via scale
  el.style.transform = 'scale(1.08)';

  await delay(DURATION * 0.6);
  el.style.transform = 'scale(1)';

  await delay(DURATION * 0.4 + 20);
  el.remove();
  renderFn();
}
