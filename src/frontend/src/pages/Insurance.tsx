import { Badge } from "@/components/ui/badge";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, Clock, Shield, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const providers = [
  {
    name: "Apollo Shield",
    coverage: "General, Cardiac, Surgical",
    maxCover: "$500,000",
    network: "Pan-India",
    color: "oklch(0.93 0.08 240)",
  },
  {
    name: "MedCare Plus",
    coverage: "General, Oncology, Maternity",
    maxCover: "$350,000",
    network: "National",
    color: "oklch(0.93 0.1 145)",
  },
  {
    name: "LifeFirst Health",
    coverage: "All Departments",
    maxCover: "$750,000",
    network: "International",
    color: "oklch(0.93 0.12 75)",
  },
  {
    name: "NatHealth",
    coverage: "General, Ortho, Neuro",
    maxCover: "$250,000",
    network: "Regional",
    color: "oklch(0.92 0.06 55)",
  },
];

type ClaimStatus = "Approved" | "Processing" | "Pending" | "Rejected";

const statusStyle: Record<ClaimStatus, React.CSSProperties> = {
  Approved: {
    background: "oklch(0.93 0.1 145)",
    color: "oklch(0.38 0.16 145)",
    border: "none",
  },
  Processing: {
    background: "oklch(0.93 0.08 240)",
    color: "oklch(0.45 0.15 240)",
    border: "none",
  },
  Pending: {
    background: "oklch(0.93 0.12 75)",
    color: "oklch(0.52 0.18 75)",
    border: "none",
  },
  Rejected: {
    background: "oklch(0.93 0.15 27)",
    color: "oklch(0.48 0.22 27)",
    border: "none",
  },
};

const initialClaims = [
  {
    id: 1,
    patient: "Vikram Nair",
    policy: "APL-2024-5512",
    provider: "Apollo Shield",
    treatment: "Cardiac Surgery",
    amount: "$42,000",
    status: "Approved" as ClaimStatus,
  },
  {
    id: 2,
    patient: "Preethi Anand",
    policy: "MCR-2025-0091",
    provider: "MedCare Plus",
    treatment: "Chemotherapy",
    amount: "$28,500",
    status: "Processing" as ClaimStatus,
  },
  {
    id: 3,
    patient: "Ali Hassan",
    policy: "LFH-2024-3344",
    provider: "LifeFirst Health",
    treatment: "Knee Replacement",
    amount: "$15,000",
    status: "Pending" as ClaimStatus,
  },
  {
    id: 4,
    patient: "Rekha Kumari",
    policy: "NH-2025-7821",
    provider: "NatHealth",
    treatment: "MRI + Diagnostics",
    amount: "$3,200",
    status: "Approved" as ClaimStatus,
  },
  {
    id: 5,
    patient: "Sanjay Gupta",
    policy: "APL-2025-8833",
    provider: "Apollo Shield",
    treatment: "Bypass Surgery",
    amount: "$65,000",
    status: "Rejected" as ClaimStatus,
  },
];

const statusIcons: Record<ClaimStatus, React.ReactNode> = {
  Approved: <CheckCircle className="w-3.5 h-3.5" />,
  Processing: <Clock className="w-3.5 h-3.5" />,
  Pending: <Clock className="w-3.5 h-3.5" />,
  Rejected: <XCircle className="w-3.5 h-3.5" />,
};

