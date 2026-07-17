import { NeuralNetwork } from "./NeuralNetwork";

export class ActorCritic {
  private actor: NeuralNetwork;
  private critic: NeuralNetwork;
  private gamma: number;

  constructor(inputSize: number, actionSize: number, gamma = 0.99) {
    this.actor = new NeuralNetwork([inputSize, 64, 64, actionSize]);
    this.critic = new NeuralNetwork([inputSize, 64, 64, 1]);
    this.gamma = gamma;
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
    for (let t = 0; t < states.length; t++) {
      const state = states[t];
      const reward = rewards[t];
      const action = actions[t];

      const value = this.critic.forward(state)[0];
      let tdTarget = reward;
      if (t + 1 < states.length) {
        tdTarget += this.gamma * this.critic.forward(states[t + 1])[0];
      }
      const advantage = tdTarget - value;

      const probs = this.actor.forward(state);
      const logProb = Math.log(probs[action] + 1e-10);
      const actorLoss = -logProb * advantage;
      const criticLoss = advantage ** 2;

      this.actor.backprop([state], [action], [actorLoss]);
      this.critic.backprop([state], null, [criticLoss]);
    }
  }
}
