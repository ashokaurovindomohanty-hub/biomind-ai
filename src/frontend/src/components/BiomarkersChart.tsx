import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { name: "WBC", value: 15.8, status: "high" },
  { name: "CRP", value: 187, status: "critical" },
  { name: "Ferritin", value: 1240, status: "high" },
  { name: "D-Dimer", value: 2.1, status: "critical" },
  { name: "SpO₂", value: 89, status: "low" },
  { name: "Temp", value: 39.1, status: "high" },
];

const statusColor: Record<string, string> = {
  critical: "#EF4444",
  high: "#F59E0B",
  low: "#3B82F6",
  normal: "#10B981",
};

export default function BiomarkersChart() {
  return (
    <Card className="shadow-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-primary" />
          Key Biomarkers
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[220px] mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 4, right: 8, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(0.9 0.008 220)"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid oklch(0.9 0.008 220)",
                  fontSize: "12px",
                }}
                formatter={(value) => [value, "Patient Value"]}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {data.map((entry) => (
                  <Cell key={entry.name} fill={statusColor[entry.status]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-4 mt-2 flex-wrap">
          {Object.entries(statusColor).map(([status, color]) => (
            <div key={status} className="flex items-center gap-1.5">
              <div
                className="w-2.5 h-2.5 rounded-sm"
                style={{ backgroundColor: color }}
              />
              <span className="text-xs text-muted-foreground capitalize">
                {status}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
