import { Button } from "@/components/ui/button";
import { ChevronDown, Leaf } from "lucide-react";
import { motion } from "motion/react";

interface HeroSectionProps {
  onScanNow: () => void;
  onLearnHow: () => void;
}

export default function HeroSection({
  onScanNow,
  onLearnHow,
}: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-leaves-bg.dim_1600x900.jpg')",
        }}
      />
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/55 to-black/75" />

      {/* Decorative leaf shapes */}
      <div className="absolute top-0 left-0 w-40 h-40 opacity-20 pointer-events-none">
        <svg
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="presentation"
        >
          <path d="M10 110 Q20 20 110 10 Q110 60 10 110Z" fill="#4ade80" />
          <path
            d="M10 110 Q55 55 110 10"
            stroke="#86efac"
            strokeWidth="1.5"
            fill="none"
            opacity="0.6"
          />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 w-48 h-48 opacity-15 pointer-events-none rotate-180">
        <svg
          viewBox="0 0 120 120"
          fill="none"
          aria-hidden="true"
          role="presentation"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 110 Q20 20 110 10 Q110 60 10 110Z" fill="#22c55e" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500/30 border border-green-400/50 backdrop-blur-sm">
            <Leaf className="w-6 h-6 text-green-300" />
          </div>
          <span
            className="text-2xl font-bold text-white tracking-wide"
            style={{ fontFamily: "Bricolage Grotesque, system-ui, sans-serif" }}
          >
            PlantGuard AI
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
          style={{ fontFamily: "Bricolage Grotesque, system-ui, sans-serif" }}
        >
          Detect Plant Diseases{" "}
          <span className="text-green-400">Instantly</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg sm:text-xl md:text-2xl text-white/85 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Upload a leaf photo and get an AI-powered diagnosis in seconds.{" "}
          <strong className="text-green-300">Protect your crops.</strong>{" "}
          <strong className="text-green-300">Protect your income.</strong>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            data-ocid="hero.primary_button"
            onClick={onScanNow}
            size="lg"
            className="text-lg px-8 py-6 h-auto font-bold rounded-full shadow-2xl shadow-green-900/40 transition-all duration-200 hover:scale-105 bg-green-500 hover:bg-green-400 text-white border-0 min-w-[220px]"
          >
            <Leaf className="w-5 h-5 mr-2" />
            Scan a Leaf Now
          </Button>
          <Button
            data-ocid="hero.secondary_button"
            onClick={onLearnHow}
            size="lg"
            variant="outline"
            className="text-lg px-8 py-6 h-auto font-semibold rounded-full border-2 border-white/60 text-white hover:bg-white/15 hover:border-white backdrop-blur-sm min-w-[220px] bg-transparent"
          >
            Learn How It Works
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-8 mt-16 text-white/80"
        >
          {[
            { label: "Disease Classes", value: "38+" },
            { label: "Accuracy Rate", value: "96%" },
            { label: "Detection Speed", value: "<3s" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-3xl font-bold text-green-400"
                style={{
                  fontFamily: "Bricolage Grotesque, system-ui, sans-serif",
                }}
              >
                {stat.value}
              </div>
              <div className="text-sm mt-1 uppercase tracking-widest text-white/60">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1, duration: 2, repeat: Number.POSITIVE_INFINITY }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60"
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
}
