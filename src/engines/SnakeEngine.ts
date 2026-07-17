export class SnakeEngine {
  private width: number;
  private height: number;
  private snake: number[][];
  private food: number[];
  private direction: number;
  private done: boolean;

  constructor(width = 10, height = 10) {
    this.width = width;
    this.height = height;
    this.snake = [[Math.floor(width / 2), Math.floor(height / 2)]];
    this.food = this.randomFood();
    this.direction = 0;
    this.done = false;
  }

  reset() {
    this.snake = [[Math.floor(this.width / 2), Math.floor(this.height / 2)]];
    this.food = this.randomFood();
    this.direction = 0;
    this.done = false;
    return this.getState();
  }

  step(action: number): { state: number[]; reward: number; done: boolean } {
    if (this.done) return { state: this.getState(), reward: 0, done: true };

    this.direction = action;
    const head = [...this.snake[0]];
    switch (action) {
      case 0: head[1] -= 1; break;
      case 1: head[1] += 1; break;
      case 2: head[0] -= 1; break;
      case 3: head[0] += 1; break;
    }

    if (
      head[0] < 0 || head[0] >= this.width ||
      head[1] < 0 || head[1] >= this.height ||
      this.snake.some(s => s[0] === head[0] && s[1] === head[1])
    ) {
      this.done = true;
      return { state: this.getState(), reward: -10, done: true };
    }

    this.snake.unshift(head);

    if (head[0] === this.food[0] && head[1] === this.food[1]) {
      this.food = this.randomFood();
      return { state: this.getState(), reward: 10, done: false };
    } else {
      this.snake.pop();
      return { state: this.getState(), reward: -0.1, done: false };
    }
  }

  private getState(): number[] {
    const head = this.snake[0];
    return [
      head[0] / this.width,
      head[1] / this.height,
      this.food[0] / this.width,
      this.food[1] / this.height,
      ...this.snake.slice(1).flat().map((v, i) => v / (i % 2 === 0 ? this.width : this.height)),
    ];
  }

  private randomFood(): number[] {
    let food: number[];
    do {
      food = [Math.floor(Math.random() * this.width), Math.floor(Math.random() * this.height)];
    } while (this.snake.some(s => s[0] === food[0] && s[1] === food[1]));
    return food;
  }
}
