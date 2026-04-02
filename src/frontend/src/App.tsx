import { Toaster } from "@/components/ui/sonner";
import {
  Bell,
  BookOpen,
  ClipboardList,
  Heart,
  HeartHandshake,
  LayoutDashboard,
  Menu,
  Shield,
  Star,
  Stethoscope,
  UserCheck,
  Users,
  Utensils,
} from "lucide-react";
import { useState } from "react";
import Blog from "./pages/Blog";
import Dashboard from "./pages/Dashboard";
import DoctorBoard from "./pages/DoctorBoard";
import Donations from "./pages/Donations";
import FoodFacility from "./pages/FoodFacility";
import FreeTreatment from "./pages/FreeTreatment";
import Insurance from "./pages/Insurance";
import PatientAnalysis from "./pages/PatientAnalysis";
import SpecialCategory from "./pages/SpecialCategory";
import Staff from "./pages/Staff";
import SurgicalSync from "./pages/SurgicalSync";

type Page =
  | "dashboard"
  | "patients"
  | "doctor-board"
  | "free-treatment"
  | "special-category"
  | "donations"
  | "insurance"
  | "food"
  | "surgical"
  | "staff"
  | "blog";

const navItems: { id: Page; label: string; icon: React.ReactNode }[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard className="w-4.5 h-4.5" />,
  },
  {
    id: "patients",
    label: "Patients",
    icon: <Users className="w-4.5 h-4.5" />,
  },
  {
    id: "doctor-board",
    label: "Doctor Board",
    icon: <ClipboardList className="w-4.5 h-4.5" />,
  },
  {
    id: "free-treatment",
    label: "Free Treatment",
    icon: <HeartHandshake className="w-4.5 h-4.5" />,
  },
  {
    id: "special-category",
    label: "Special Category",
    icon: <Star className="w-4.5 h-4.5" />,
  },
  {
    id: "donations",
    label: "Donations",
    icon: <Heart className="w-4.5 h-4.5" />,
  },
  {
    id: "insurance",
    label: "Insurance",
    icon: <Shield className="w-4.5 h-4.5" />,
  },
  {
    id: "food",
    label: "Food Facility",
    icon: <Utensils className="w-4.5 h-4.5" />,
  },
  {
    id: "surgical",
    label: "Surgical Sync",
    icon: <Stethoscope className="w-4.5 h-4.5" />,
  },
  { id: "staff", label: "Staff", icon: <UserCheck className="w-4.5 h-4.5" /> },
  { id: "blog", label: "Blog", icon: <BookOpen className="w-4.5 h-4.5" /> },
];

const pageTitles: Record<Page, string> = {
  dashboard: "Hospital Dashboard",
  patients: "Patient Management",
  "doctor-board": "Doctor Board & Approvals",
  "free-treatment": "Free Treatment Program",
  "special-category": "Special Category Patients",
  donations: "Donations",
  insurance: "Insurance Treatment",
  food: "Food Facility",
  surgical: "Surgical Procedure Sync",
  staff: "Staff & Resource Allocation",
  blog: "Blog — AI in Biotechnology",
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div
      className="min-h-screen flex"
      style={{ background: "oklch(0.972 0.005 240)" }}
    >
      <Toaster richColors position="top-right" />

      {/* Desktop Sidebar */}
      <aside
        className="hidden lg:flex flex-col w-60 min-h-screen fixed left-0 top-0 bottom-0 z-30"
        style={{ background: "oklch(0.14 0.04 225)" }}
      >
        {/* Logo */}
        <div
          className="px-5 py-5 border-b"
          style={{ borderColor: "oklch(0.22 0.04 225)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: "oklch(0.50 0.11 185)" }}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-none">
                BioMind AI
              </p>
              <p
                className="text-xs mt-0.5"
                style={{ color: "oklch(0.60 0.07 185)" }}
              >
                Hospital Management
              </p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setCurrentPage(item.id)}
                data-ocid={`nav.${item.id}.link`}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive ? "text-white" : "hover:bg-white/5"
                }`}
                style={
                  isActive
                    ? { background: "oklch(0.50 0.11 185)", color: "white" }
                    : { color: "oklch(0.70 0.04 225)" }
                }
              >
                <span className={isActive ? "text-white" : "opacity-70"}>
                  {item.icon}
                </span>
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div
          className="px-4 py-4"
          style={{ borderTop: "1px solid oklch(0.22 0.04 225)" }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ background: "oklch(0.50 0.11 185)" }}
            >
              AD
            </div>
            <div>
              <p
                className="text-xs font-medium"
                style={{ color: "oklch(0.90 0.01 225)" }}
              >
                Admin User
              </p>
              <p className="text-xs" style={{ color: "oklch(0.55 0.04 225)" }}>
                Clinical Admin
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main area */}
      <div className="lg:ml-60 flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <header
          className="sticky top-0 z-20 h-14 flex items-center justify-between px-6 border-b"
          style={{
            background: "oklch(0.97 0.005 240)",
            borderColor: "oklch(0.90 0.01 230)",
          }}
        >
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="lg:hidden p-1.5 rounded-md text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-ocid="nav.mobile.toggle"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-base font-semibold text-foreground">
              {pageTitles[currentPage]}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              data-ocid="nav.notification.button"
            >
              <Bell className="w-5 h-5" />
              <span
                className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                style={{ background: "oklch(0.50 0.11 185)" }}
              />
            </button>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ background: "oklch(0.50 0.11 185)" }}
            >
              AD
            </div>
          </div>
        </header>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden border-b shadow-sm"
            style={{ background: "oklch(0.14 0.04 225)" }}
          >
            <nav className="px-3 py-2 space-y-0.5 max-h-80 overflow-y-auto">
              {navItems.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setCurrentPage(item.id);
                      setMobileMenuOpen(false);
                    }}
                    data-ocid={`nav.mobile.${item.id}.link`}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all"
                    style={
                      isActive
                        ? { background: "oklch(0.50 0.11 185)", color: "white" }
                        : { color: "oklch(0.70 0.04 225)" }
                    }
                  >
                    {item.icon}
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>
        )}

        {/* Page Content */}
        <main
          className="flex-1 p-6"
          style={{ background: "oklch(0.972 0.005 240)" }}
        >
          {currentPage === "dashboard" && <Dashboard />}
          {currentPage === "patients" && <PatientAnalysis />}
          {currentPage === "doctor-board" && <DoctorBoard />}
          {currentPage === "free-treatment" && <FreeTreatment />}
          {currentPage === "special-category" && <SpecialCategory />}
          {currentPage === "donations" && <Donations />}
          {currentPage === "insurance" && <Insurance />}
          {currentPage === "food" && <FoodFacility />}
          {currentPage === "surgical" && <SurgicalSync />}
          {currentPage === "staff" && <Staff />}
          {currentPage === "blog" && <Blog />}
        </main>

        {/* Footer */}
        <footer
          className="px-6 py-4 text-center text-xs text-muted-foreground border-t border-border"
          style={{ background: "oklch(0.97 0.005 240)" }}
        >
          © {new Date().getFullYear()}. Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground transition-colors"
          >
            caffeine.ai
          </a>
        </footer>
      </div>
    </div>
  );
}
