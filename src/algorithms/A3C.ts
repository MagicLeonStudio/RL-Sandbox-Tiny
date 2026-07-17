import { NeuralNetwork } from "./NeuralNetwork";

export class A3C {
  private actor: NeuralNetwork;
  private critic: NeuralNetwork;
  private gamma: number;
  private entropyCoeff: number;

  constructor(inputSize: number, actionSize: number, gamma = 0.99, entropyCoeff = 0.01) {
    this.actor = new NeuralNetwork([inputSize, 64, 64, actionSize]);
    this.critic = new NeuralNetwork([inputSize, 64, 64, 1]);
    this.gamma = gamma;
    this.entropyCoeff = entropyCoeff;
  }

  selectAction(state: number[]): number {
    const probs = this.actor.forward(state);
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
    let R = 0;
    const values = states.map(s => this.critic.forward(s)[0]);
    const policyLosses: number[] = [];
    const valueLosses: number[] = [];

    for (let t = rewards.length - 1; t >= 0; t--) {
      R = rewards[t] + this.gamma * R;
      const advantage = R - values[t];
      const probs = this.actor.forward(states[t]);
      const logProb = Math.log(probs[actions[t]] + 1e-10);
      policyLosses.push(-logProb * advantage - this.entropyCoeff * this.entropy(probs));
      valueLosses.push(advantage ** 2);
    }

    this.actor.backprop(states, actions, policyLosses.reverse());
    this.critic.backprop(states, null, valueLosses.reverse());
  }

  private entropy(probs: number[]): number {
    return -probs.reduce((sum, p) => sum + (p > 0 ? p * Math.log(p) : 0), 0);
  }
}
