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
import { Coffee, Cookie, Leaf, Utensils } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const menuItems = [
  {
    meal: "Breakfast",
    time: "7:00 – 9:00 AM",
    icon: <Coffee className="w-5 h-5" />,
    color: "oklch(0.92 0.06 55)",
    iconColor: "oklch(0.48 0.18 55)",
    dishes: [
      {
        name: "Oat Porridge with Berries",
        tags: ["Diabetic-friendly", "Vegetarian"],
      },
      { name: "Whole Wheat Toast & Eggs", tags: ["Low-sodium"] },
      { name: "Fresh Fruit Bowl", tags: ["Vegetarian"] },
    ],
  },
  {
    meal: "Lunch",
    time: "12:00 – 2:00 PM",
    icon: <Utensils className="w-5 h-5" />,
    color: "oklch(0.93 0.1 145)",
    iconColor: "oklch(0.38 0.16 145)",
    dishes: [
      {
        name: "Brown Rice & Lentil Curry",
        tags: ["Vegetarian", "Diabetic-friendly"],
      },
      { name: "Grilled Chicken Salad", tags: ["Low-sodium", "Cardiac"] },
      { name: "Steamed Vegetables", tags: ["Vegetarian", "Renal-friendly"] },
    ],
  },
  {
    meal: "Dinner",
    time: "7:00 – 9:00 PM",
    icon: <Cookie className="w-5 h-5" />,
    color: "oklch(0.93 0.08 240)",
    iconColor: "oklch(0.45 0.15 240)",
    dishes: [
      { name: "Dal Tadka with Roti", tags: ["Vegetarian"] },
      { name: "Fish Curry (Low Oil)", tags: ["Low-sodium", "Cardiac"] },
      {
        name: "Mixed Vegetable Soup",
        tags: ["Diabetic-friendly", "Vegetarian"],
      },
    ],
  },
];

const tagStyle: Record<string, React.CSSProperties> = {
  Vegetarian: {
    background: "oklch(0.93 0.1 145)",
    color: "oklch(0.38 0.16 145)",
    border: "none",
  },
  "Diabetic-friendly": {
    background: "oklch(0.93 0.08 240)",
    color: "oklch(0.45 0.15 240)",
    border: "none",
  },
  "Low-sodium": {
    background: "oklch(0.92 0.06 55)",
    color: "oklch(0.48 0.18 55)",
    border: "none",
  },
  Cardiac: {
    background: "oklch(0.93 0.15 27)",
    color: "oklch(0.48 0.22 27)",
    border: "none",
  },
  "Renal-friendly": {
    background: "oklch(0.93 0.12 75)",
    color: "oklch(0.52 0.18 75)",
    border: "none",
  },
};

const initialOrders = [
  {
    id: 1,
    patientId: "P-1021",
    plan: "Diabetic",
    allergies: "None",
    meal: "Breakfast",
    status: "Delivered",
  },
  {
    id: 2,
    patientId: "P-0887",
    plan: "Cardiac",
    allergies: "Gluten",
    meal: "Lunch",
    status: "Preparing",
  },
  {
    id: 3,
    patientId: "P-1145",
    plan: "Renal",
    allergies: "None",
    meal: "Dinner",
    status: "Pending",
  },
];

const orderStatusStyle: Record<string, React.CSSProperties> = {
  Delivered: {
    background: "oklch(0.93 0.1 145)",
    color: "oklch(0.38 0.16 145)",
    border: "none",
  },
  Preparing: {
    background: "oklch(0.92 0.06 55)",
    color: "oklch(0.48 0.18 55)",
    border: "none",
  },
  Pending: {
    background: "oklch(0.93 0.12 75)",
    color: "oklch(0.52 0.18 75)",
    border: "none",
  },
};

export default function FoodFacility() {
  const [orders, setOrders] = useState(initialOrders);
  const [form, setForm] = useState({
    patientId: "",
    plan: "",
    allergies: "",
    meal: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.patientId || !form.plan || !form.meal) {
      toast.error("Fill required fields");
      return;
    }
    setOrders((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...form,
        allergies: form.allergies || "None",
        status: "Pending",
      },
    ]);
    setForm({ patientId: "", plan: "", allergies: "", meal: "" });
    toast.success("Meal order placed");
  };

  const dietaryStats = [
    { label: "Vegetarian", pct: 45, color: "oklch(0.5 0.11 145)" },
    { label: "Regular", pct: 35, color: "oklch(0.5 0.11 185)" },
    { label: "Special Diet", pct: 20, color: "oklch(0.62 0.14 55)" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {menuItems.map((m) => (
          <Card key={m.meal}>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: m.color }}
                >
                  <span style={{ color: m.iconColor }}>{m.icon}</span>
                </div>
                {m.meal}{" "}
                <span className="text-xs text-muted-foreground font-normal ml-auto">
                  {m.time}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {m.dishes.map((dish) => (
                <div key={dish.name}>
                  <p className="text-sm font-medium mb-1">{dish.name}</p>
                  <div className="flex flex-wrap gap-1">
                    {dish.tags.map((tag) => (
                      <Badge key={tag} style={tagStyle[tag] ?? {}}>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Place Meal Order</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label>Patient ID</Label>
                <Input
                  data-ocid="food.patientid.input"
                  placeholder="e.g. P-1021"
                  value={form.patientId}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, patientId: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label>Meal Plan</Label>
                <Select
                  value={form.plan}
                  onValueChange={(v) => setForm((p) => ({ ...p, plan: v }))}
                >
                  <SelectTrigger data-ocid="food.plan.select">
                    <SelectValue placeholder="Select plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Regular">Regular</SelectItem>
                    <SelectItem value="Diabetic">Diabetic</SelectItem>
                    <SelectItem value="Cardiac">Cardiac</SelectItem>
                    <SelectItem value="Renal">Renal</SelectItem>
                    <SelectItem value="Soft">Soft Diet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Meal</Label>
                <Select
                  value={form.meal}
                  onValueChange={(v) => setForm((p) => ({ ...p, meal: v }))}
                >
                  <SelectTrigger data-ocid="food.meal.select">
                    <SelectValue placeholder="Select meal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Breakfast">Breakfast</SelectItem>
                    <SelectItem value="Lunch">Lunch</SelectItem>
                    <SelectItem value="Dinner">Dinner</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Allergies / Restrictions</Label>
                <Input
                  data-ocid="food.allergies.input"
                  placeholder="e.g. Gluten, Nuts"
                  value={form.allergies}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, allergies: e.target.value }))
                  }
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                style={{ background: "oklch(0.5 0.11 185)", color: "white" }}
                data-ocid="food.submit.button"
              >
                <Leaf className="w-4 h-4 mr-2" /> Place Order
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="xl:col-span-3">
          <CardHeader>
            <CardTitle className="text-base">Dietary Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {dietaryStats.map((s) => (
              <div key={s.label} className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{s.label}</span>
                  <span className="text-muted-foreground">{s.pct}%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${s.pct}%`, background: s.color }}
                  />
                </div>
              </div>
            ))}
            <div className="pt-4">
              <h4 className="text-sm font-semibold mb-3">Active Meal Orders</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Meal</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((o, i) => (
                    <TableRow key={o.id} data-ocid={`food.order.item.${i + 1}`}>
                      <TableCell className="font-medium">
                        {o.patientId}
                      </TableCell>
                      <TableCell>{o.plan}</TableCell>
                      <TableCell>{o.meal}</TableCell>
                      <TableCell>
                        <Badge style={orderStatusStyle[o.status] ?? {}}>
                          {o.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
