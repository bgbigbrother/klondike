/**
 * Responsive layout calculator for Klondike Solitaire.
 */

export interface PilePosition {
  x: number;
  y: number;
}

export interface LayoutConfig {
  cardWidth: number;
  cardHeight: number;
  gap: number;
  padding: number;
  tableauFaceUpOffset: number;
  tableauFaceDownOffset: number;
  topRowY: number;
  tableauY: number;
  positions: {
    stock: PilePosition;
    waste: PilePosition;
    foundations: PilePosition[];
    tableau: PilePosition[];
  };
}

const CARD_ASPECT_RATIO = 112 / 80;
const BASE_PADDING = 12;
const BASE_GAP_RATIO = 0.10;
const BASE_HEADER_HEIGHT = 0;
const BASE_TOP_ROW_BOTTOM_GAP = 16;

export const TOOLBAR_HEIGHT = 60;

function maxTableauColumnHeight(
  cardHeight: number,
  tableauFaceUpOffset: number,
  tableauFaceDownOffset: number,
): number {
  return 6 * tableauFaceDownOffset + 7 * tableauFaceUpOffset + cardHeight;
}

export function calculateLayout(viewportWidth: number, viewportHeight: number): LayoutConfig {
  const padding = viewportWidth < 480 ? 6 : BASE_PADDING;
  const usableWidth = viewportWidth - 2 * padding;

  let cardWidth = Math.floor(usableWidth / (7 + 6 * BASE_GAP_RATIO));

  for (let attempt = 0; attempt < 200; attempt++) {
    const cardHeight = Math.floor(cardWidth * CARD_ASPECT_RATIO);
    const tableauFaceUpOffset = Math.max(12, Math.floor(cardHeight * 0.25));
    const tableauFaceDownOffset = Math.max(8, Math.floor(cardHeight * 0.14));
    const topRowY = BASE_HEADER_HEIGHT;
    const tableauY = topRowY + cardHeight + BASE_TOP_ROW_BOTTOM_GAP;
    const maxColHeight = maxTableauColumnHeight(cardHeight, tableauFaceUpOffset, tableauFaceDownOffset);

    if (tableauY + maxColHeight + TOOLBAR_HEIGHT <= viewportHeight - padding) {
      break;
    }

    if (cardWidth <= 20) break;
    cardWidth -= 1;
  }

  const cardHeight = Math.floor(cardWidth * CARD_ASPECT_RATIO);
  const tableauFaceUpOffset = Math.max(12, Math.floor(cardHeight * 0.25));
  const tableauFaceDownOffset = Math.max(8, Math.floor(cardHeight * 0.14));

  const topRowY = BASE_HEADER_HEIGHT;
  const tableauY = topRowY + cardHeight + BASE_TOP_ROW_BOTTOM_GAP;

  const gap = Math.max(2, Math.floor((usableWidth - 7 * cardWidth) / 6));

  const stockX = padding;
  const wasteX = stockX + cardWidth + gap;

  const foundationsWidth = 4 * cardWidth + 3 * gap;
  const foundationStartX = padding + usableWidth - foundationsWidth;

  const foundations: PilePosition[] = [];
  for (let i = 0; i < 4; i++) {
    foundations.push({ x: foundationStartX + i * (cardWidth + gap), y: topRowY });
  }

  const tableau: PilePosition[] = [];
  for (let i = 0; i < 7; i++) {
    tableau.push({ x: padding + i * (cardWidth + gap), y: tableauY });
  }

  return {
    cardWidth,
    cardHeight,
    gap,
    padding,
    tableauFaceUpOffset,
    tableauFaceDownOffset,
    topRowY,
    tableauY,
    positions: {
      stock: { x: stockX, y: topRowY },
      waste: { x: wasteX, y: topRowY },
      foundations,
      tableau,
    },
  };
}
