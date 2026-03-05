import { Brain, Camera, Stethoscope } from "lucide-react";
import { motion } from "motion/react";

const steps = [
  {
    number: "01",
    icon: Camera,
    title: "Upload Your Leaf Photo",
    description:
      "Take a clear close-up photo of the affected leaf using your phone or camera. Our system accepts JPG, PNG, and WEBP formats.",
    color: "var(--green-forest)",
    bg: "var(--green-pale)",
  },
  {
    number: "02",
    icon: Brain,
    title: "AI Analyzes the Image",
    description:
      "Our deep learning model — trained on 50,000+ leaf images — scans your photo for patterns of disease, discoloration, and damage.",
    color: "var(--brown-earth)",
    bg: "oklch(0.93 0.04 70)",
  },
  {
    number: "03",
    icon: Stethoscope,
    title: "Get Your Diagnosis Instantly",
    description:
      "Within seconds, receive a diagnosis with disease name, confidence score, and clear action steps you can take right away.",
    color: "var(--green-deep)",
    bg: "oklch(0.9 0.06 145 / 0.3)",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-20 px-4 overflow-hidden">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/assets/generated/leaf-pattern-bg.dim_1200x800.jpg')",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "oklch(0.15 0.06 145 / 0.88)" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "Bricolage Grotesque, system-ui, sans-serif" }}
          >
            How PlantGuard Works
          </h2>
          <p className="text-lg text-white/75 max-w-2xl mx-auto">
            Three simple steps. From field to diagnosis in under 3 seconds.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative"
            >
              {/* Connector line between cards (desktop only) */}
              {i < steps.length - 1 && (
                <div
                  className="hidden md:block absolute top-16 left-full w-full h-0.5 z-10"
                  style={{
                    background:
                      "linear-gradient(90deg, oklch(0.7 0.1 145 / 0.4), transparent)",
                    width: "calc(100% - 80px)",
                    transform: "translateX(40px)",
                  }}
                />
              )}

              <div
                className="relative rounded-2xl p-7 h-full backdrop-blur-sm"
                style={{
                  background: "oklch(1 0 0 / 0.06)",
                  border: "1px solid oklch(1 0 0 / 0.15)",
                }}
              >
                {/* Step number */}
                <div
                  className="text-6xl font-black mb-4 leading-none"
                  style={{
                    color: "oklch(1 0 0 / 0.12)",
                    fontFamily: "Bricolage Grotesque, system-ui, sans-serif",
                  }}
                >
                  {step.number}
                </div>

                {/* Icon */}
                <div
                  className="flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
                  style={{ background: step.bg }}
                >
                  <step.icon
                    className="w-7 h-7"
                    style={{ color: step.color }}
                  />
                </div>

                {/* Title */}
                <h3
                  className="text-xl font-bold text-white mb-3"
                  style={{
                    fontFamily: "Bricolage Grotesque, system-ui, sans-serif",
                  }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-white/70 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-10 text-white/60 text-sm"
        >
          🌿 Trained on the PlantVillage dataset — 50,000+ leaf images across 38
          disease classes
        </motion.p>
      </div>
    </section>
  );
}
