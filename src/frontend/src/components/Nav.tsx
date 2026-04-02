import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Brain } from "lucide-react";

const navLinks = [
  { label: "Dashboard", active: true },
  { label: "Analysis", active: false },
  { label: "Patients", active: false },
  { label: "Reports", active: false },
  { label: "Help", active: false },
];

export default function Nav() {
  return (
    <header
      className="sticky top-0 z-50 bg-white border-b border-border shadow-xs"
      data-ocid="nav.panel"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-2.5 shrink-0"
            data-ocid="nav.link"
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-navy tracking-tight">
              BioMind AI
            </span>
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.label}
                data-ocid={`nav.${link.label.toLowerCase()}.link`}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  link.active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              data-ocid="nav.notifications.button"
            >
              <Bell className="w-5 h-5 text-muted-foreground" />
              <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center text-[10px] bg-primary">
                3
              </Badge>
            </Button>
            <div className="hidden sm:flex items-center gap-2.5">
              <span className="text-sm font-medium text-foreground">
                Dr. Sarah Chen
              </span>
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-teal text-white text-xs font-semibold">
                  SC
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
