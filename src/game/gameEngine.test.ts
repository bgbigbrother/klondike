import { describe, it, expect, beforeEach } from 'vitest';
import fc from 'fast-check';
import { GameEngine, getInitialState } from './gameEngine';
import type { GameState } from './types';

// Helper: build a minimal GameState with given stock/waste
function makeState(stockSize: number, wasteSize: number): GameState {
  const state = getInitialState();
  // Override stock and waste with controlled cards
  const allCards = [...state.stock, ...state.waste,
    ...state.tableau.flat(), ...state.foundations.flat()];
  // Use first stockSize cards for stock (face-down), next wasteSize for waste (face-up)
  state.stock = allCards.slice(0, stockSize).map(c => ({ ...c, faceUp: false }));
  state.waste = allCards.slice(stockSize, stockSize + wasteSize).map(c => ({ ...c, faceUp: true }));
  return state;
}

describe('GameEngine - drawFromStock', () => {
  it('moves top stock card face-up to waste', () => {
    const engine = new GameEngine();
    const state = engine.getState();
    const initialStockSize = state.stock.length;
    const initialWasteSize = state.waste.length;
    const topCard = state.stock[state.stock.length - 1];

    engine.drawFromStock();

    expect(state.stock.length).toBe(initialStockSize - 1);
    expect(state.waste.length).toBe(initialWasteSize + 1);
    expect(state.waste[state.waste.length - 1]).toBe(topCard);
    expect(state.waste[state.waste.length - 1].faceUp).toBe(true);
  });

  it('is a no-op when both stock and waste are empty', () => {
    const engine = new GameEngine();
    const state = engine.getState();
    state.stock = [];
    state.waste = [];

    engine.drawFromStock();

    expect(state.stock.length).toBe(0);
    expect(state.waste.length).toBe(0);
    expect(engine.canUndo()).toBe(false);
  });

  it('undo restores stock and waste after draw', () => {
    const engine = new GameEngine();
    const state = engine.getState();
    const stockBefore = [...state.stock];
    const wasteBefore = [...state.waste];

    engine.drawFromStock();
    engine.undo();

    expect(state.stock.map(c => c.rank + c.suit)).toEqual(stockBefore.map(c => c.rank + c.suit));
    expect(state.waste.map(c => c.rank + c.suit)).toEqual(wasteBefore.map(c => c.rank + c.suit));
  });
});

describe('GameEngine - recycleWaste', () => {
  it('moves waste cards reversed to stock face-down, empties waste', () => {
    const engine = new GameEngine();
    const state = engine.getState();
    // Draw a few cards to populate waste
    engine.drawFromStock();
    engine.drawFromStock();
    engine.drawFromStock();
    // Empty the stock manually to force recycle
    const wasteCards = [...state.waste];
    state.stock = [];

    engine.recycleWaste();

    expect(state.waste.length).toBe(0);
    expect(state.stock.length).toBe(wasteCards.length);
    // Cards should be reversed and face-down
    state.stock.forEach(c => expect(c.faceUp).toBe(false));
    // Order: top of waste becomes bottom of stock (reversed)
    expect(state.stock[0].rank).toBe(wasteCards[wasteCards.length - 1].rank);
    expect(state.stock[0].suit).toBe(wasteCards[wasteCards.length - 1].suit);
  });

  it('applies -100 score delta (floor at 0)', () => {
    const engine = new GameEngine();
    const state = engine.getState();
    state.score = 50;
    // Populate waste
    engine.drawFromStock();
    state.stock = [];

    engine.recycleWaste();

    expect(state.score).toBe(0); // 50 - 100 = -50, floored to 0
  });

  it('score does not go below 0 on recycle', () => {
    const engine = new GameEngine();
    const state = engine.getState();
    state.score = 0;
    engine.drawFromStock();
    state.stock = [];

    engine.recycleWaste();

    expect(state.score).toBe(0);
  });

  it('undo restores waste and score after recycle', () => {
    const engine = new GameEngine();
    const state = engine.getState();
    state.score = 200;
    engine.drawFromStock();
    engine.drawFromStock();
    const wasteSnapshot = state.waste.map(c => ({ ...c }));
    state.stock = [];

    engine.recycleWaste();
    engine.undo();

    expect(state.waste.length).toBe(wasteSnapshot.length);
    state.waste.forEach((c, i) => {
      expect(c.rank).toBe(wasteSnapshot[i].rank);
      expect(c.suit).toBe(wasteSnapshot[i].suit);
      expect(c.faceUp).toBe(true);
    });
    expect(state.score).toBe(200);
  });

  it('is a no-op when both stock and waste are empty', () => {
    const engine = new GameEngine();
    const state = engine.getState();
    state.stock = [];
    state.waste = [];

    engine.recycleWaste();

    expect(state.stock.length).toBe(0);
    expect(state.waste.length).toBe(0);
    expect(engine.canUndo()).toBe(false);
  });
});

