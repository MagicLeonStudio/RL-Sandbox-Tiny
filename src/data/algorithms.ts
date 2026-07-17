export interface AlgorithmConfig {
  name: string;
  description: string;
  category: "value-based" | "policy-gradient" | "actor-critic";
  parameters: {
    learningRate: number;
    gamma: number;
    epsilon?: number;
    epsilonDecay?: number;
  };
}

export const algorithms: AlgorithmConfig[] = [
  {
    name: "Q-Learning",
    description: "Model-free off-policy algorithm using Q-table",
    category: "value-based",
    parameters: { learningRate: 0.1, gamma: 0.99, epsilon: 1.0, epsilonDecay: 0.995 },
  },
  {
    name: "SARSA",
    description: "Model-free on-policy algorithm using Q-table",
    category: "value-based",
    parameters: { learningRate: 0.1, gamma: 0.99, epsilon: 1.0, epsilonDecay: 0.995 },
  },
  {
    name: "DQN",
    description: "Deep Q-Network with experience replay",
    category: "value-based",
    parameters: { learningRate: 0.001, gamma: 0.99, epsilon: 1.0, epsilonDecay: 0.995 },
  },
  {
    name: "REINFORCE",
    description: "Monte Carlo policy gradient algorithm",
    category: "policy-gradient",
    parameters: { learningRate: 0.001, gamma: 0.99 },
  },
  {
    name: "Actor-Critic",
    description: "Combined actor and critic networks",
    category: "actor-critic",
    parameters: { learningRate: 0.001, gamma: 0.99 },
  },
  {
    name: "A3C",
    description: "Asynchronous Advantage Actor-Critic",
    category: "actor-critic",
    parameters: { learningRate: 0.001, gamma: 0.99 },
  },
  {
    name: "PPO",
    description: "Proximal Policy Optimization with clipped objective",
    category: "actor-critic",
    parameters: { learningRate: 0.0003, gamma: 0.99 },
  },
  {
    name: "TRPO",
    description: "Trust Region Policy Optimization",
    category: "actor-critic",
    parameters: { learningRate: 0.001, gamma: 0.99 },
  },
];
