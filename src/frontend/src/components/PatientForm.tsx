import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FlaskConical, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { DiagnosisResult, Patient } from "../backend";
import { useCreateAndAnalyzePatient } from "../hooks/useQueries";

interface PatientFormProps {
  onResult: (result: DiagnosisResult, patient: Patient) => void;
}

const labFields = [
  { key: "WBC", label: "WBC", unit: "×10³/μL", placeholder: "7.5" },
  { key: "CRP", label: "CRP", unit: "mg/L", placeholder: "5.0" },
  { key: "Ferritin", label: "Ferritin", unit: "ng/mL", placeholder: "150" },
  { key: "D-Dimer", label: "D-Dimer", unit: "μg/mL", placeholder: "0.4" },
  { key: "SpO2", label: "SpO₂", unit: "%", placeholder: "98" },
  { key: "HeartRate", label: "Heart Rate", unit: "bpm", placeholder: "72" },
  { key: "Temperature", label: "Temperature", unit: "°C", placeholder: "37.0" },
];

export default function PatientForm({ onResult }: PatientFormProps) {
  const [form, setForm] = useState({
    id: "",
    name: "",
    age: "",
    sex: "",
    clinicalHistory: "",
  });
  const [labValues, setLabValues] = useState<Record<string, string>>({});

  const mutation = useCreateAndAnalyzePatient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.id || !form.name || !form.age || !form.sex) {
      toast.error("Please fill in all required patient fields.");
      return;
    }

    const patient: Patient = {
      id: form.id || `P-${Date.now()}`,
      name: form.name,
      age: BigInt(Number.parseInt(form.age) || 0),
      sex: form.sex,
      clinicalHistory: form.clinicalHistory,
      labValues: labFields
        .filter((f) => labValues[f.key])
        .map((f) => ({
          key: f.key,
          value: Number.parseFloat(labValues[f.key]),
        })),
    };

    try {
      const result = await mutation.mutateAsync(patient);
      onResult(result, patient);
      toast.success(`Analysis complete for ${patient.name}`);
    } catch {
      toast.error("Analysis failed. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
    >
      <Card className="shadow-card h-full">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-primary" />
            New Patient Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            data-ocid="patient.form"
          >
            {/* Patient info */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="patientId" className="text-xs font-medium">
                  Patient ID *
                </Label>
                <Input
                  id="patientId"
                  data-ocid="patient.input"
                  placeholder="P-2024-001"
                  value={form.id}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, id: e.target.value }))
                  }
                  className="h-8 text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="patientName" className="text-xs font-medium">
                  Full Name *
                </Label>
                <Input
                  id="patientName"
                  data-ocid="patient.name.input"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  className="h-8 text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="age" className="text-xs font-medium">
                  Age *
                </Label>
                <Input
                  id="age"
                  data-ocid="patient.age.input"
                  type="number"
                  placeholder="45"
                  min="0"
                  max="130"
                  value={form.age}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, age: e.target.value }))
                  }
                  className="h-8 text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs font-medium">Sex *</Label>
                <Select
                  value={form.sex}
                  onValueChange={(v) => setForm((p) => ({ ...p, sex: v }))}
                >
                  <SelectTrigger
                    className="h-8 text-sm"
                    data-ocid="patient.sex.select"
                  >
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="clinicalHistory" className="text-xs font-medium">
                Clinical History
              </Label>
              <Textarea
                id="clinicalHistory"
                data-ocid="patient.textarea"
                placeholder="Describe presenting symptoms, duration, medical history, medications..."
                value={form.clinicalHistory}
                onChange={(e) =>
                  setForm((p) => ({ ...p, clinicalHistory: e.target.value }))
                }
                className="text-sm min-h-[80px] resize-none"
              />
            </div>

            {/* Lab Values */}
            <div>
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Lab Values & Vitals
              </div>
              <div className="grid grid-cols-2 gap-2">
                {labFields.map((field) => (
                  <div key={field.key} className="space-y-1">
                    <Label className="text-xs font-medium">
                      {field.label}{" "}
                      <span className="text-muted-foreground font-normal">
                        ({field.unit})
                      </span>
                    </Label>
                    <Input
                      data-ocid={`patient.${field.key.toLowerCase()}.input`}
                      type="number"
                      step="any"
                      placeholder={field.placeholder}
                      value={labValues[field.key] || ""}
                      onChange={(e) =>
                        setLabValues((p) => ({
                          ...p,
                          [field.key]: e.target.value,
                        }))
                      }
                      className="h-8 text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              data-ocid="patient.submit_button"
              className="w-full"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analyzing...
                </>
              ) : (
                <>
                  <FlaskConical className="w-4 h-4 mr-2" /> Analyze Data
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