// Property 3: Drawing from stock maintains waste invariant
// Feature: solitaire-web-game, Property 3: Drawing from stock maintains waste invariant
describe('Property 3: draw from stock invariants', () => {
  it('top of waste is face-up, stock shrinks by 1, waste grows by 1, total preserved', () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 24 }), (stockSize) => {
        const engine = new GameEngine();
        const state = engine.getState();
        // Trim stock to stockSize cards
        state.stock = state.stock.slice(0, stockSize).map(c => ({ ...c, faceUp: false }));
        state.waste = [];

        const totalBefore = state.stock.length + state.waste.length;
        engine.drawFromStock();

        expect(state.waste[state.waste.length - 1].faceUp).toBe(true);
        expect(state.stock.length).toBe(stockSize - 1);
        expect(state.waste.length).toBe(1);
        expect(state.stock.length + state.waste.length).toBe(totalBefore);
      }),
      { numRuns: 100 }
    );
  });
});

// Property 4: Waste recycle round-trip
// Feature: solitaire-web-game, Property 4: Waste recycle round-trip
describe('Property 4: waste recycle round-trip', () => {
  it('recycled stock has waste cards in reversed order, all face-down, waste becomes empty', () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 24 }), (wasteSize) => {
        const engine = new GameEngine();
        const state = engine.getState();
        // Set up: empty stock, wasteSize cards in waste
        const cards = state.stock.slice(0, wasteSize).map(c => ({ ...c, faceUp: true }));
        state.stock = [];
        state.waste = cards;

        const wasteIdentities = cards.map(c => `${c.rank}${c.suit}`);

        engine.recycleWaste();

        expect(state.waste.length).toBe(0);
        expect(state.stock.length).toBe(wasteSize);
        state.stock.forEach(c => expect(c.faceUp).toBe(false));
        // Reversed order
        const stockIdentities = state.stock.map(c => `${c.rank}${c.suit}`);
        expect(stockIdentities).toEqual([...wasteIdentities].reverse());
      }),
      { numRuns: 100 }
    );
  });
});

// Property 5: Empty stock + empty waste disables draw
// Feature: solitaire-web-game, Property 5: Empty stock + empty waste disables draw
describe('Property 5: empty stock + empty waste is no-op', () => {
  it('draw action does nothing when both stock and waste are empty', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const engine = new GameEngine();
        const state = engine.getState();
        state.stock = [];
        state.waste = [];
        const scoreBefore = state.score;

        engine.drawFromStock();

        expect(state.stock.length).toBe(0);
        expect(state.waste.length).toBe(0);
        expect(state.score).toBe(scoreBefore);
        expect(engine.canUndo()).toBe(false);
      }),
      { numRuns: 100 }
    );
  });
});

// ─── moveCard / moveStack tests ───────────────────────────────────────────────

import type { Card } from './types';
import { SUIT_COLOR } from './types';

