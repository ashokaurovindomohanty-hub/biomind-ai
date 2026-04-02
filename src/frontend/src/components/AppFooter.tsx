import { ExternalLink, Shield } from "lucide-react";

const footerLinks = [
  { label: "About", href: "#" },
  { label: "Platform", href: "#" },
  { label: "Safety", href: "#" },
  { label: "Contact", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms", href: "#" },
];

export default function AppFooter() {
  const year = new Date().getFullYear();
  const caffeineLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  return (
    <footer className="border-t border-border bg-card mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Left */}
          <div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-2">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              © {year}. Built with ❤️ using{" "}
              <a
                href={caffeineLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline inline-flex items-center gap-0.5"
              >
                caffeine.ai
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </p>
          </div>

          {/* Right — compliance */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-md px-3 py-1.5">
              <Shield className="w-3.5 h-3.5 text-green-600" />
              <span className="text-xs font-semibold text-green-700">
                HIPAA Compliant
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 rounded-md px-3 py-1.5">
              <span className="text-xs font-semibold text-blue-700">
                NIH Certified
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-md px-3 py-1.5">
              <span className="text-xs font-semibold text-gray-700">
                FDA Registered
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-[11px] text-muted-foreground">
            <strong>Medical Disclaimer:</strong> BioMind AI provides AI-assisted
            diagnostic support tools for healthcare professionals only. All
            analyses are advisory and must be validated by licensed medical
            personnel. Not a substitute for professional medical judgment.
          </p>
        </div>
      </div>
    </footer>
  );
}
