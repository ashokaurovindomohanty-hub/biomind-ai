import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const instruments = [
  { name: "Robotic Arm A", lastSync: "09:14:22" },
  { name: "Robotic Arm B", lastSync: "09:14:22" },
  { name: "Haptic Controller", lastSync: "09:14:19" },
  { name: "Endoscope Camera", lastSync: "09:14:21" },
  { name: "Cauterizing Tool", lastSync: "09:14:18" },
  { name: "Suction Device", lastSync: "09:14:20" },
];

const statCards = [
  {
    label: "Sync Status",
    value: "ACTIVE",
    sub: "All systems nominal",
    isBadge: true,
    badgeClass: "status-green",
  },
  {
    label: "Precision Rate",
    value: "99.8%",
    sub: "+0.1% this session",
    isBadge: false,
    badgeClass: "",
  },
  {
    label: "Tremor Correction",
    value: "ENABLED",
    sub: "12 corrections/min",
    isBadge: true,
    badgeClass: "status-green",
  },
  {
    label: "Latency",
    value: "2.3ms",
    sub: "Sub-5ms threshold",
    isBadge: false,
    badgeClass: "",
  },
];

type ProcedureStatus = "IN PROGRESS" | "ONGOING" | "READY";

interface Procedure {
  id: string;
  patient: string;
  procedure: string;
  or: string;
  surgeon: string;
  status: ProcedureStatus;
  progress: number;
}

const initialProcedures: Procedure[] = [
  {
    id: "SP-001",
    patient: "Jane Doe",
    procedure: "Laparoscopic Cholecystectomy",
    or: "OR-3",
    surgeon: "Dr. Chen",
    status: "IN PROGRESS",
    progress: 67,
  },
  {
    id: "SP-002",
    patient: "John Smith",
    procedure: "Robotic Prostatectomy",
    or: "OR-1",
    surgeon: "Dr. Patel",
    status: "IN PROGRESS",
    progress: 45,
  },
  {
    id: "SP-003",
    patient: "Mary Johnson",
    procedure: "Craniotomy",
    or: "OR-5",
    surgeon: "Dr. Williams",
    status: "ONGOING",
    progress: 82,
  },
  {
    id: "SP-004",
    patient: "Robert Brown",
    procedure: "Spinal Fusion",
    or: "OR-2",
    surgeon: "Dr. Kumar",
    status: "READY",
    progress: 0,
  },
];

function statusBadgeClass(status: ProcedureStatus) {
  if (status === "IN PROGRESS") return "status-amber";
  if (status === "ONGOING") return "status-yellow";
  return "status-blue";
}

export default function SurgicalSync() {
  const [procedures, setProcedures] = useState<Procedure[]>(initialProcedures);
  const [controls, setControls] = useState({
    tremorFilter: true,
    hapticFeedback: true,
    precisionMode: true,
    autoCorrection: true,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setProcedures((prev) =>
        prev.map((p) => {
          if (p.status === "READY") return p;
          const next = p.progress + 1;
          return { ...p, progress: next > 100 ? 0 : next };
        }),
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Disclaimer Banner */}
      <div
        className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3"
        data-ocid="surgical_sync.panel"
      >
        <span className="text-xl">⚠️</span>
        <div>
          <p className="text-sm font-semibold text-amber-800">
            Simulation Interface Only
          </p>
          <p className="text-sm text-amber-700 mt-0.5">
            This is a simulation interface for demonstration purposes only. Not
            for use in actual surgical procedures. All data shown is fictional
            and for illustrative purposes.
          </p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            <Card className="border-border shadow-card">
              <CardContent className="p-5">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                  {card.label}
                </p>
                <div className="mt-1">
                  {card.isBadge ? (
                    <span
                      className={`text-sm font-semibold px-2.5 py-1 rounded-full ${card.badgeClass}`}
                    >
                      {card.value}
                    </span>
                  ) : (
                    <p className="text-xl font-bold text-foreground">
                      {card.value}
                    </p>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">{card.sub}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Procedures Table */}
      <Card className="border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Active Procedures
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table data-ocid="surgical_sync.table">
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead>ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Procedure</TableHead>
                <TableHead>OR</TableHead>
                <TableHead>Surgeon</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-36">Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {procedures.map((proc, i) => (
                <TableRow
                  key={proc.id}
                  data-ocid={`surgical_sync.row.${i + 1}`}
                >
                  <TableCell className="font-mono text-xs font-semibold text-muted-foreground">
                    {proc.id}
                  </TableCell>
                  <TableCell className="font-medium">{proc.patient}</TableCell>
                  <TableCell className="text-sm">{proc.procedure}</TableCell>
                  <TableCell className="text-sm font-medium">
                    {proc.or}
                  </TableCell>
                  <TableCell className="text-sm">{proc.surgeon}</TableCell>
                  <TableCell>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusBadgeClass(proc.status)}`}
                    >
                      {proc.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Progress
                        value={proc.progress}
                        className="h-2 [&>div]:bg-teal"
                      />
                      <p className="text-xs text-muted-foreground">
                        {proc.progress}%
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Instrument Calibration */}
        <Card className="border-border shadow-card">
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Instrument Calibration Panel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {instruments.map((inst) => (
                <div
                  key={inst.name}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {inst.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Last sync: {inst.lastSync}
                    </p>
                  </div>
                  <span className="status-green text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    Calibrated
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Sync Controls */}
        <Card className="border-border shadow-card">
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              AI Sync Controls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {(
                [
                  {
                    key: "tremorFilter",
                    label: "Tremor Filter",
                    desc: "Sub-millimeter tremor compensation",
                  },
                  {
                    key: "hapticFeedback",
                    label: "Haptic Feedback",
                    desc: "Force feedback for tactile precision",
                  },
                  {
                    key: "precisionMode",
                    label: "Precision Mode",
                    desc: "0.01mm movement accuracy",
                  },
                  {
                    key: "autoCorrection",
                    label: "Auto-Correction",
                    desc: "Real-time trajectory adjustment",
                  },
                ] as {
                  key: keyof typeof controls;
                  label: string;
                  desc: string;
                }[]
              ).map((ctrl) => (
                <div
                  key={ctrl.key}
                  className="flex items-center justify-between"
                >
                  <div>
                    <Label className="text-sm font-medium" htmlFor={ctrl.key}>
                      {ctrl.label}
                    </Label>
                    <p className="text-xs text-muted-foreground">{ctrl.desc}</p>
                  </div>
                  <Switch
                    id={ctrl.key}
                    checked={controls[ctrl.key]}
                    onCheckedChange={(v) =>
                      setControls((p) => ({ ...p, [ctrl.key]: v }))
                    }
                    data-ocid="surgical_sync.switch"
                    className="data-[state=checked]:bg-teal"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
