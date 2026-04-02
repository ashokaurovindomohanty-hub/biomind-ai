import { Button } from "@/components/ui/button";
import { FlaskConical, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface HeroBannerProps {
  onStartDiagnosis: () => void;
}

export default function HeroBanner({ onStartDiagnosis }: HeroBannerProps) {
  return (
    <section className="hero-gradient py-16 px-4 text-white">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-teal" />
            <span className="text-sm font-medium text-white/70 uppercase tracking-wider">
              AI-Powered Medicine
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 tracking-tight">
            BioMind AI Dashboard
          </h1>
          <p className="text-lg text-white/70 mb-8 max-w-xl mx-auto">
            AI-Powered Diagnostic Analysis for precision patient care
          </p>
          <Button
            onClick={onStartDiagnosis}
            data-ocid="hero.primary_button"
            className="bg-white text-navy font-semibold hover:bg-white/90 px-7 py-2.5 rounded-lg shadow-md"
            size="lg"
          >
            <FlaskConical className="w-4 h-4 mr-2" />
            Start New Patient Diagnosis
          </Button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex items-center justify-center gap-10 mt-12 flex-wrap"
        >
          {[
            { value: "98.4%", label: "Diagnostic Accuracy" },
            { value: "2.3s", label: "Avg. Analysis Time" },
            { value: "12,847", label: "Cases Analyzed" },
            { value: "HIPAA", label: "Compliant" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-white/60 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
