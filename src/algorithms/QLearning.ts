export class QLearning {
  private qTable: number[][];
  private stateSize: number;
  private actionSize: number;
  private alpha: number;
  private gamma: number;
  private epsilon: number;
  private epsilonDecay: number;
  private epsilonMin: number;

  constructor(
    stateSize: number,
    actionSize: number,
    alpha = 0.1,
    gamma = 0.99,
    epsilon = 1.0,
    epsilonDecay = 0.995,
    epsilonMin = 0.01
  ) {
    this.stateSize = stateSize;
    this.actionSize = actionSize;
    this.alpha = alpha;
    this.gamma = gamma;
    this.epsilon = epsilon;
    this.epsilonDecay = epsilonDecay;
    this.epsilonMin = epsilonMin;
    this.qTable = Array.from({ length: stateSize }, () => Array(actionSize).fill(0));
  }

  selectAction(state: number): number {
    if (Math.random() < this.epsilon) {
      return Math.floor(Math.random() * this.actionSize);
    }
    return this.qTable[state].indexOf(Math.max(...this.qTable[state]));
  }

  train(state: number, action: number, reward: number, nextState: number) {
    const currentQ = this.qTable[state][action];
    const maxNextQ = Math.max(...this.qTable[nextState]);
    this.qTable[state][action] = currentQ + this.alpha * (reward + this.gamma * maxNextQ - currentQ);
    this.epsilon = Math.max(this.epsilonMin, this.epsilon * this.epsilonDecay);
  }
}
