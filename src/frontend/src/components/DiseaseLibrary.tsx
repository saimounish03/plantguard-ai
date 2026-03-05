import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { AlertCircle, AlertTriangle, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { DISEASE_LIBRARY, type Severity } from "../data/diseaseData";

function SeverityChip({ severity }: { severity: Severity }) {
  if (severity === "healthy") {
    return (
      <span
        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold"
        style={{
          background: "oklch(0.88 0.08 145)",
          color: "oklch(0.28 0.1 145)",
        }}
      >
        <CheckCircle2 className="w-3 h-3" />
        Healthy
      </span>
    );
  }
  if (severity === "mild") {
    return (
      <span
        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold"
        style={{
          background: "oklch(0.95 0.12 85)",
          color: "oklch(0.5 0.18 65)",
        }}
      >
        <AlertTriangle className="w-3 h-3" />
        Mild
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold"
      style={{ background: "oklch(0.92 0.1 25)", color: "oklch(0.42 0.2 25)" }}
    >
      <AlertCircle className="w-3 h-3" />
      Severe
    </span>
  );
}

export default function DiseaseLibrary() {
  return (
    <section
      id="diseases"
      className="py-20 px-4"
      style={{ background: "var(--cream-off)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            style={{
              color: "var(--green-deep)",
              fontFamily: "Bricolage Grotesque, system-ui, sans-serif",
            }}
          >
            Common Plant Diseases We Detect
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--brown-earth)" }}
          >
            Our AI identifies 20+ disease types across major food crops. Here
            are the most common:
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {DISEASE_LIBRARY.map((disease, i) => (
            <motion.div
              key={disease.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.08 }}
            >
              <Card
                className="h-full p-5 flex flex-col gap-3 border-0 shadow-md hover:shadow-xl transition-shadow duration-200 cursor-default"
                style={{
                  background: "white",
                  borderRadius: "1.25rem",
                }}
              >
                {/* Severity + name */}
                <div className="flex items-start justify-between gap-2">
                  <h3
                    className="text-base font-bold leading-snug"
                    style={{
                      color: "var(--green-deep)",
                      fontFamily: "Bricolage Grotesque, system-ui, sans-serif",
                    }}
                  >
                    {disease.name}
                  </h3>
                  <SeverityChip severity={disease.severity} />
                </div>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed flex-1"
                  style={{ color: "oklch(0.38 0.04 145)" }}
                >
                  {disease.shortDesc}
                </p>

                {/* Affected crops */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {disease.affectedCrops.map((crop) => (
                    <Badge
                      key={crop}
                      variant="secondary"
                      className="text-xs px-2 py-0.5"
                      style={{
                        background: "var(--green-pale)",
                        color: "var(--green-forest)",
                      }}
                    >
                      {crop}
                    </Badge>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-8 text-sm"
          style={{ color: "var(--brown-light)" }}
        >
          And 8 more diseases including Root Rot, Crown Rot, Canker, Fire
          Blight, and Blossom End Rot
        </motion.p>
      </div>
    </section>
  );
}