export default function Insurance() {
  const [claims, setClaims] = useState(initialClaims);
  const [form, setForm] = useState({
    patient: "",
    policy: "",
    provider: "",
    treatment: "",
    amount: "",
  });
  const [verify, setVerify] = useState({
    policy: "",
    provider: "",
    result: "",
  });

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.patient ||
      !form.policy ||
      !form.provider ||
      !form.treatment ||
      !form.amount
    ) {
      toast.error("Fill all fields");
      return;
    }
    setClaims((prev) => [
      {
        id: Date.now(),
        ...form,
        amount: `$${Number(form.amount).toLocaleString()}`,
        status: "Pending" as ClaimStatus,
      },
      ...prev,
    ]);
    setForm({
      patient: "",
      policy: "",
      provider: "",
      treatment: "",
      amount: "",
    });
    toast.success("Claim submitted successfully");
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verify.policy || !verify.provider) {
      toast.error("Enter policy details");
      return;
    }
    setVerify((p) => ({
      ...p,
      result: `Policy ${p.policy} with ${p.provider} is ACTIVE. Coverage verified.`,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {providers.map((prov, i) => (
          <Card key={prov.name} data-ocid={`insurance.provider.card.${i + 1}`}>
            <CardContent className="p-5">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                style={{ background: prov.color }}
              >
                <Shield
                  className="w-6 h-6"
                  style={{ color: "oklch(0.45 0.12 185)" }}
                />
              </div>
              <h3 className="font-bold text-sm mb-1">{prov.name}</h3>
              <p className="text-xs text-muted-foreground mb-2">
                {prov.coverage}
              </p>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Max Cover</span>
                <span className="font-semibold">{prov.maxCover}</span>
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span className="text-muted-foreground">Network</span>
                <span>{prov.network}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        <Card className="xl:col-span-3">
          <CardHeader>
            <CardTitle className="text-base">Submit Insurance Claim</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleClaim} className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5 col-span-2 md:col-span-1">
                <Label>Patient Name</Label>
                <Input
                  data-ocid="insurance.patient.input"
                  placeholder="Patient name"
                  value={form.patient}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, patient: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-1.5 col-span-2 md:col-span-1">
                <Label>Policy Number</Label>
                <Input
                  data-ocid="insurance.policy.input"
                  placeholder="e.g. APL-2025-1234"
                  value={form.policy}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, policy: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-1.5 col-span-2 md:col-span-1">
                <Label>Provider</Label>
                <Select
                  value={form.provider}
                  onValueChange={(v) => setForm((p) => ({ ...p, provider: v }))}
                >
                  <SelectTrigger data-ocid="insurance.provider.select">
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    {providers.map((pr) => (
                      <SelectItem key={pr.name} value={pr.name}>
                        {pr.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5 col-span-2 md:col-span-1">
                <Label>Treatment Type</Label>
                <Input
                  data-ocid="insurance.treatment.input"
                  placeholder="e.g. Cardiac Surgery"
                  value={form.treatment}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, treatment: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-1.5 col-span-2">
                <Label>Claim Amount (USD)</Label>
                <Input
                  type="number"
                  data-ocid="insurance.amount.input"
                  placeholder="0.00"
                  value={form.amount}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, amount: e.target.value }))
                  }
                />
              </div>
              <div className="col-span-2">
                <Button
                  type="submit"
                  style={{ background: "oklch(0.5 0.11 185)", color: "white" }}
                  data-ocid="insurance.submit.button"
                >
                  Submit Claim
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Coverage Verification</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerify} className="space-y-4">
              <div className="space-y-1.5">
                <Label>Policy Number</Label>
                <Input
                  data-ocid="insurance.verify.policy.input"
                  placeholder="Enter policy number"
                  value={verify.policy}
                  onChange={(e) =>
                    setVerify((p) => ({
                      ...p,
                      policy: e.target.value,
                      result: "",
                    }))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label>Insurance Provider</Label>
                <Select
                  value={verify.provider}
                  onValueChange={(v) =>
                    setVerify((p) => ({ ...p, provider: v, result: "" }))
                  }
                >
                  <SelectTrigger data-ocid="insurance.verify.provider.select">
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    {providers.map((pr) => (
                      <SelectItem key={pr.name} value={pr.name}>
                        {pr.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                type="submit"
                variant="outline"
                className="w-full"
                data-ocid="insurance.verify.button"
              >
                Verify Coverage
              </Button>
              {verify.result && (
                <div
                  className="p-3 rounded-lg text-sm"
                  style={{
                    background: "oklch(0.93 0.1 145)",
                    color: "oklch(0.38 0.16 145)",
                  }}
                  data-ocid="insurance.verify.success_state"
                >
                  <CheckCircle className="w-4 h-4 inline mr-1" />
                  {verify.result}
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Claims History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Policy</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Treatment</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {claims.map((c, i) => (
                <TableRow
                  key={c.id}
                  data-ocid={`insurance.claim.item.${i + 1}`}
                >
                  <TableCell className="font-medium">{c.patient}</TableCell>
                  <TableCell className="text-muted-foreground text-xs">
                    {c.policy}
                  </TableCell>
                  <TableCell>{c.provider}</TableCell>
                  <TableCell>{c.treatment}</TableCell>
                  <TableCell className="font-semibold">{c.amount}</TableCell>
                  <TableCell>
                    <Badge
                      style={statusStyle[c.status]}
                      className="flex items-center gap-1 w-fit"
                    >
                      {statusIcons[c.status]}
                      {c.status}
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
