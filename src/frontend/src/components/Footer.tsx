import { Leaf } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="py-12 px-4"
      style={{ background: "var(--green-deep)", color: "white" }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <div
                className="flex items-center justify-center w-9 h-9 rounded-full"
                style={{ background: "oklch(1 0 0 / 0.15)" }}
              >
                <Leaf className="w-5 h-5 text-green-300" />
              </div>
              <span
                className="text-xl font-bold"
                style={{
                  fontFamily: "Bricolage Grotesque, system-ui, sans-serif",
                }}
              >
                PlantGuard AI
              </span>
            </div>
            <p className="text-sm text-white/65">
              Empowering farmers with AI technology
            </p>
          </div>

          {/* Links */}
          <nav className="flex gap-6 text-sm text-white/70">
            <a href="#upload" className="hover:text-white transition-colors">
              Scan Leaf
            </a>
            <a
              href="#how-it-works"
              className="hover:text-white transition-colors"
            >
              How It Works
            </a>
            <a href="#diseases" className="hover:text-white transition-colors">
              Disease Library
            </a>
            <a href="#history" className="hover:text-white transition-colors">
              My History
            </a>
          </nav>

          {/* Attribution */}
          <div className="text-sm text-white/55 text-center md:text-right">
            <p>© {year} PlantGuard AI. All rights reserved.</p>
          </div>
        </div>

        {/* Disclaimer */}
        <div
          className="mt-8 pt-6 text-center text-xs"
          style={{
            borderTop: "1px solid oklch(1 0 0 / 0.12)",
            color: "oklch(1 0 0 / 0.4)",
          }}
        >
          PlantGuard AI provides diagnostic assistance only. Always consult a
          licensed agronomist for critical crop management decisions.
        </div>
      </div>
    </footer>
  );
}