/** Build a face-up card */
function card(rank: Card['rank'], suit: Card['suit'], faceUp = true): Card {
  return { rank, suit, faceUp };
}

describe('GameEngine - moveCard (tableau)', () => {
  it('accepts a valid tableau move: rank one less, opposite color', () => {
    const engine = new GameEngine();
    const state = engine.getState();
    // Set up: col 0 has a face-up red 7 (hearts), col 1 has a face-up black 8 (spades)
    state.tableau[0] = [card(7, 'hearts')];
    state.tableau[1] = [card(8, 'spades')];

    const result = engine.moveCard({ type: 'tableau', index: 0 }, { type: 'tableau', index: 1 });

    expect(result).toBe(true);
    expect(state.tableau[0].length).toBe(0);
    expect(state.tableau[1].length).toBe(2);
    expect(state.tableau[1][1].rank).toBe(7);
  });

  it('rejects a move where rank is not one less', () => {
    const engine = new GameEngine();
    const state = engine.getState();
    state.tableau[0] = [card(6, 'hearts')];
    state.tableau[1] = [card(8, 'spades')];

    const result = engine.moveCard({ type: 'tableau', index: 0 }, { type: 'tableau', index: 1 });

    expect(result).toBe(false);
    expect(state.tableau[0].length).toBe(1);
    expect(state.tableau[1].length).toBe(1);
  });

  it('rejects a move where colors are the same', () => {
    const engine = new GameEngine();
    const state = engine.getState();
    state.tableau[0] = [card(7, 'diamonds')]; // red
    state.tableau[1] = [card(8, 'hearts')];   // red

    const result = engine.moveCard({ type: 'tableau', index: 0 }, { type: 'tableau', index: 1 });

    expect(result).toBe(false);
  });

  it('accepts a King onto an empty column', () => {
    const engine = new GameEngine();
    const state = engine.getState();
    state.tableau[0] = [card(13, 'spades')];
    state.tableau[1] = [];

    const result = engine.moveCard({ type: 'tableau', index: 0 }, { type: 'tableau', index: 1 });

    expect(result).toBe(true);
    expect(state.tableau[1][0].rank).toBe(13);
  });

  it('rejects a non-King onto an empty column', () => {
    const engine = new GameEngine();
    const state = engine.getState();
    state.tableau[0] = [card(7, 'hearts')];
    state.tableau[1] = [];

    const result = engine.moveCard({ type: 'tableau', index: 0 }, { type: 'tableau', index: 1 });

    expect(result).toBe(false);
  });

  it('flips the exposed face-down card after a move', () => {
    const engine = new GameEngine();
    const state = engine.getState();
    const faceDownCard = card(5, 'clubs', false);
    state.tableau[0] = [faceDownCard, card(7, 'hearts')];
    state.tableau[1] = [card(8, 'spades')];

    engine.moveCard({ type: 'tableau', index: 0 }, { type: 'tableau', index: 1 });

    expect(faceDownCard.faceUp).toBe(true);
  });

  it('does not flip when source column becomes empty', () => {
    const engine = new GameEngine();
    const state = engine.getState();
    state.tableau[0] = [card(13, 'spades')];
    state.tableau[1] = [];

    engine.moveCard({ type: 'tableau', index: 0 }, { type: 'tableau', index: 1 });

    expect(state.tableau[0].length).toBe(0);
  });

  it('undo restores state after a tableau move', () => {
    const engine = new GameEngine();
    const state = engine.getState();
    const faceDownCard = card(5, 'clubs', false);
    state.tableau[0] = [faceDownCard, card(7, 'hearts')];
    state.tableau[1] = [card(8, 'spades')];
    const prevScore = state.score;

    engine.moveCard({ type: 'tableau', index: 0 }, { type: 'tableau', index: 1 });
    engine.undo();

    expect(state.tableau[0].length).toBe(2);
    expect(state.tableau[1].length).toBe(1);
    expect(faceDownCard.faceUp).toBe(false);
    expect(state.score).toBe(prevScore);
  });
});

