import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Crown, ShieldCheck, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const vipPatients = [
  {
    id: 1,
    name: "Ambassador Chen Wei",
    category: "Dignitary",
    condition: "Cardiac Bypass",
    boardVotes: 4,
    required: 5,
    status: "Authorized",
  },
  {
    id: 2,
    name: "Justice A. K. Sharma",
    category: "Senior Official",
    condition: "Neurological",
    boardVotes: 3,
    required: 5,
    status: "In Review",
  },
  {
    id: 3,
    name: "Emergency Case #VIP-07",
    category: "Emergency VIP",
    condition: "Trauma",
    boardVotes: 5,
    required: 5,
    status: "Authorized",
  },
  {
    id: 4,
    name: "Minister P. Reddy",
    category: "Dignitary",
    condition: "Orthopaedic",
    boardVotes: 2,
    required: 5,
    status: "Pending",
  },
];

const categoryStyle: Record<string, React.CSSProperties> = {
  Dignitary: {
    background: "oklch(0.92 0.06 55)",
    color: "oklch(0.48 0.18 55)",
    border: "none",
  },
  "Senior Official": {
    background: "oklch(0.93 0.08 240)",
    color: "oklch(0.45 0.15 240)",
    border: "none",
  },
  "Emergency VIP": {
    background: "oklch(0.93 0.15 27)",
    color: "oklch(0.48 0.22 27)",
    border: "none",
  },
};

const authStyle: Record<string, React.CSSProperties> = {
  Authorized: {
    background: "oklch(0.93 0.1 145)",
    color: "oklch(0.38 0.16 145)",
    border: "none",
  },
  "In Review": {
    background: "oklch(0.93 0.12 75)",
    color: "oklch(0.52 0.18 75)",
    border: "none",
  },
  Pending: {
    background: "oklch(0.93 0.06 220)",
    color: "oklch(0.45 0.1 220)",
    border: "none",
  },
};

export default function SpecialCategory() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    condition: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.category || !form.condition) {
      toast.error("Fill required fields");
      return;
    }
    toast.success("Authorization request submitted to board");
    setForm({ name: "", category: "", condition: "", notes: "" });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {vipPatients.map((p, i) => (
          <Card key={p.id} data-ocid={`special.patient.card.${i + 1}`}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: "oklch(0.92 0.06 55)" }}
                >
                  {p.category === "Dignitary" ? (
                    <Crown
                      className="w-5 h-5"
                      style={{ color: "oklch(0.48 0.18 55)" }}
                    />
                  ) : p.category === "Emergency VIP" ? (
                    <ShieldCheck
                      className="w-5 h-5"
                      style={{ color: "oklch(0.48 0.22 27)" }}
                    />
                  ) : (
                    <Star
                      className="w-5 h-5"
                      style={{ color: "oklch(0.45 0.15 240)" }}
                    />
                  )}
                </div>
                <Badge style={authStyle[p.status] ?? authStyle.Pending}>
                  {p.status}
                </Badge>
              </div>
              <h3 className="font-semibold text-sm leading-snug mb-1">
                {p.name}
              </h3>
              <p className="text-xs text-muted-foreground mb-3">
                {p.condition}
              </p>
              <Badge style={categoryStyle[p.category] ?? {}}>
                {p.category}
              </Badge>
              <div className="mt-3 space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Board Votes</span>
                  <span>
                    {p.boardVotes}/{p.required}
                  </span>
                </div>
                <Progress
                  value={(p.boardVotes / p.required) * 100}
                  className="h-1.5"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="text-base">New Authorization Request</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5 col-span-2">
                <Label>Patient Name</Label>
                <Input
                  data-ocid="special.name.input"
                  placeholder="Full name or designation"
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label>Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(v) => setForm((p) => ({ ...p, category: v }))}
                >
                  <SelectTrigger data-ocid="special.category.select">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dignitary">Dignitary</SelectItem>
                    <SelectItem value="Senior Official">
                      Senior Official
                    </SelectItem>
                    <SelectItem value="Emergency VIP">Emergency VIP</SelectItem>
                    <SelectItem value="VIP Family">VIP Family</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Medical Condition</Label>
                <Input
                  data-ocid="special.condition.input"
                  placeholder="Diagnosis / condition"
                  value={form.condition}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, condition: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-1.5 col-span-2">
                <Label>Additional Notes</Label>
                <Input
                  data-ocid="special.notes.input"
                  placeholder="Special requirements"
                  value={form.notes}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, notes: e.target.value }))
                  }
                />
              </div>
            </div>
            <Button
              type="submit"
              style={{ background: "oklch(0.5 0.11 185)", color: "white" }}
              data-ocid="special.submit.button"
            >
              Submit to Board for Authorization
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
