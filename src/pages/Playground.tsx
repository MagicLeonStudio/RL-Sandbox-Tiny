import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { algorithms } from "@/data/algorithms";
import { useTraining } from "@/hooks/useTraining";
import RewardChart from "@/components/RewardChart";
import LossChart from "@/components/LossChart";

export default function Playground() {
  const [selectedAlgo, setSelectedAlgo] = useState(algorithms[0].name);
  const [selectedEnv, setSelectedEnv] = useState("CartPole");
  const { rewards, losses, isTraining, episode, startTraining, stopTraining } = useTraining();

  const algo = algorithms.find(a => a.name === selectedAlgo);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Algorithm</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedAlgo} onValueChange={setSelectedAlgo}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {algorithms.map(a => (
                  <SelectItem key={a.name} value={a.name}>{a.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {algo && (
              <p className="text-sm text-muted-foreground mt-2">{algo.description}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Environment</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedEnv} onValueChange={setSelectedEnv}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CartPole">CartPole</SelectItem>
                <SelectItem value="GridWorld">GridWorld</SelectItem>
                <SelectItem value="Snake">Snake</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Training</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-sm text-muted-foreground">Episode: {episode}</div>
            <div className="flex gap-2">
              <Button onClick={() => startTraining(async () => ({ reward: Math.random() * 100 - 50, loss: Math.random() }))} disabled={isTraining}>
                {isTraining ? "Training..." : "Start"}
              </Button>
              <Button variant="outline" onClick={stopTraining} disabled={!isTraining}>
                Stop
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RewardChart rewards={rewards} />
        <LossChart losses={losses} />
      </div>
    </div>
  );
}
