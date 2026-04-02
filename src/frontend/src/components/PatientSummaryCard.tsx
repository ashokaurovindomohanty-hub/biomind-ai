import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Activity, CalendarDays, Hash, MoreVertical, User } from "lucide-react";
import type { Patient } from "../backend";

const DEMO_PATIENT: Patient = {
  id: "P-001",
  name: "James Mitchell",
  age: BigInt(58),
  sex: "Male",
  clinicalHistory:
    "Progressive dyspnea over 5 days. Bilateral infiltrates on chest X-ray. Recent COVID-19 infection 3 weeks prior. No prior lung disease. Current medications: metformin, lisinopril.",
  labValues: [
    { key: "WBC", value: 15.8 },
    { key: "CRP", value: 187 },
    { key: "Ferritin", value: 1240 },
    { key: "SpO2", value: 89 },
  ],
};

interface PatientSummaryCardProps {
  patient: Patient | null;
}

export default function PatientSummaryCard({
  patient,
}: PatientSummaryCardProps) {
  const p = patient ?? DEMO_PATIENT;
  const initials = p.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Card className="shadow-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            Patient Summary
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                data-ocid="patient_summary.open_modal_button"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              data-ocid="patient_summary.dropdown_menu"
            >
              <DropdownMenuItem>View Full Record</DropdownMenuItem>
              <DropdownMenuItem>Edit Patient</DropdownMenuItem>
              <DropdownMenuItem>Download Report</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Delete Record
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        {/* Header info */}
        <div className="flex items-center gap-4 mb-5">
          <Avatar className="w-14 h-14">
            <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold text-foreground text-lg">
              {p.name}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="text-xs">
                {p.sex}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {Number(p.age)} yrs
              </Badge>
              <Badge className="text-xs bg-green-100 text-green-700 border-0">
                Active
              </Badge>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
              <Hash className="w-3 h-3" />
              Patient ID
            </div>
            <div className="text-sm font-semibold font-mono">{p.id}</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
              <CalendarDays className="w-3 h-3" />
              Admission
            </div>
            <div className="text-sm font-semibold">Jan 15, 2024</div>
          </div>
        </div>

        {/* Clinical history */}
        {p.clinicalHistory && (
          <div className="mb-4">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Clinical Notes
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
              {p.clinicalHistory}
            </p>
          </div>
        )}

        {/* Lab summary */}
        {p.labValues.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              <Activity className="w-3 h-3" />
              Lab Values
            </div>
            <div className="grid grid-cols-2 gap-2">
              {p.labValues.slice(0, 4).map((lv) => (
                <div
                  key={lv.key}
                  className="flex justify-between items-center bg-muted/40 rounded px-2.5 py-1.5 text-xs"
                >
                  <span className="text-muted-foreground">{lv.key}</span>
                  <span className="font-semibold">{lv.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
