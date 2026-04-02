import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Activity, AlertCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { DiagnosisResult } from "../backend";

interface ResultsCardProps {
  result: DiagnosisResult | null;
}

const conditionColors: Record<string, string> = {
  ARDS: "text-red-600 bg-red-50",
  Sepsis: "text-orange-600 bg-orange-50",
  "COVID-19": "text-blue-600 bg-blue-50",
  Pneumonia: "text-yellow-700 bg-yellow-50",
  "Heart Failure": "text-purple-600 bg-purple-50",
};

const MOCK_RESULT: DiagnosisResult = {
  condition: "ARDS",
  confidence: 0.87,
  differentials: [
    { condition: "ARDS", probability: 0.87 },
    { condition: "COVID-19", probability: 0.62 },
    { condition: "Pneumonia", probability: 0.45 },
    { condition: "Sepsis", probability: 0.31 },
    { condition: "Heart Failure", probability: 0.18 },
  ],
};

export default function ResultsCard({ result }: ResultsCardProps) {
  const displayResult = result ?? MOCK_RESULT;
  const isDemo = result === null;

  const confidencePct = Math.round(displayResult.confidence * 100);
  const colorClass =
    conditionColors[displayResult.condition] ?? "text-primary bg-primary/10";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <Card className="shadow-card h-full">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              ML-Based Results
            </CardTitle>
            {isDemo && (
              <Badge
                variant="outline"
                className="text-xs text-muted-foreground border-dashed"
              >
                Demo
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            <motion.div
              key={displayResult.condition}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              {/* Primary diagnosis */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">
                    Primary Diagnosis
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xl font-bold px-2.5 py-0.5 rounded-md ${colorClass}`}
                    >
                      {displayResult.condition}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground mb-1">
                    Confidence
                  </div>
                  <div className="text-2xl font-bold text-foreground">
                    {confidencePct}%
                  </div>
                </div>
              </div>

              {/* Confidence bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Diagnostic Confidence</span>
                  <span>{confidencePct}%</span>
                </div>
                <Progress value={confidencePct} className="h-2.5" />
              </div>

              {/* Differentials */}
              <div>
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Differential Diagnoses
                </div>
                <div className="space-y-2.5">
                  {displayResult.differentials.slice(0, 5).map((d, i) => {
                    const pct = Math.round(d.probability * 100);
                    const c =
                      conditionColors[d.condition] ??
                      "text-primary bg-primary/10";
                    const textColor = c.split(" ")[0];
                    return (
                      <div
                        key={d.condition}
                        data-ocid={`results.differential.item.${i + 1}`}
                      >
                        <div className="flex justify-between text-xs mb-1">
                          <span className={`font-medium ${textColor}`}>
                            {d.condition}
                          </span>
                          <span className="text-muted-foreground">{pct}%</span>
                        </div>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full ${c.split(" ")[0].replace("text-", "bg-")}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{
                              duration: 0.7,
                              delay: i * 0.08,
                              ease: "easeOut",
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Status */}
              <div className="flex items-start gap-2 bg-amber-50 rounded-lg p-3 border border-amber-200">
                <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <p className="text-xs text-amber-800">
                  AI-assisted analysis only. All results must be reviewed and
                  validated by a licensed medical professional.
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}
