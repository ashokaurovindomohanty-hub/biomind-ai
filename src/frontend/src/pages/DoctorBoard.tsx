import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, Clock, ShieldCheck, Users, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const boardDoctors = [
  { name: "Dr. Aisha Patel", specialty: "Cardiology", status: "Active" },
  { name: "Dr. Marcus Webb", specialty: "Neurosurgery", status: "Active" },
  { name: "Dr. Priya Sharma", specialty: "Oncology", status: "On Leave" },
  { name: "Dr. James Okonkwo", specialty: "General Surgery", status: "Active" },
  { name: "Dr. Li Na Chen", specialty: "Immunology", status: "Active" },
];

type CaseStatus = "Pending" | "Approved" | "Rejected";

interface PendingCase {
  id: number;
  patient: string;
  caseType: string;
  urgency: "High" | "Critical";
  status: CaseStatus;
  requestedBy: string;
}

const initialCases: PendingCase[] = [
  {
    id: 1,
    patient: "Rajan Kumar",
    caseType: "Free Treatment Authorization",
    urgency: "Critical",
    status: "Pending",
    requestedBy: "Dr. Webb",
  },
  {
    id: 2,
    patient: "Fatima Al-Rashid",
    caseType: "Experimental Surgery",
    urgency: "High",
    status: "Pending",
    requestedBy: "Dr. Patel",
  },
  {
    id: 3,
    patient: "Carlos Mendez",
    caseType: "VIP Patient Admission",
    urgency: "High",
    status: "Pending",
    requestedBy: "Admin",
  },
  {
    id: 4,
    patient: "Ananya Singh",
    caseType: "Organ Transplant Priority",
    urgency: "Critical",
    status: "Pending",
    requestedBy: "Dr. Okonkwo",
  },
];

export default function DoctorBoard() {
  const [cases, setCases] = useState<PendingCase[]>(initialCases);

  const handleAction = (id: number, action: "Approved" | "Rejected") => {
    setCases((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: action } : c)),
    );
    toast.success(`Case ${action.toLowerCase()} successfully`);
  };

  const approved = cases.filter((c) => c.status === "Approved");
  const pending = cases.filter((c) => c.status === "Pending");

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
              <p className="text-2xl font-bold text-foreground">
                {boardDoctors.filter((d) => d.status === "Active").length}
              </p>
              <p className="text-sm text-muted-foreground">
                Active Board Members
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: "oklch(0.93 0.12 75)" }}
            >
              <Clock
                className="w-6 h-6"
                style={{ color: "oklch(0.52 0.18 75)" }}
              />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {pending.length}
              </p>
              <p className="text-sm text-muted-foreground">Pending Approvals</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: "oklch(0.93 0.1 145)" }}
            >
              <ShieldCheck
                className="w-6 h-6"
                style={{ color: "oklch(0.42 0.16 145)" }}
              />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {approved.length}
              </p>
              <p className="text-sm text-muted-foreground">Authorized Cases</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Board Members</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {boardDoctors.map((doc) => (
              <div key={doc.name} className="flex items-center gap-3">
                <Avatar className="w-9 h-9">
                  <AvatarFallback
                    className="text-xs font-bold"
                    style={{
                      background: "oklch(0.93 0.08 185)",
                      color: "oklch(0.4 0.12 185)",
                    }}
                  >
                    {doc.name
                      .split(" ")
                      .slice(1)
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {doc.specialty}
                  </p>
                </div>
                <Badge
                  variant={doc.status === "Active" ? "default" : "secondary"}
                  className={doc.status === "Active" ? "status-green" : ""}
                  style={
                    doc.status === "Active"
                      ? {
                          background: "oklch(0.93 0.1 145)",
                          color: "oklch(0.38 0.16 145)",
                          border: "none",
                        }
                      : {}
                  }
                >
                  {doc.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Approval Queue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {cases.map((c, i) => (
                <div
                  key={c.id}
                  data-ocid={`board.case.item.${i + 1}`}
                  className="flex items-center justify-between gap-3 p-3 rounded-lg border border-border bg-muted/30"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold truncate">
                        {c.patient}
                      </p>
                      <Badge
                        className={
                          c.urgency === "Critical"
                            ? "risk-high"
                            : "risk-moderate"
                        }
                        style={
                          c.urgency === "Critical"
                            ? {
                                background: "oklch(0.93 0.15 27)",
                                color: "oklch(0.48 0.22 27)",
                                border: "none",
                              }
                            : {
                                background: "oklch(0.93 0.12 75)",
                                color: "oklch(0.5 0.18 75)",
                                border: "none",
                              }
                        }
                      >
                        {c.urgency}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {c.caseType} · Req. by {c.requestedBy}
                    </p>
                  </div>
                  {c.status === "Pending" ? (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="h-7 px-3 text-xs"
                        style={{
                          background: "oklch(0.5 0.11 185)",
                          color: "white",
                        }}
                        onClick={() => handleAction(c.id, "Approved")}
                        data-ocid={`board.approve.button.${i + 1}`}
                      >
                        <CheckCircle className="w-3.5 h-3.5 mr-1" /> Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 px-3 text-xs text-destructive hover:text-destructive"
                        onClick={() => handleAction(c.id, "Rejected")}
                        data-ocid={`board.reject.button.${i + 1}`}
                      >
                        <XCircle className="w-3.5 h-3.5 mr-1" /> Reject
                      </Button>
                    </div>
                  ) : (
                    <Badge
                      style={
                        c.status === "Approved"
                          ? {
                              background: "oklch(0.93 0.1 145)",
                              color: "oklch(0.38 0.16 145)",
                              border: "none",
                            }
                          : {
                              background: "oklch(0.93 0.15 27)",
                              color: "oklch(0.48 0.22 27)",
                              border: "none",
                            }
                      }
                    >
                      {c.status}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {approved.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Authorized Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Case Type</TableHead>
                  <TableHead>Urgency</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {approved.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">{c.patient}</TableCell>
                    <TableCell>{c.caseType}</TableCell>
                    <TableCell>
                      <Badge
                        style={
                          c.urgency === "Critical"
                            ? {
                                background: "oklch(0.93 0.15 27)",
                                color: "oklch(0.48 0.22 27)",
                                border: "none",
                              }
                            : {
                                background: "oklch(0.93 0.12 75)",
                                color: "oklch(0.5 0.18 75)",
                                border: "none",
                              }
                        }
                      >
                        {c.urgency}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        style={{
                          background: "oklch(0.93 0.1 145)",
                          color: "oklch(0.38 0.16 145)",
                          border: "none",
                        }}
                      >
                        Authorized
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
