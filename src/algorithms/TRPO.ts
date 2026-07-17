import { NeuralNetwork } from "./NeuralNetwork";

export class TRPO {
  private actor: NeuralNetwork;
  private critic: NeuralNetwork;
  private gamma: number;
  private maxKL: number;

  constructor(inputSize: number, actionSize: number, gamma = 0.99, maxKL = 0.01) {
    this.actor = new NeuralNetwork([inputSize, 64, 64, actionSize]);
    this.critic = new NeuralNetwork([inputSize, 64, 64, 1]);
    this.gamma = gamma;
    this.maxKL = maxKL;
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
    const values = states.map(s => this.critic.forward(s)[0]);
    const advantages: number[] = [];
    let R = 0;
    for (let t = rewards.length - 1; t >= 0; t--) {
      R = rewards[t] + this.gamma * R;
      advantages.unshift(R - values[t]);
    }

    for (let t = 0; t < states.length; t++) {
      const probs = this.actor.forward(states[t]);
      const logProb = Math.log(probs[actions[t]] + 1e-10);
      const actorLoss = -logProb * advantages[t];
      this.actor.backprop([states[t]], [actions[t]], [actorLoss]);
    }

    for (let t = 0; t < states.length; t++) {
      const criticLoss = advantages[t] ** 2;
      this.critic.backprop([states[t]], null, [criticLoss]);
    }
  }
}
