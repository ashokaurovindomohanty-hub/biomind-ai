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
import { Building2, UserCheck, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const initialStaff = [
  {
    id: 1,
    name: "Dr. Kavya Menon",
    role: "Doctor",
    dept: "Cardiology",
    shift: "Morning",
    status: "On Duty",
  },
  {
    id: 2,
    name: "Nurse Pooja Rao",
    role: "Nurse",
    dept: "ICU",
    shift: "Night",
    status: "On Duty",
  },
  {
    id: 3,
    name: "Tech. Aman Singh",
    role: "Technician",
    dept: "Radiology",
    shift: "Evening",
    status: "Off Duty",
  },
  {
    id: 4,
    name: "Dr. Femi Adeyemi",
    role: "Doctor",
    dept: "Neurology",
    shift: "Morning",
    status: "On Duty",
  },
  {
    id: 5,
    name: "Support Geeta S.",
    role: "Support",
    dept: "Admin",
    shift: "Morning",
    status: "On Leave",
  },
  {
    id: 6,
    name: "Nurse Tariq A.",
    role: "Nurse",
    dept: "Emergency",
    shift: "Evening",
    status: "On Duty",
  },
];

const deptCapacity = [
  { dept: "ICU", occupied: 18, total: 20 },
  { dept: "Cardiology", occupied: 24, total: 30 },
  { dept: "General", occupied: 45, total: 60 },
  { dept: "Neurology", occupied: 12, total: 15 },
  { dept: "Emergency", occupied: 8, total: 10 },
];

const roleStyle: Record<string, React.CSSProperties> = {
  Doctor: {
    background: "oklch(0.93 0.08 240)",
    color: "oklch(0.45 0.15 240)",
    border: "none",
  },
  Nurse: {
    background: "oklch(0.93 0.1 145)",
    color: "oklch(0.38 0.16 145)",
    border: "none",
  },
  Technician: {
    background: "oklch(0.92 0.06 55)",
    color: "oklch(0.48 0.18 55)",
    border: "none",
  },
  Support: {
    background: "oklch(0.93 0.06 220)",
    color: "oklch(0.45 0.1 220)",
    border: "none",
  },
};

const statusStyle: Record<string, React.CSSProperties> = {
  "On Duty": {
    background: "oklch(0.93 0.1 145)",
    color: "oklch(0.38 0.16 145)",
    border: "none",
  },
  "Off Duty": {
    background: "oklch(0.93 0.06 220)",
    color: "oklch(0.45 0.1 220)",
    border: "none",
  },
  "On Leave": {
    background: "oklch(0.93 0.12 75)",
    color: "oklch(0.52 0.18 75)",
    border: "none",
  },
};

export default function Staff() {
  const [staff, setStaff] = useState(initialStaff);
  const [form, setForm] = useState({ name: "", role: "", dept: "", shift: "" });

  const onDuty = staff.filter((s) => s.status === "On Duty").length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.role || !form.dept || !form.shift) {
      toast.error("Fill all fields");
      return;
    }
    setStaff((prev) => [
      ...prev,
      { id: Date.now(), ...form, status: "On Duty" },
    ]);
    setForm({ name: "", role: "", dept: "", shift: "" });
    toast.success("Staff member assigned");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: "oklch(0.93 0.08 240)" }}
            >
              <Users
                className="w-6 h-6"
                style={{ color: "oklch(0.45 0.15 240)" }}
              />
            </div>
            <div>
              <p className="text-2xl font-bold">{staff.length}</p>
              <p className="text-sm text-muted-foreground">Total Staff</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: "oklch(0.93 0.1 145)" }}
            >
              <UserCheck
                className="w-6 h-6"
                style={{ color: "oklch(0.42 0.16 145)" }}
              />
            </div>
            <div>
              <p className="text-2xl font-bold">{onDuty}</p>
              <p className="text-sm text-muted-foreground">On Duty</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: "oklch(0.92 0.06 55)" }}
            >
              <Building2
                className="w-6 h-6"
                style={{ color: "oklch(0.48 0.18 55)" }}
              />
            </div>
            <div>
              <p className="text-2xl font-bold">{deptCapacity.length}</p>
              <p className="text-sm text-muted-foreground">Departments</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        <Card className="xl:col-span-3">
          <CardHeader>
            <CardTitle className="text-base">Staff Roster</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Shift</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {staff.map((s, i) => (
                  <TableRow key={s.id} data-ocid={`staff.item.${i + 1}`}>
                    <TableCell className="font-medium">{s.name}</TableCell>
                    <TableCell>
                      <Badge style={roleStyle[s.role] ?? {}}>{s.role}</Badge>
                    </TableCell>
                    <TableCell>{s.dept}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {s.shift}
                    </TableCell>
                    <TableCell>
                      <Badge style={statusStyle[s.status] ?? {}}>
                        {s.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="xl:col-span-2 space-y-6">
          <CardHeader>
            <CardTitle className="text-base">Assign Staff</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="space-y-1.5">
                <Label>Full Name</Label>
                <Input
                  data-ocid="staff.name.input"
                  placeholder="Name and title"
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label>Role</Label>
                <Select
                  value={form.role}
                  onValueChange={(v) => setForm((p) => ({ ...p, role: v }))}
                >
                  <SelectTrigger data-ocid="staff.role.select">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Doctor">Doctor</SelectItem>
                    <SelectItem value="Nurse">Nurse</SelectItem>
                    <SelectItem value="Technician">Technician</SelectItem>
                    <SelectItem value="Support">Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Department</Label>
                <Input
                  data-ocid="staff.dept.input"
                  placeholder="e.g. Cardiology"
                  value={form.dept}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, dept: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label>Shift</Label>
                <Select
                  value={form.shift}
                  onValueChange={(v) => setForm((p) => ({ ...p, shift: v }))}
                >
                  <SelectTrigger data-ocid="staff.shift.select">
                    <SelectValue placeholder="Select shift" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Morning">Morning (6AM–2PM)</SelectItem>
                    <SelectItem value="Evening">Evening (2PM–10PM)</SelectItem>
                    <SelectItem value="Night">Night (10PM–6AM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                type="submit"
                className="w-full"
                style={{ background: "oklch(0.5 0.11 185)", color: "white" }}
                data-ocid="staff.submit.button"
              >
                Assign Staff Member
              </Button>
            </form>

            <div className="pt-2">
              <h4 className="text-sm font-semibold mb-3">
                Department Capacity
              </h4>
              <div className="space-y-2">
                {deptCapacity.map((d) => (
                  <div key={d.dept} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium">{d.dept}</span>
                      <span className="text-muted-foreground">
                        {d.occupied}/{d.total}
                      </span>
                    </div>
                    <Progress
                      value={(d.occupied / d.total) * 100}
                      className="h-1.5"
                    />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
