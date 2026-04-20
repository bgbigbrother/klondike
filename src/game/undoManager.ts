import type { Command } from './types';

export interface IUndoManager {
  push(cmd: Command): void;
  undo(): void;
  canUndo(): boolean;
  clear(): void;
}

export class UndoManager implements IUndoManager {
  private stack: Command[] = [];

  push(cmd: Command): void {
    this.stack.push(cmd);
  }

  undo(): void {
    const cmd = this.stack.pop();
    if (cmd) {
      cmd.undo();
    }
  }

  canUndo(): boolean {
    return this.stack.length > 0;
  }

  clear(): void {
    this.stack = [];
  }
}
