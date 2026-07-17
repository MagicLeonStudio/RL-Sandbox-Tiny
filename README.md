# RL Sandbox

An interactive reinforcement learning playground built with React, TypeScript, and Tailwind CSS. This application allows users to experiment with various RL algorithms (Q-Learning, SARSA, Policy Gradient) across multiple environments (Grid World, Cart Pole, Snake Game).

## Features

- **Interactive RL Environments**: Grid World, Cart Pole, and Snake Game
- **Multiple Algorithms**: Q-Learning, SARSA, Policy Gradient
- **Real-time Visualization**: Watch agents learn in real-time
- **Environment Editor**: Customize grid worlds with obstacles, rewards, and starting positions
- **Performance Analytics**: Track learning progress with charts and metrics
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS + shadcn/ui
- Lucide React icons

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
  components/       # React components
    ui/            # shadcn/ui components
  environments/    # RL environments
  algorithms/      # RL algorithms
  types/           # TypeScript types
  lib/             # Utility functions
  hooks/           # Custom React hooks
  App.tsx          # Main app component
  main.tsx         # Entry point
```

## License

MIT
