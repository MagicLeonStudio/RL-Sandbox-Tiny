export class GridWorldEngine {
  private size: number;
  private agentPos: number;
  private goalPos: number;

  constructor(size = 5) {
    this.size = size;
    this.agentPos = 0;
    this.goalPos = size * size - 1;
  }

  reset() {
    this.agentPos = 0;
    return this.agentPos;
  }

  step(action: number): { state: number; reward: number; done: boolean } {
    const row = Math.floor(this.agentPos / this.size);
    const col = this.agentPos % this.size;

    let newRow = row;
    let newCol = col;

    switch (action) {
      case 0: newRow = Math.max(0, row - 1); break;
      case 1: newRow = Math.min(this.size - 1, row + 1); break;
      case 2: newCol = Math.max(0, col - 1); break;
      case 3: newCol = Math.min(this.size - 1, col + 1); break;
    }

    this.agentPos = newRow * this.size + newCol;
    const done = this.agentPos === this.goalPos;
    const reward = done ? 10 : -0.01;

    return { state: this.agentPos, reward, done };
  }
}
