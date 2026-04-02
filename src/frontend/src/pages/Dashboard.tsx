import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "motion/react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const specialtyData = [
  { specialty: "Cardiology", cases: 85 },
  { specialty: "Oncology", cases: 62 },
  { specialty: "Neurology", cases: 54 },
  { specialty: "Orthopedics", cases: 47 },
];

const accuracyTrend = [
  { month: "Oct", accuracy: 95.2 },
  { month: "Nov", accuracy: 96.1 },
  { month: "Dec", accuracy: 96.8 },
  { month: "Jan", accuracy: 97.4 },
  { month: "Feb", accuracy: 97.9 },
  { month: "Mar", accuracy: 98.6 },
];

const kpis = [
  {
    label: "Total Patients",
    value: "248",
    delta: "+12",
    deltaLabel: "this month",
    deltaNeg: false,
  },
  {
    label: "Active Cases",
    value: "47",
    delta: "+5",
    deltaLabel: "this week",
    deltaNeg: false,
  },
  {
    label: "High-Risk",
    value: "12",
    delta: "-3",
    deltaLabel: "vs last week",
    deltaNeg: true,
  },
  {
    label: "AI Accuracy",
    value: "98.6%",
    delta: "+2.3%",
    deltaLabel: "vs last month",
    deltaNeg: false,
  },
];

const recentActivity = [
  {
    action: "Patient analysis completed",
    patient: "Emma Thompson",
    time: "2 min ago",
    badge: "COMPLETED",
    badgeClass: "status-green",
  },
  {
    action: "High-risk alert flagged",
    patient: "Marcus Rodriguez",
    time: "18 min ago",
    badge: "HIGH RISK",
    badgeClass: "risk-high",
  },
  {
    action: "Surgical sync initiated",
    patient: "Jane Doe — OR-3",
    time: "34 min ago",
    badge: "IN PROGRESS",
    badgeClass: "status-amber",
  },
  {
    action: "Model accuracy updated",
    patient: "System",
    time: "1 hr ago",
    badge: "SYSTEM",
    badgeClass: "status-blue",
  },
];

export default function Dashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* KPI Strip */}
      <div
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        data-ocid="dashboard.section"
      >
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.35 }}
          >
            <Card className="border-border shadow-card">
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground font-medium">
                  {kpi.label}
                </p>
                <p className="text-3xl font-bold text-foreground mt-1">
                  {kpi.value}
                </p>
                <p
                  className={`text-sm font-semibold mt-1 ${kpi.deltaNeg ? "text-red-500" : "text-emerald-600"}`}
                >
                  {kpi.delta}
                  <span className="text-muted-foreground font-normal ml-1">
                    {kpi.deltaLabel}
                  </span>
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">
              Patient Cases by Specialty
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={specialtyData}
                margin={{ top: 4, right: 8, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E6E9EE" />
                <XAxis
                  dataKey="specialty"
                  tick={{ fontSize: 12, fill: "#6B7785" }}
                />
                <YAxis tick={{ fontSize: 12, fill: "#6B7785" }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid #E6E9EE",
                    fontSize: 13,
                  }}
                  cursor={{ fill: "oklch(0.93 0.03 185)" }}
                />
                <Bar
                  dataKey="cases"
                  fill="oklch(0.50 0.11 185)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">
              AI Analysis Accuracy Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart
                data={accuracyTrend}
                margin={{ top: 4, right: 8, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E6E9EE" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: "#6B7785" }}
                />
                <YAxis
                  domain={[93, 100]}
                  tick={{ fontSize: 12, fill: "#6B7785" }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid #E6E9EE",
                    fontSize: 13,
                  }}
                  formatter={(v: number) => [`${v}%`, "Accuracy"]}
                />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="oklch(0.50 0.11 185)"
                  strokeWidth={2.5}
                  dot={{ fill: "oklch(0.50 0.11 185)", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-border shadow-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((item) => (
              <div
                key={item.action}
                className="flex items-center justify-between py-2 border-b border-border last:border-0"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {item.action}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.patient}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${item.badgeClass}`}
                  >
                    {item.badge}
                  </span>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {item.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
