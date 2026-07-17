import { NeuralNetwork } from "./NeuralNetwork";

export class REINFORCE {
  private policy: NeuralNetwork;
  private gamma: number;

  constructor(inputSize: number, actionSize: number, gamma = 0.99) {
    this.policy = new NeuralNetwork([inputSize, 64, 64, actionSize]);
    this.gamma = gamma;
  }

  selectAction(state: number[]): number {
    const probs = this.policy.forward(state);
    return this.sample(probs);
  }

  private sample(probs: number[]): number {
    const sum = probs.reduce((a, b) => a + b, 0);
    const normalized = probs.map(p => p / sum);
    let r = Math.random();
    for (let i = 0; i < normalized.length; i++) {
      r -= normalized[i];
      if (r <= 0) return i;
    }
    return normalized.length - 1;
  }

  train(states: number[][], actions: number[], rewards: number[]) {
    const returns: number[] = [];
    let R = 0;
    for (let t = rewards.length - 1; t >= 0; t--) {
      R = rewards[t] + this.gamma * R;
      returns.unshift(R);
    }

    const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
    const std = Math.sqrt(returns.reduce((sum, r) => sum + (r - mean) ** 2, 0) / returns.length) + 1e-8;

    const normalizedReturns = returns.map(r => (r - mean) / std);

    for (let t = 0; t < states.length; t++) {
      const probs = this.policy.forward(states[t]);
      const logProb = Math.log(probs[actions[t]] + 1e-10);
      const loss = -logProb * normalizedReturns[t];
      this.policy.backprop([states[t]], [actions[t]], [loss]);
    }
  }
}
