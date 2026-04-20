import { GameState, SCORE } from './types';

export type MoveType = keyof typeof SCORE;

export function getScoreDelta(moveType: MoveType): number {
  return SCORE[moveType];
}

export function applyScoreDelta(state: GameState, delta: number): number {
  return Math.max(0, state.score + delta);
}
