import { NeuralNetwork } from "./NeuralNetwork";

interface Transition {
  state: number[];
  action: number;
  reward: number;
  nextState: number[];
  done: boolean;
}

export class DQN {
  private qNetwork: NeuralNetwork;
  private targetNetwork: NeuralNetwork;
  private replayBuffer: Transition[];
  private bufferSize: number;
  private batchSize: number;
  private epsilon: number;
  private epsilonDecay: number;
  private epsilonMin: number;
  private gamma: number;
  private actionSize: number;

  constructor(
    inputSize: number,
    actionSize: number,
    bufferSize = 10000,
    batchSize = 32,
    gamma = 0.99,
    epsilon = 1.0,
    epsilonDecay = 0.995,
    epsilonMin = 0.01
  ) {
    this.qNetwork = new NeuralNetwork([inputSize, 64, 64, actionSize]);
    this.targetNetwork = new NeuralNetwork([inputSize, 64, 64, actionSize]);
    this.replayBuffer = [];
    this.bufferSize = bufferSize;
    this.batchSize = batchSize;
    this.gamma = gamma;
    this.epsilon = epsilon;
    this.epsilonDecay = epsilonDecay;
    this.epsilonMin = epsilonMin;
    this.actionSize = actionSize;
  }

  selectAction(state: number[]): number {
    if (Math.random() < this.epsilon) {
      return Math.floor(Math.random() * this.actionSize);
    }
    const qValues = this.qNetwork.forward(state);
    return qValues.indexOf(Math.max(...qValues));
  }

  storeTransition(transition: Transition) {
    if (this.replayBuffer.length >= this.bufferSize) {
      this.replayBuffer.shift();
    }
    this.replayBuffer.push(transition);
  }

  train() {
    if (this.replayBuffer.length < this.batchSize) return;

    const batch = this.sampleBatch();
    const states = batch.map(t => t.state);
    const actions = batch.map(t => t.action);
    const rewards = batch.map(t => t.reward);
    const nextStates = batch.map(t => t.nextState);
    const dones = batch.map(t => t.done);

    const targets = states.map((s, i) => {
      const qValues = this.qNetwork.forward(s);
      const nextQValues = this.targetNetwork.forward(nextStates[i]);
      const maxNextQ = Math.max(...nextQValues);
      const target = rewards[i] + (dones[i] ? 0 : this.gamma * maxNextQ);
      const newQValues = [...qValues];
      newQValues[actions[i]] = target;
      return newQValues;
    });

    this.qNetwork.backprop(states, actions, targets.flat());
    this.epsilon = Math.max(this.epsilonMin, this.epsilon * this.epsilonDecay);
  }

  updateTargetNetwork() {
    this.targetNetwork = this.qNetwork.clone();
  }

  private sampleBatch(): Transition[] {
    const batch: Transition[] = [];
    for (let i = 0; i < this.batchSize; i++) {
      const idx = Math.floor(Math.random() * this.replayBuffer.length);
      batch.push(this.replayBuffer[idx]);
    }
    return batch;
  }
}
