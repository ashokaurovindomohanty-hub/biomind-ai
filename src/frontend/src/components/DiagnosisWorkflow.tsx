import {
  ChevronRight,
  ClipboardList,
  FileText,
  FlaskConical,
  User,
} from "lucide-react";
import { motion } from "motion/react";

const steps = [
  {
    step: 1,
    title: "Patient Info",
    icon: User,
    desc: "Basic demographics & ID",
  },
  {
    step: 2,
    title: "Clinical History",
    icon: ClipboardList,
    desc: "Symptoms & medical history",
  },
  {
    step: 3,
    title: "Lab Values",
    icon: FlaskConical,
    desc: "Biomarkers & vitals",
  },
  {
    step: 4,
    title: "Report Analysis",
    icon: FileText,
    desc: "AI diagnosis & confidence",
  },
];

export default function DiagnosisWorkflow() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <h2 className="text-lg font-semibold text-foreground mb-4">
        Diagnosis Workflow
      </h2>
      <div className="bg-card rounded-lg shadow-card p-4">
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          {steps.map((s, i) => (
            <div
              key={s.step}
              className="flex items-center gap-2 flex-1 min-w-0"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0 bg-background rounded-lg p-3 border border-border">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                    s.step === 1
                      ? "bg-primary/10 text-primary"
                      : s.step === 4
                        ? "bg-teal/10 text-teal"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  <s.icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-muted-foreground">
                    Step {s.step}
                  </div>
                  <div className="text-sm font-semibold text-foreground truncate">
                    {s.title}
                  </div>
                  <div className="text-xs text-muted-foreground truncate hidden sm:block">
                    {s.desc}
                  </div>
                </div>
              </div>
              {i < steps.length - 1 && (
                <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 hidden sm:block" />
              )}
            </div>
          ))}
        </div>

        {/* Smart analysis toolbar */}
        <div className="mt-3 flex items-center justify-between bg-primary/5 rounded-md px-4 py-2 border border-primary/10">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-primary/15 flex items-center justify-center">
              <span className="text-[10px] font-bold text-primary">AI</span>
            </div>
            <span className="text-sm text-muted-foreground">
              Powered by BioMind ML Engine v2.4
            </span>
          </div>
          <button
            type="button"
            className="text-sm font-medium text-primary flex items-center gap-1 hover:underline"
          >
            Smart Analysis <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.section>
  );
}
