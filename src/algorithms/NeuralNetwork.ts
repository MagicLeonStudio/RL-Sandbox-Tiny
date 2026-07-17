export class NeuralNetwork {
  private layers: number[];
  private weights: number[][][];
  private biases: number[][];

  constructor(layers: number[]) {
    this.layers = layers;
    this.weights = [];
    this.biases = [];
    for (let i = 0; i < layers.length - 1; i++) {
      this.weights.push(
        Array.from({ length: layers[i] }, () =>
          Array.from({ length: layers[i + 1] }, () => Math.random() * 0.1 - 0.05)
        )
      );
      this.biases.push(Array.from({ length: layers[i + 1] }, () => Math.random() * 0.1 - 0.05));
    }
  }

  forward(input: number[]): number[] {
    let output = input;
    for (let i = 0; i < this.weights.length; i++) {
      const newOutput: number[] = [];
      for (let j = 0; j < this.biases[i].length; j++) {
        let sum = this.biases[i][j];
        for (let k = 0; k < output.length; k++) {
          sum += output[k] * this.weights[i][k][j];
        }
        newOutput.push(i === this.weights.length - 1 ? sum : Math.max(0, sum));
      }
      output = newOutput;
    }
    return output;
  }

  backprop(states: number[][], actions: number[] | null, targets: number[]) {
    const lr = 0.001;
    for (let s = 0; s < states.length; s++) {
      const output = this.forward(states[s]);
      for (let i = 0; i < output.length; i++) {
        const target = actions ? targets[s] : targets[s];
        const error = (actions ? (i === actions[s] ? target : output[i]) : target) - output[i];
        for (let j = 0; j < this.weights[this.weights.length - 1].length; j++) {
          this.weights[this.weights.length - 1][j][i] += lr * error * states[s][j];
        }
        this.biases[this.biases.length - 1][i] += lr * error;
      }
    }
  }

  clone(): NeuralNetwork {
    const nn = new NeuralNetwork(this.layers);
    nn.weights = this.weights.map(w => w.map(row => [...row]));
    nn.biases = this.biases.map(b => [...b]);
    return nn;
  }
}
