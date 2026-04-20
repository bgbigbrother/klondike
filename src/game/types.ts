export type Suit = 'clubs' | 'diamonds' | 'hearts' | 'spades';
export type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
// 1=Ace, 11=Jack, 12=Queen, 13=King

export interface Card {
  suit: Suit;
  rank: Rank;
  faceUp: boolean;
}

export type PileType = 'stock' | 'waste' | 'foundation' | 'tableau';

export interface PileRef {
  type: PileType;
  index: number; // 0-3 for foundations, 0-6 for tableau, 0 for stock/waste
}

export interface GameState {
  tableau: Card[][];     // 7 columns, index 0 = bottom card
  foundations: Card[][]; // 4 piles, one per suit
  stock: Card[];         // face-down draw pile
  waste: Card[];         // face-up discard pile, top = last element
  score: number;
  moves: number;
  stockPasses: number;   // how many times waste has been recycled back to stock
}

export interface GameOptions {
  /** Max times the stock can be recycled. 0 = infinite. */
  stockPassLimit: number;
  /** Deal all tableau cards face-up */
  faceUpMode: boolean;
}

export interface Move {
  from: PileRef;
  to: PileRef;
  cards: Card[];       // snapshot of moved cards
  scoreDelta: number;
  flippedCard: boolean; // whether a tableau card was flipped
}

export interface Command {
  execute(): void;
  undo(): void;
}

export const SCORE = {
  WASTE_TO_TABLEAU: 5,
  TO_FOUNDATION: 10,
  FLIP_TABLEAU: 5,
  FOUNDATION_TO_TABLEAU: -15,
  RECYCLE_WASTE: -100,
} as const;

export const SUIT_COLOR: Record<Suit, 'red' | 'black'> = {
  diamonds: 'red',
  hearts: 'red',
  clubs: 'black',
  spades: 'black',
};
