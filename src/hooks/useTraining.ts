import { useState, useCallback, useRef } from "react";

interface TrainingState {
  rewards: number[];
  losses: number[];
  isTraining: boolean;
  episode: number;
}

export function useTraining() {
  const [state, setState] = useState<TrainingState>({
    rewards: [],
    losses: [],
    isTraining: false,
    episode: 0,
  });
  const stopRef = useRef(false);

  const startTraining = useCallback(async (trainFn: () => Promise<{ reward: number; loss: number }>) => {
    setState(s => ({ ...s, isTraining: true }));
    stopRef.current = false;

    while (!stopRef.current) {
      const result = await trainFn();
      setState(s => ({
        ...s,
        rewards: [...s.rewards, result.reward],
        losses: [...s.losses, result.loss],
        episode: s.episode + 1,
      }));
    }

    setState(s => ({ ...s, isTraining: false }));
  }, []);

  const stopTraining = useCallback(() => {
    stopRef.current = true;
  }, []);

  return { ...state, startTraining, stopTraining };
}