describe('GameEngine - moveStack', () => {
  it('moves multiple face-up cards as a stack', () => {
    const engine = new GameEngine();
    const state = engine.getState();
    // col 0: [black 9, red 8, black 7] — a valid sequence
    state.tableau[0] = [card(9, 'spades'), card(8, 'hearts'), card(7, 'clubs')];
    // col 1: [red 10]
    state.tableau[1] = [card(10, 'hearts')];

    // Move 2-card stack (8♥, 7♣) from col 0 onto 9♠ in col 1... wait, 9♠ is in col 0
    // Actually move the 2-card stack (8♥, 7♣) onto col 1 which has red 10 — 8♥ is red, 10♥ is red: invalid
    // Let's use col 1 = black 10 (clubs)
    state.tableau[1] = [card(10, 'clubs')]; // black 10
    // bottom of stack = 8♥ (red), top of col 1 = 10♣ (black): rank 8 = 10-1? No, 8 ≠ 9. Need 9.
    // Let's use: col 0 = [red 8, black 7], col 1 = [black 9]
    state.tableau[0] = [card(8, 'hearts'), card(7, 'clubs')];
    state.tableau[1] = [card(9, 'spades')]; // black 9

    const result = engine.moveStack({ type: 'tableau', index: 0 }, 2, { type: 'tableau', index: 1 });

    expect(result).toBe(true);
    expect(state.tableau[0].length).toBe(0);
    expect(state.tableau[1].length).toBe(3);
    expect(state.tableau[1][1].rank).toBe(8);
    expect(state.tableau[1][2].rank).toBe(7);
  });

  it('rejects stack move if bottom card fails placement rule', () => {
    const engine = new GameEngine();
    const state = engine.getState();
    state.tableau[0] = [card(8, 'hearts'), card(7, 'clubs')];
    state.tableau[1] = [card(8, 'spades')]; // same rank, invalid

    const result = engine.moveStack({ type: 'tableau', index: 0 }, 2, { type: 'tableau', index: 1 });

    expect(result).toBe(false);
  });
});

describe('GameEngine - moveCard scoring', () => {
  it('adds +5 for waste to tableau', () => {
    const engine = new GameEngine();
    const state = engine.getState();
    state.score = 0;
    state.waste = [card(13, 'spades')];
    state.tableau[0] = [];

    engine.moveCard({ type: 'waste', index: 0 }, { type: 'tableau', index: 0 });

    expect(state.score).toBe(5);
  });

  it('adds +10 for tableau to foundation', () => {
    const engine = new GameEngine();
    const state = engine.getState();
    state.score = 0;
    state.tableau[0] = [card(1, 'hearts')];
    state.foundations[0] = [];

    engine.moveCard({ type: 'tableau', index: 0 }, { type: 'foundation', index: 0 });

    expect(state.score).toBe(10);
  });

  it('adds +5 flip bonus when face-down card is exposed', () => {
    const engine = new GameEngine();
    const state = engine.getState();
    state.score = 0;
    state.tableau[0] = [card(5, 'clubs', false), card(7, 'hearts')];
    state.tableau[1] = [card(8, 'spades')];

    engine.moveCard({ type: 'tableau', index: 0 }, { type: 'tableau', index: 1 });

    expect(state.score).toBe(5); // flip bonus only (tableau-to-tableau has no base score)
  });

  it('subtracts 15 for foundation to tableau', () => {
    const engine = new GameEngine();
    const state = engine.getState();
    state.score = 20;
    state.foundations[0] = [card(1, 'hearts'), card(2, 'hearts')];
    state.tableau[0] = [card(4, 'spades')]; // black 4, red 3 would fit... need rank 3 red on black 4
    // Actually: move 2♥ (red) from foundation onto black 3 in tableau
    state.tableau[0] = [card(3, 'spades')]; // black 3

    engine.moveCard({ type: 'foundation', index: 0 }, { type: 'tableau', index: 0 });

    expect(state.score).toBe(5); // 20 - 15 = 5
  });
});

