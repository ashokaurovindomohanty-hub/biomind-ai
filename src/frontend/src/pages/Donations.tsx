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
import { Textarea } from "@/components/ui/textarea";
import { Heart, Target, TrendingUp, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const purposeColors: Record<string, React.CSSProperties> = {
  "General Fund": {
    background: "oklch(0.93 0.08 240)",
    color: "oklch(0.45 0.15 240)",
    border: "none",
  },
  "Free Treatment": {
    background: "oklch(0.93 0.1 145)",
    color: "oklch(0.38 0.16 145)",
    border: "none",
  },
  Equipment: {
    background: "oklch(0.93 0.12 75)",
    color: "oklch(0.52 0.18 75)",
    border: "none",
  },
  Research: {
    background: "oklch(0.92 0.06 55)",
    color: "oklch(0.48 0.18 55)",
    border: "none",
  },
};

const initialDonations = [
  {
    id: 1,
    donor: "Tata Trusts",
    amount: "$50,000",
    purpose: "Free Treatment",
    date: "2026-03-15",
  },
  {
    id: 2,
    donor: "Anonymous",
    amount: "$10,000",
    purpose: "Equipment",
    date: "2026-03-18",
  },
  {
    id: 3,
    donor: "Infosys Foundation",
    amount: "$75,000",
    purpose: "Research",
    date: "2026-03-22",
  },
  {
    id: 4,
    donor: "Ratan Mehta",
    amount: "$5,000",
    purpose: "General Fund",
    date: "2026-03-25",
  },
  {
    id: 5,
    donor: "Global Health Initiative",
    amount: "$105,000",
    purpose: "Free Treatment",
    date: "2026-03-28",
  },
];

const allocationData = [
  { label: "Free Treatment", pct: 40, color: "oklch(0.5 0.11 185)" },
  { label: "Equipment", pct: 30, color: "oklch(0.62 0.14 185)" },
  { label: "Research", pct: 20, color: "oklch(0.65 0.15 145)" },
  { label: "Operations", pct: 10, color: "oklch(0.72 0.17 55)" },
];

export default function Donations() {
  const [donations, setDonations] = useState(initialDonations);
  const [form, setForm] = useState({
    donor: "",
    amount: "",
    purpose: "",
    message: "",
  });
  const totalRaised = 245000;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.donor || !form.amount || !form.purpose) {
      toast.error("Please fill required fields");
      return;
    }
    const newD = {
      id: Date.now(),
      donor: form.donor,
      amount: `$${Number(form.amount).toLocaleString()}`,
      purpose: form.purpose,
      date: new Date().toISOString().slice(0, 10),
    };
    setDonations((prev) => [newD, ...prev]);
    setForm({ donor: "", amount: "", purpose: "", message: "" });
    toast.success("Donation recorded. Thank you!");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="md:col-span-2">
          <CardContent className="p-5 flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center"
              style={{ background: "oklch(0.93 0.15 27)" }}
            >
              <Heart
                className="w-7 h-7"
                style={{ color: "oklch(0.48 0.22 27)" }}
              />
            </div>
            <div>
              <p className="text-3xl font-bold">
                ${totalRaised.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">
                Total Funds Raised
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: "oklch(0.93 0.1 145)" }}
            >
              <Users
                className="w-6 h-6"
                style={{ color: "oklch(0.42 0.16 145)" }}
              />
            </div>
            <div>
              <p className="text-2xl font-bold">{donations.length}</p>
              <p className="text-sm text-muted-foreground">Donors</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: "oklch(0.93 0.08 240)" }}
            >
              <TrendingUp
                className="w-6 h-6"
                style={{ color: "oklch(0.45 0.15 240)" }}
              />
            </div>
            <div>
              <p className="text-2xl font-bold">+18%</p>
              <p className="text-sm text-muted-foreground">vs Last Month</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Make a Donation</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label>Donor Name</Label>
                <Input
                  data-ocid="donation.donor.input"
                  placeholder="Individual or organization"
                  value={form.donor}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, donor: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label>Amount (USD)</Label>
                <Input
                  type="number"
                  data-ocid="donation.amount.input"
                  placeholder="0.00"
                  min="1"
                  value={form.amount}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, amount: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label>Purpose</Label>
                <Select
                  value={form.purpose}
                  onValueChange={(v) => setForm((p) => ({ ...p, purpose: v }))}
                >
                  <SelectTrigger data-ocid="donation.purpose.select">
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General Fund">General Fund</SelectItem>
                    <SelectItem value="Free Treatment">
                      Free Treatment
                    </SelectItem>
                    <SelectItem value="Equipment">Equipment</SelectItem>
                    <SelectItem value="Research">Research</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Message (optional)</Label>
                <Textarea
                  data-ocid="donation.message.textarea"
                  placeholder="Leave a message..."
                  value={form.message}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, message: e.target.value }))
                  }
                  rows={2}
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                style={{ background: "oklch(0.48 0.22 27)", color: "white" }}
                data-ocid="donation.submit.button"
              >
                <Heart className="w-4 h-4 mr-2" /> Donate Now
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="xl:col-span-3">
          <CardHeader>
            <CardTitle className="text-base">Fund Allocation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {allocationData.map((a) => (
              <div key={a.label} className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{a.label}</span>
                  <span className="text-muted-foreground">{a.pct}%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${a.pct}%`, background: a.color }}
                  />
                </div>
              </div>
            ))}
            <div className="pt-2 grid grid-cols-2 gap-2">
              {allocationData.map((a) => (
                <div
                  key={a.label}
                  className="flex items-center gap-2 text-xs text-muted-foreground"
                >
                  <div
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ background: a.color }}
                  />
                  {a.label}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Target className="w-4 h-4" /> Recent Donations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Donor</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {donations.map((d, i) => (
                <TableRow key={d.id} data-ocid={`donation.item.${i + 1}`}>
                  <TableCell className="font-medium">{d.donor}</TableCell>
                  <TableCell
                    className="font-semibold"
                    style={{ color: "oklch(0.38 0.16 145)" }}
                  >
                    {d.amount}
                  </TableCell>
                  <TableCell>
                    <Badge style={purposeColors[d.purpose] ?? {}}>
                      {d.purpose}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {d.date}
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
