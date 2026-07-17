import { Card } from "@/components/ui/card";

interface RewardChartProps {
  rewards: number[];
}

export default function RewardChart({ rewards }: RewardChartProps) {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Reward History</h3>
      <div className="h-64 bg-muted rounded-lg flex items-end gap-1 p-2 overflow-hidden">
        {rewards.slice(-100).map((reward, i) => (
          <div
            key={i}
            className="flex-1 bg-green-400 rounded-t"
            style={{ height: `${Math.min(100, Math.max(5, (reward + 50) * 2))}%` }}
          />
        ))}
      </div>
    </Card>
  );
}