// Property 6: Tableau placement validation
// Feature: solitaire-web-game, Property 6: Tableau placement validation
describe('Property 6: tableau placement validation', () => {
  it('accepts move iff rank is one less and color is opposite (non-empty column)', () => {
    fc.assert(
      fc.property(
        fc.record({
          movingRank: fc.integer({ min: 1, max: 12 }) as fc.Arbitrary<Card['rank']>,
          movingSuit: fc.constantFrom('clubs', 'diamonds', 'hearts', 'spades') as fc.Arbitrary<Card['suit']>,
          topRank: fc.integer({ min: 2, max: 13 }) as fc.Arbitrary<Card['rank']>,
          topSuit: fc.constantFrom('clubs', 'diamonds', 'hearts', 'spades') as fc.Arbitrary<Card['suit']>,
        }),
        ({ movingRank, movingSuit, topRank, topSuit }) => {
          const engine = new GameEngine();
          const state = engine.getState();
          state.tableau[0] = [card(movingRank, movingSuit)];
          state.tableau[1] = [card(topRank, topSuit)];

          const result = engine.moveCard({ type: 'tableau', index: 0 }, { type: 'tableau', index: 1 });

          const rankOk = movingRank === topRank - 1;
          const colorOk = SUIT_COLOR[movingSuit] !== SUIT_COLOR[topSuit];
          const shouldSucceed = rankOk && colorOk;

          expect(result).toBe(shouldSucceed);
        }
      ),
      { numRuns: 200 }
    );
  });

  it('accepts only Kings on empty columns', () => {
    fc.assert(
      fc.property(
        fc.record({
          rank: fc.integer({ min: 1, max: 13 }) as fc.Arbitrary<Card['rank']>,
          suit: fc.constantFrom('clubs', 'diamonds', 'hearts', 'spades') as fc.Arbitrary<Card['suit']>,
        }),
        ({ rank, suit }) => {
          const engine = new GameEngine();
          const state = engine.getState();
          state.tableau[0] = [card(rank, suit)];
          state.tableau[1] = [];

          const result = engine.moveCard({ type: 'tableau', index: 0 }, { type: 'tableau', index: 1 });

          expect(result).toBe(rank === 13);
        }
      ),
      { numRuns: 100 }
    );
  });
});

// Property 7: Valid tableau move preserves total card count
// Feature: solitaire-web-game, Property 7: Valid tableau move completes and preserves total card count
describe('Property 7: valid move preserves total card count', () => {
  it('total cards across all piles unchanged after a valid move', () => {
    fc.assert(
      fc.property(
        fc.record({
          movingRank: fc.integer({ min: 1, max: 12 }) as fc.Arbitrary<Card['rank']>,
          movingSuit: fc.constantFrom('clubs', 'diamonds', 'hearts', 'spades') as fc.Arbitrary<Card['suit']>,
          topSuit: fc.constantFrom('clubs', 'spades') as fc.Arbitrary<Card['suit']>, // black suits
        }),
        ({ movingRank, movingSuit, topSuit }) => {
          // Ensure moving card is red and top card is black with rank one higher
          const redSuit = movingSuit === 'diamonds' || movingSuit === 'hearts' ? movingSuit : 'hearts';
          const topRank = (movingRank + 1) as Card['rank'];

          const engine = new GameEngine();
          const state = engine.getState();
          state.tableau[0] = [card(movingRank, redSuit)];
          state.tableau[1] = [card(topRank, topSuit)];
          // Clear other piles to have a known count
          state.stock = [];
          state.waste = [];
          state.foundations = [[], [], [], []];
          state.tableau[2] = [];
          state.tableau[3] = [];
          state.tableau[4] = [];
          state.tableau[5] = [];
          state.tableau[6] = [];

          const countBefore = state.tableau.flat().length;

          const result = engine.moveCard({ type: 'tableau', index: 0 }, { type: 'tableau', index: 1 });

          expect(result).toBe(true);
          const countAfter = state.tableau.flat().length;
          expect(countAfter).toBe(countBefore);
        }
      ),
      { numRuns: 100 }
    );
  });
});

