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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, DollarSign, HeartHandshake, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const initialBeneficiaries = [
  {
    id: 1,
    name: "Lakshmi Devi",
    income: "Below $5,000/yr",
    idProof: "Aadhaar Card",
    referral: "Social Worker",
    subsidy: "$2,400",
    status: "Approved",
  },
  {
    id: 2,
    name: "Mohammad Arif",
    income: "Below $8,000/yr",
    idProof: "BPL Card",
    referral: "NGO Referral",
    subsidy: "$1,800",
    status: "Pending",
  },
  {
    id: 3,
    name: "Sunita Bai",
    income: "Below $4,000/yr",
    idProof: "Voter ID",
    referral: "Government Hospital",
    subsidy: "$3,200",
    status: "Approved",
  },
  {
    id: 4,
    name: "Ramesh Yadav",
    income: "Below $6,000/yr",
    idProof: "Aadhaar Card",
    referral: "Social Worker",
    subsidy: "$1,500",
    status: "Under Review",
  },
];

type StatusType = "Approved" | "Pending" | "Under Review";

const statusStyle: Record<StatusType, React.CSSProperties> = {
  Approved: {
    background: "oklch(0.93 0.1 145)",
    color: "oklch(0.38 0.16 145)",
    border: "none",
  },
  Pending: {
    background: "oklch(0.93 0.12 75)",
    color: "oklch(0.52 0.18 75)",
    border: "none",
  },
  "Under Review": {
    background: "oklch(0.93 0.08 240)",
    color: "oklch(0.45 0.15 240)",
    border: "none",
  },
};

export default function FreeTreatment() {
  const [beneficiaries, setBeneficiaries] = useState(initialBeneficiaries);
  const [form, setForm] = useState({
    name: "",
    income: "",
    idProof: "",
    referral: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.income || !form.idProof || !form.referral) {
      toast.error("Please fill all fields");
      return;
    }
    setBeneficiaries((prev) => [
      ...prev,
      { id: Date.now(), ...form, subsidy: "Pending Review", status: "Pending" },
    ]);
    setForm({ name: "", income: "", idProof: "", referral: "" });
    toast.success("Application submitted for review");
  };

  const allocated = 500000;
  const utilized = 187000;
  const remaining = allocated - utilized;
  const utilPct = Math.round((utilized / allocated) * 100);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: "oklch(0.93 0.1 145)" }}
            >
              <DollarSign
                className="w-6 h-6"
                style={{ color: "oklch(0.42 0.16 145)" }}
              />
            </div>
            <div>
              <p className="text-2xl font-bold">$500,000</p>
              <p className="text-sm text-muted-foreground">Total Allocated</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: "oklch(0.93 0.11 185)" }}
            >
              <HeartHandshake
                className="w-6 h-6"
                style={{ color: "oklch(0.42 0.14 185)" }}
              />
            </div>
            <div>
              <p className="text-2xl font-bold">${utilized.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Utilized</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: "oklch(0.93 0.12 75)" }}
            >
              <Users
                className="w-6 h-6"
                style={{ color: "oklch(0.52 0.18 75)" }}
              />
            </div>
            <div>
              <p className="text-2xl font-bold">
                ${remaining.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">Remaining</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Eligibility Criteria</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              "Annual household income below $10,000",
              "Valid government-issued ID (Aadhaar / BPL Card / Voter ID)",
              "Social worker or NGO referral letter",
              "Proof of inability to pay (bank statement)",
              "Board approval for treatments above $5,000",
            ].map((c) => (
              <div key={c} className="flex items-start gap-2">
                <CheckCircle
                  className="w-4 h-4 mt-0.5 flex-shrink-0"
                  style={{ color: "oklch(0.5 0.11 185)" }}
                />
                <p className="text-sm text-muted-foreground">{c}</p>
              </div>
            ))}
            <div className="pt-3 space-y-1.5">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Fund Utilization</span>
                <span>{utilPct}%</span>
              </div>
              <Progress value={utilPct} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="xl:col-span-3">
          <CardHeader>
            <CardTitle className="text-base">New Application</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="ft-name">Patient Name</Label>
                <Input
                  id="ft-name"
                  data-ocid="freetreatment.name.input"
                  placeholder="Full name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ft-income">Annual Income Level</Label>
                <Input
                  id="ft-income"
                  data-ocid="freetreatment.income.input"
                  placeholder="e.g. Below $5,000/yr"
                  value={form.income}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, income: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label>ID Proof Type</Label>
                <Select
                  value={form.idProof}
                  onValueChange={(v) => setForm((p) => ({ ...p, idProof: v }))}
                >
                  <SelectTrigger data-ocid="freetreatment.idproof.select">
                    <SelectValue placeholder="Select ID type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Aadhaar Card">Aadhaar Card</SelectItem>
                    <SelectItem value="BPL Card">BPL Card</SelectItem>
                    <SelectItem value="Voter ID">Voter ID</SelectItem>
                    <SelectItem value="Passport">Passport</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Referral Source</Label>
                <Select
                  value={form.referral}
                  onValueChange={(v) => setForm((p) => ({ ...p, referral: v }))}
                >
                  <SelectTrigger data-ocid="freetreatment.referral.select">
                    <SelectValue placeholder="Select referral" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Social Worker">Social Worker</SelectItem>
                    <SelectItem value="NGO Referral">NGO Referral</SelectItem>
                    <SelectItem value="Government Hospital">
                      Government Hospital
                    </SelectItem>
                    <SelectItem value="Doctor">Doctor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                type="submit"
                className="w-full"
                style={{ background: "oklch(0.5 0.11 185)", color: "white" }}
                data-ocid="freetreatment.submit.button"
              >
                Submit Application
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Beneficiaries</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Income Level</TableHead>
                <TableHead>ID Proof</TableHead>
                <TableHead>Referral</TableHead>
                <TableHead>Subsidy</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {beneficiaries.map((b, i) => (
                <TableRow key={b.id} data-ocid={`freetreatment.item.${i + 1}`}>
                  <TableCell className="font-medium">{b.name}</TableCell>
                  <TableCell>{b.income}</TableCell>
                  <TableCell>{b.idProof}</TableCell>
                  <TableCell>{b.referral}</TableCell>
                  <TableCell>{b.subsidy}</TableCell>
                  <TableCell>
                    <Badge
                      style={
                        statusStyle[b.status as StatusType] ??
                        statusStyle.Pending
                      }
                    >
                      {b.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
