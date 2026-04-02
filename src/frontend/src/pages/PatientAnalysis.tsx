import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "motion/react";
import { useState } from "react";

type RiskLevel = "Low" | "Moderate" | "High";

interface AnalysisResult {
  score: number;
  riskLevel: RiskLevel;
  recommendation: string;
}

const samplePatients = [
  {
    id: "P-001",
    name: "Emma Thompson",
    age: 58,
    hr: 88,
    bp: "145/92",
    glucose: 210,
    risk: "High" as RiskLevel,
  },
  {
    id: "P-002",
    name: "James Wilson",
    age: 42,
    hr: 72,
    bp: "120/80",
    glucose: 98,
    risk: "Low" as RiskLevel,
  },
  {
    id: "P-003",
    name: "Sarah Chen",
    age: 65,
    hr: 55,
    bp: "138/85",
    glucose: 135,
    risk: "Moderate" as RiskLevel,
  },
  {
    id: "P-004",
    name: "Marcus Rodriguez",
    age: 51,
    hr: 110,
    bp: "158/98",
    glucose: 178,
    risk: "High" as RiskLevel,
  },
  {
    id: "P-005",
    name: "Linda Park",
    age: 35,
    hr: 78,
    bp: "118/76",
    glucose: 92,
    risk: "Low" as RiskLevel,
  },
];

function riskBadgeClass(risk: RiskLevel) {
  if (risk === "Low") return "risk-low";
  if (risk === "Moderate") return "risk-moderate";
  return "risk-high";
}

function computeRisk(
  hr: number,
  systolic: number,
  glucose: number,
): AnalysisResult {
  let score = 0;
  if (hr > 100 || hr < 60) score += 2;
  if (systolic > 140) score += 3;
  if (glucose > 200) score += 3;
  else if (glucose > 126) score += 1;

  let riskLevel: RiskLevel;
  let recommendation: string;
  if (score >= 6) {
    riskLevel = "High";
    recommendation =
      "Immediate specialist consultation required. Order full metabolic panel, ECG, and continuous monitoring. Consider urgent cardiology or endocrinology referral.";
  } else if (score >= 3) {
    riskLevel = "Moderate";
    recommendation =
      "Schedule follow-up within 48 hours. Monitor vitals every 4 hours. Review medication adherence and consider lifestyle intervention counseling.";
  } else {
    riskLevel = "Low";
    recommendation =
      "Routine follow-up in 3 months. Encourage healthy diet, regular exercise, and medication compliance. No urgent intervention required.";
  }
  return { score, riskLevel, recommendation };
}

export default function PatientAnalysis() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    hr: "",
    bp: "",
    glucose: "",
    symptoms: "",
  });
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const hr = Number(form.hr);
    const systolic = Number(form.bp.split("/")[0]);
    const glucose = Number(form.glucose);
    setResult(computeRisk(hr, systolic, glucose));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
      data-ocid="patient_analysis.section"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <Card className="border-border shadow-card">
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Patient Risk Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Patient Name</Label>
                  <Input
                    id="name"
                    placeholder="Full name"
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name: e.target.value }))
                    }
                    data-ocid="patient_analysis.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Years"
                    value={form.age}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, age: e.target.value }))
                    }
                    data-ocid="patient_analysis.input"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="hr">Heart Rate (bpm)</Label>
                  <Input
                    id="hr"
                    type="number"
                    placeholder="e.g. 72"
                    value={form.hr}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, hr: e.target.value }))
                    }
                    required
                    data-ocid="patient_analysis.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="bp">Blood Pressure (mmHg)</Label>
                  <Input
                    id="bp"
                    placeholder="e.g. 120/80"
                    value={form.bp}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, bp: e.target.value }))
                    }
                    required
                    data-ocid="patient_analysis.input"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="glucose">Glucose (mg/dL)</Label>
                <Input
                  id="glucose"
                  type="number"
                  placeholder="e.g. 100"
                  value={form.glucose}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, glucose: e.target.value }))
                  }
                  required
                  data-ocid="patient_analysis.input"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="symptoms">Symptoms</Label>
                <Textarea
                  id="symptoms"
                  placeholder="Describe presenting symptoms..."
                  rows={3}
                  value={form.symptoms}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, symptoms: e.target.value }))
                  }
                  data-ocid="patient_analysis.textarea"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-teal hover:bg-teal-bright text-white"
                data-ocid="patient_analysis.submit_button"
              >
                Run AI Risk Analysis
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results */}
        <Card className="border-border shadow-card">
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Analysis Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            {result ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
                data-ocid="patient_analysis.success_state"
              >
                <div className="text-center py-6">
                  <p className="text-sm text-muted-foreground mb-2">
                    Risk Level
                  </p>
                  <span
                    className={`text-2xl font-bold px-6 py-2 rounded-full ${riskBadgeClass(result.riskLevel)}`}
                  >
                    {result.riskLevel} Risk
                  </span>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                    Risk Score
                  </p>
                  <p className="text-4xl font-bold text-foreground">
                    {result.score}
                    <span className="text-lg text-muted-foreground">/8</span>
                  </p>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    Recommended Follow-up
                  </p>
                  <p className="text-sm text-foreground leading-relaxed">
                    {result.recommendation}
                  </p>
                </div>
              </motion.div>
            ) : (
              <div
                className="flex flex-col items-center justify-center h-64 text-center"
                data-ocid="patient_analysis.empty_state"
              >
                <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mb-4">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-teal"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <p className="text-sm text-muted-foreground">
                  Complete the form to run the AI risk assessment
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Patient Table */}
      <Card className="border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Recent Patient Records
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table data-ocid="patient_analysis.table">
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Heart Rate</TableHead>
                <TableHead>Blood Pressure</TableHead>
                <TableHead>Glucose</TableHead>
                <TableHead>Risk</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {samplePatients.map((p, i) => (
                <TableRow
                  key={p.id}
                  data-ocid={`patient_analysis.row.${i + 1}`}
                >
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {p.id}
                  </TableCell>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell>{p.age}</TableCell>
                  <TableCell>{p.hr} bpm</TableCell>
                  <TableCell>{p.bp}</TableCell>
                  <TableCell>{p.glucose} mg/dL</TableCell>
                  <TableCell>
                    <Badge
                      className={`text-xs font-semibold border-0 ${riskBadgeClass(p.risk)}`}
                    >
                      {p.risk}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
}
