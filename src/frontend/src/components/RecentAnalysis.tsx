import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ClipboardList, Clock } from "lucide-react";
import type { Patient } from "../backend";
import { useGetAllPatients } from "../hooks/useQueries";

interface RecentAnalysisProps {
  onSelectPatient: (p: Patient) => void;
}

const MOCK_ANALYSES = [
  {
    id: "P-001",
    name: "James Mitchell",
    age: 58,
    date: "2024-01-15",
    condition: "ARDS",
    confidence: 87,
  },
  {
    id: "P-002",
    name: "Elena Rodriguez",
    age: 44,
    date: "2024-01-14",
    condition: "Pneumonia",
    confidence: 74,
  },
  {
    id: "P-003",
    name: "David Kim",
    age: 67,
    date: "2024-01-14",
    condition: "Sepsis",
    confidence: 81,
  },
  {
    id: "P-004",
    name: "Maria Santos",
    age: 52,
    date: "2024-01-13",
    condition: "COVID-19",
    confidence: 69,
  },
  {
    id: "P-005",
    name: "Robert Chen",
    age: 71,
    date: "2024-01-12",
    condition: "Heart Failure",
    confidence: 78,
  },
  {
    id: "P-006",
    name: "Fatima Al-Hassan",
    age: 35,
    date: "2024-01-11",
    condition: "Pneumonia",
    confidence: 63,
  },
];

const conditionColor: Record<string, string> = {
  ARDS: "bg-red-100 text-red-700",
  Sepsis: "bg-orange-100 text-orange-700",
  "COVID-19": "bg-blue-100 text-blue-700",
  Pneumonia: "bg-yellow-100 text-yellow-700",
  "Heart Failure": "bg-purple-100 text-purple-700",
};

export default function RecentAnalysis({
  onSelectPatient,
}: RecentAnalysisProps) {
  const { data: patients } = useGetAllPatients();

  const items = MOCK_ANALYSES;

  return (
    <Card className="shadow-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <ClipboardList className="w-4 h-4 text-primary" />
          Recent Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[280px]">
          <div className="divide-y divide-border">
            {items.map((item, i) => (
              <button
                type="button"
                key={item.id}
                data-ocid={`analysis.item.${i + 1}`}
                onClick={() => {
                  const p = (patients || []).find((pt) => pt.id === item.id);
                  if (p) onSelectPatient(p);
                }}
                className="w-full text-left px-4 py-3 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-foreground truncate">
                      {item.name}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      <span className="font-mono">{item.id}</span> · {item.age}y
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {item.date}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <Badge
                      className={`text-[10px] font-medium px-1.5 py-0 border-0 ${
                        conditionColor[item.condition] ??
                        "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {item.condition}
                    </Badge>
                    <span className="text-xs font-semibold text-muted-foreground">
                      {item.confidence}%
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