// Property 8: Exposed face-down card is flipped
// Feature: solitaire-web-game, Property 8: Exposed face-down card is flipped
describe('Property 8: exposed face-down card is flipped after move', () => {
  it('face-down card at top of source column is flipped after valid move', () => {
    fc.assert(
      fc.property(
        fc.record({
          hiddenRank: fc.integer({ min: 1, max: 11 }) as fc.Arbitrary<Card['rank']>,
          hiddenSuit: fc.constantFrom('clubs', 'diamonds', 'hearts', 'spades') as fc.Arbitrary<Card['suit']>,
        }),
        ({ hiddenRank, hiddenSuit }) => {
          const engine = new GameEngine();
          const state = engine.getState();
          const hidden = card(hiddenRank, hiddenSuit, false);
          // Moving card: red 7, target: black 8
          state.tableau[0] = [hidden, card(7, 'hearts')];
          state.tableau[1] = [card(8, 'spades')];

          const result = engine.moveCard({ type: 'tableau', index: 0 }, { type: 'tableau', index: 1 });

          expect(result).toBe(true);
          expect(hidden.faceUp).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });
});

// Property 9: Invalid move leaves state unchanged
// Feature: solitaire-web-game, Property 9: Invalid move leaves state unchanged
describe('Property 9: invalid move leaves state unchanged', () => {
  it('state is identical before and after a failed move', () => {
    fc.assert(
      fc.property(
        fc.record({
          movingRank: fc.integer({ min: 2, max: 13 }) as fc.Arbitrary<Card['rank']>,
          movingSuit: fc.constantFrom('clubs', 'diamonds', 'hearts', 'spades') as fc.Arbitrary<Card['suit']>,
          topSuit: fc.constantFrom('clubs', 'spades') as fc.Arbitrary<Card['suit']>,
        }),
        ({ movingRank, movingSuit, topSuit }) => {
          // Force an invalid move: same rank (not one less)
          const topRank = movingRank as Card['rank']; // same rank = invalid
          const engine = new GameEngine();
          const state = engine.getState();
          state.tableau[0] = [card(movingRank, movingSuit)];
          state.tableau[1] = [card(topRank, topSuit)];
          const scoreBefore = state.score;
          const undoDepthBefore = engine.canUndo();
          const col0Before = state.tableau[0].length;
          const col1Before = state.tableau[1].length;

          const result = engine.moveCard({ type: 'tableau', index: 0 }, { type: 'tableau', index: 1 });

          expect(result).toBe(false);
          expect(state.tableau[0].length).toBe(col0Before);
          expect(state.tableau[1].length).toBe(col1Before);
          expect(state.score).toBe(scoreBefore);
          expect(engine.canUndo()).toBe(undoDepthBefore);
        }
      ),
      { numRuns: 100 }
    );
  });
});

// ─── Foundation move tests ────────────────────────────────────────────────────

describe('GameEngine - moveCard (foundation)', () => {
  it('accepts Ace on empty foundation pile', () => {
    const engine = new GameEngine();
    const state = engine.getState();
    state.tableau[0] = [card(1, 'hearts')];
    state.foundations[0] = [];

    const result = engine.moveCard({ type: 'tableau', index: 0 }, { type: 'foundation', index: 0 });

    expect(result).toBe(true);
    expect(state.foundations[0].length).toBe(1);
    expect(state.foundations[0][0].rank).toBe(1);
  });

  it('rejects non-Ace on empty foundation pile', () => {
    const engine = new GameEngine();
    const state = engine.getState();
    state.tableau[0] = [card(2, 'hearts')];
    state.foundations[0] = [];

    const result = engine.moveCard({ type: 'tableau', index: 0 }, { type: 'foundation', index: 0 });

    expect(result).toBe(false);
  });

  it('accepts matching suit, rank+1 on non-empty foundation', () => {
    const engine = new GameEngine();
    const state = engine.getState();
    state.tableau[0] = [card(2, 'hearts')];
    state.foundations[0] = [card(1, 'hearts')];

    const result = engine.moveCard({ type: 'tableau', index: 0 }, { type: 'foundation', index: 0 });

    expect(result).toBe(true);
    expect(state.foundations[0].length).toBe(2);
  });

  it('rejects wrong suit on non-empty foundation', () => {
    const engine = new GameEngine();
    const state = engine.getState();
    state.tableau[0] = [card(2, 'spades')];
    state.foundations[0] = [card(1, 'hearts')];

    const result = engine.moveCard({ type: 'tableau', index: 0 }, { type: 'foundation', index: 0 });

    expect(result).toBe(false);
  });

  it('rejects wrong rank on non-empty foundation', () => {
    const engine = new GameEngine();
    const state = engine.getState();
    state.tableau[0] = [card(3, 'hearts')];
    state.foundations[0] = [card(1, 'hearts')];

    const result = engine.moveCard({ type: 'tableau', index: 0 }, { type: 'foundation', index: 0 });

    expect(result).toBe(false);
  });

  it('allows moving card from foundation back to tableau', () => {
    const engine = new GameEngine();
    const state = engine.getState();
    state.foundations[0] = [card(1, 'hearts'), card(2, 'hearts')];
    state.tableau[0] = [card(3, 'spades')]; // black 3, red 2 fits

    const result = engine.moveCard({ type: 'foundation', index: 0 }, { type: 'tableau', index: 0 });

    expect(result).toBe(true);
    expect(state.foundations[0].length).toBe(1);
    expect(state.tableau[0].length).toBe(2);
    expect(state.tableau[0][1].rank).toBe(2);
  });

  it('undo restores state after foundation move', () => {
    const engine = new GameEngine();
    const state = engine.getState();
    state.tableau[0] = [card(1, 'hearts')];
    state.foundations[0] = [];
    const prevScore = state.score;

    engine.moveCard({ type: 'tableau', index: 0 }, { type: 'foundation', index: 0 });
    engine.undo();

    expect(state.tableau[0].length).toBe(1);
    expect(state.foundations[0].length).toBe(0);
    expect(state.score).toBe(prevScore);
  });
});

describe('GameEngine - autoMoveToFoundation', () => {
  it('moves an Ace to an empty foundation pile', () => {
    const engine = new GameEngine();
    const state = engine.getState();
    state.tableau[0] = [card(1, 'spades')];
    state.foundations = [[], [], [], []];

    const result = engine.autoMoveToFoundation({ type: 'tableau', index: 0 });

    expect(result).toBe(true);
    const foundationWithAce = state.foundations.find(f => f.length === 1 && f[0].rank === 1 && f[0].suit === 'spades');
    expect(foundationWithAce).toBeDefined();
  });

  it('moves a card to the correct non-empty foundation pile', () => {
    const engine = new GameEngine();
    const state = engine.getState();
    state.foundations[0] = [card(1, 'hearts')];
    state.foundations[1] = [];
    state.foundations[2] = [];
    state.foundations[3] = [];
    state.tableau[0] = [card(2, 'hearts')];

    const result = engine.autoMoveToFoundation({ type: 'tableau', index: 0 });

    expect(result).toBe(true);
    expect(state.foundations[0].length).toBe(2);
    expect(state.foundations[0][1].rank).toBe(2);
  });

  it('returns false when no valid foundation pile exists', () => {
    const engine = new GameEngine();
    const state = engine.getState();
    state.tableau[0] = [card(5, 'hearts')];
    state.foundations = [[], [], [], []];

    const result = engine.autoMoveToFoundation({ type: 'tableau', index: 0 });

    expect(result).toBe(false);
    expect(state.tableau[0].length).toBe(1);
  });

  it('returns false for face-down card', () => {
    const engine = new GameEngine();
    const state = engine.getState();
    state.tableau[0] = [card(1, 'hearts', false)];
    state.foundations = [[], [], [], []];

    const result = engine.autoMoveToFoundation({ type: 'tableau', index: 0 });

    expect(result).toBe(false);
  });

  it('works from waste pile', () => {
    const engine = new GameEngine();
    const state = engine.getState();
    state.waste = [card(1, 'clubs')];
    state.foundations = [[], [], [], []];

    const result = engine.autoMoveToFoundation({ type: 'waste', index: 0 });

    expect(result).toBe(true);
    const foundationWithAce = state.foundations.find(f => f.length === 1 && f[0].suit === 'clubs');
    expect(foundationWithAce).toBeDefined();
  });
});

// Property 10: Foundation placement validation
// Feature: solitaire-web-game, Property 10: Foundation placement validation
describe('Property 10: foundation placement validation', () => {
  it('accepts move iff pile empty+Ace OR matching suit+rank+1', () => {
    fc.assert(
      fc.property(
        fc.record({
          cardRank: fc.integer({ min: 1, max: 13 }) as fc.Arbitrary<Card['rank']>,
          cardSuit: fc.constantFrom('clubs', 'diamonds', 'hearts', 'spades') as fc.Arbitrary<Card['suit']>,
          pileEmpty: fc.boolean(),
          topRank: fc.integer({ min: 1, max: 12 }) as fc.Arbitrary<Card['rank']>,
          topSuit: fc.constantFrom('clubs', 'diamonds', 'hearts', 'spades') as fc.Arbitrary<Card['suit']>,
        }),
        ({ cardRank, cardSuit, pileEmpty, topRank, topSuit }) => {
          const engine = new GameEngine();
          const state = engine.getState();
          state.tableau[0] = [card(cardRank, cardSuit)];
          state.foundations[0] = pileEmpty ? [] : [card(topRank, topSuit)];

          const result = engine.moveCard({ type: 'tableau', index: 0 }, { type: 'foundation', index: 0 });

          const shouldSucceed = pileEmpty
            ? cardRank === 1
            : cardSuit === topSuit && cardRank === topRank + 1;

          expect(result).toBe(shouldSucceed);
        }
      ),
      { numRuns: 200 }
    );
  });
});

// Property 11: Auto-move to foundation on double-click
// Feature: solitaire-web-game, Property 11: Auto-move to foundation on double-click
describe('Property 11: auto-move to foundation', () => {
  it('places card on correct foundation pile when valid', () => {
    fc.assert(
      fc.property(
        fc.record({
          suit: fc.constantFrom('clubs', 'diamonds', 'hearts', 'spades') as fc.Arbitrary<Card['suit']>,
          existingRank: fc.integer({ min: 1, max: 12 }) as fc.Arbitrary<Card['rank']>,
        }),
        ({ suit, existingRank }) => {
          const nextRank = (existingRank + 1) as Card['rank'];
          const engine = new GameEngine();
          const state = engine.getState();
          // Put existing cards on foundation 0
          state.foundations[0] = [card(existingRank, suit)];
          state.foundations[1] = [];
          state.foundations[2] = [];
          state.foundations[3] = [];
          state.tableau[0] = [card(nextRank, suit)];

          const result = engine.autoMoveToFoundation({ type: 'tableau', index: 0 });

          expect(result).toBe(true);
          expect(state.foundations[0].length).toBe(2);
          expect(state.foundations[0][1].rank).toBe(nextRank);
          expect(state.foundations[0][1].suit).toBe(suit);
          expect(state.tableau[0].length).toBe(0);
        }
      ),
      { numRuns: 100 }
    );
  });
});
