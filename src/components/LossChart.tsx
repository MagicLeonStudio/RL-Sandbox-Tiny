import { Card } from "@/components/ui/card";

interface LossChartProps {
  losses: number[];
}

export default function LossChart({ losses }: LossChartProps) {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Loss History</h3>
      <div className="h-64 bg-muted rounded-lg flex items-end gap-1 p-2 overflow-hidden">
        {losses.slice(-100).map((loss, i) => (
          <div
            key={i}
            className="flex-1 bg-red-400 rounded-t"
            style={{ height: `${Math.min(100, Math.max(5, loss * 100))}%` }}
          />
        ))}
      </div>
    </Card>
  );
}
