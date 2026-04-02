import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp } from "lucide-react";
import { useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const VITAL_DATA = [
  { day: "Day 1", SpO2: 96, HeartRate: 88, Temperature: 38.2 },
  { day: "Day 2", SpO2: 94, HeartRate: 92, Temperature: 38.8 },
  { day: "Day 3", SpO2: 91, HeartRate: 98, Temperature: 39.1 },
  { day: "Day 4", SpO2: 89, HeartRate: 105, Temperature: 39.4 },
  { day: "Day 5", SpO2: 87, HeartRate: 112, Temperature: 38.9 },
  { day: "Day 6", SpO2: 90, HeartRate: 104, Temperature: 38.2 },
  { day: "Day 7", SpO2: 93, HeartRate: 95, Temperature: 37.8 },
];

const LAB_DATA = [
  { day: "Day 1", WBC: 8.2, CRP: 45, Ferritin: 320 },
  { day: "Day 2", WBC: 12.4, CRP: 110, Ferritin: 680 },
  { day: "Day 3", WBC: 15.8, CRP: 187, Ferritin: 1240 },
  { day: "Day 4", WBC: 18.1, CRP: 210, Ferritin: 1890 },
  { day: "Day 5", WBC: 16.3, CRP: 198, Ferritin: 2100 },
  { day: "Day 6", WBC: 13.7, CRP: 155, Ferritin: 1650 },
  { day: "Day 7", WBC: 10.2, CRP: 88, Ferritin: 980 },
];

const SEVERITY_DATA = [
  { day: "Day 1", ARDS: 22, Sepsis: 18, COVID: 30 },
  { day: "Day 2", ARDS: 38, Sepsis: 24, COVID: 45 },
  { day: "Day 3", ARDS: 55, Sepsis: 32, COVID: 62 },
  { day: "Day 4", ARDS: 72, Sepsis: 41, COVID: 78 },
  { day: "Day 5", ARDS: 68, Sepsis: 38, COVID: 72 },
  { day: "Day 6", ARDS: 58, Sepsis: 30, COVID: 60 },
  { day: "Day 7", ARDS: 44, Sepsis: 22, COVID: 48 },
];

const tabConfig = {
  vitals: {
    data: VITAL_DATA,
    lines: [
      { key: "SpO2", color: "#2F80ED", name: "SpO₂ (%)" },
      { key: "HeartRate", color: "#2AA6A6", name: "Heart Rate (bpm)" },
      { key: "Temperature", color: "#F59E0B", name: "Temp (°C×10)" },
    ],
  },
  lab: {
    data: LAB_DATA,
    lines: [
      { key: "WBC", color: "#2F80ED", name: "WBC (×10³/μL)" },
      { key: "CRP", color: "#EF4444", name: "CRP (mg/L)" },
      { key: "Ferritin", color: "#8B5CF6", name: "Ferritin (ng/mL÷10)" },
    ],
  },
  severity: {
    data: SEVERITY_DATA,
    lines: [
      { key: "ARDS", color: "#EF4444", name: "ARDS Score" },
      { key: "Sepsis", color: "#F59E0B", name: "Sepsis Score" },
      { key: "COVID", color: "#2F80ED", name: "COVID Score" },
    ],
  },
};

export default function HealthTrendsChart() {
  const [tab, setTab] = useState<"vitals" | "lab" | "severity">("vitals");
  const config = tabConfig[tab];

  return (
    <Card className="shadow-card">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            Patient Health Trends
          </CardTitle>
          <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
            <TabsList className="h-7">
              <TabsTrigger
                value="vitals"
                className="text-xs h-6 px-2.5"
                data-ocid="trends.vitals.tab"
              >
                Vital Signs
              </TabsTrigger>
              <TabsTrigger
                value="lab"
                className="text-xs h-6 px-2.5"
                data-ocid="trends.lab.tab"
              >
                Lab Markers
              </TabsTrigger>
              <TabsTrigger
                value="severity"
                className="text-xs h-6 px-2.5"
                data-ocid="trends.severity.tab"
              >
                Disease Severity
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[240px] mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={config.data}
              margin={{ top: 4, right: 8, left: -16, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(0.9 0.008 220)"
              />
              <XAxis
                dataKey="day"
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
              />
              <Legend wrapperStyle={{ fontSize: "11px" }} />
              {config.lines.map((line) => (
                <Line
                  key={line.key}
                  type="monotone"
                  dataKey={line.key}
                  stroke={line.color}
                  strokeWidth={2}
                  dot={{ r: 3, fill: line.color }}
                  activeDot={{ r: 5 }}
                  name={line.name}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
