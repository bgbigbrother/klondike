import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { createDeck, shuffle } from './deck';
import type { Suit, Rank } from './types';

const SUITS: Suit[] = ['clubs', 'diamonds', 'hearts', 'spades'];
const RANKS: Rank[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

describe('createDeck', () => {
  it('produces exactly 52 cards', () => {
    expect(createDeck()).toHaveLength(52);
  });

  it('contains all 52 unique suit/rank combinations', () => {
    const deck = createDeck();
    for (const suit of SUITS) {
      for (const rank of RANKS) {
        const count = deck.filter(c => c.suit === suit && c.rank === rank).length;
        expect(count).toBe(1);
      }
    }
  });

  it('creates all cards face-down', () => {
    const deck = createDeck();
    expect(deck.every(c => c.faceUp === false)).toBe(true);
  });
});

describe('shuffle', () => {
  it('returns the same deck reference', () => {
    const deck = createDeck();
    expect(shuffle(deck)).toBe(deck);
  });

  it('preserves deck length', () => {
    const deck = createDeck();
    shuffle(deck);
    expect(deck).toHaveLength(52);
  });

  // Feature: solitaire-web-game, Property 1: Shuffle produces a valid permutation
  // Validates: Requirements 1.1
  it('Property 1: shuffle produces a valid permutation (no duplicates, no missing cards)', () => {
    fc.assert(
      fc.property(fc.integer(), () => {
        const deck = createDeck();
        const before = deck.map(c => `${c.suit}-${c.rank}`).sort();
        shuffle(deck);
        const after = deck.map(c => `${c.suit}-${c.rank}`).sort();
        expect(after).toEqual(before);
      }),
      { numRuns: 100 }
    );
  });
});
