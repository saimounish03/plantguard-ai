import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Leaf,
  Loader2,
  RefreshCw,
  Save,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { DISEASE_DATA, type Severity } from "../data/diseaseData";
import { useSaveScan } from "../hooks/useQueries";
import type { AnalysisResult } from "./UploadSection";

interface ResultsPanelProps {
  result: AnalysisResult;
  onScanAnother: () => void;
}

function ConfidenceRing({ value }: { value: number }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  const color = value >= 85 ? "#22c55e" : value >= 75 ? "#eab308" : "#ef4444";

  return (
    <div className="relative flex items-center justify-center">
      <svg
        width="140"
        height="140"
        style={{ transform: "rotate(-90deg)" }}
        aria-hidden="true"
        role="presentation"
      >
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="oklch(0.9 0.04 140)"
          strokeWidth="10"
        />
        <motion.circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="confidence-ring"
        />
      </svg>
      <div className="absolute text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-3xl font-bold"
          style={{
            color,
            fontFamily: "Bricolage Grotesque, system-ui, sans-serif",
          }}
        >
          {value}%
        </motion.div>
        <div
          className="text-xs font-medium mt-0.5"
          style={{ color: "var(--brown-light)" }}
        >
          Confidence
        </div>
      </div>
    </div>
  );
}

function SeverityBadge({ severity }: { severity: Severity }) {
  if (severity === "healthy") {
    return (
      <span
        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold"
        style={{
          background: "oklch(0.88 0.08 145)",
          color: "oklch(0.28 0.1 145)",
        }}
      >
        <CheckCircle2 className="w-4 h-4" />
        Healthy Plant
      </span>
    );
  }
  if (severity === "mild") {
    return (
      <span
        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold"
        style={{
          background: "oklch(0.95 0.12 85)",
          color: "oklch(0.5 0.18 65)",
        }}
      >
        <AlertTriangle className="w-4 h-4" />
        Mild Disease
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold"
      style={{ background: "oklch(0.92 0.1 25)", color: "oklch(0.42 0.2 25)" }}
    >
      <AlertCircle className="w-4 h-4" />
      Severe Disease
    </span>
  );
}

export default function ResultsPanel({
  result,
  onScanAnother,
}: ResultsPanelProps) {
  const [saved, setSaved] = useState(false);
  const saveScan = useSaveScan();

  const diseaseInfo = DISEASE_DATA[result.diseaseName] ?? DISEASE_DATA.Healthy;

  const handleSave = async () => {
    try {
      await saveScan.mutateAsync({
        diseaseName: result.diseaseName,
        confidenceScore: result.confidenceScore,
        cropType: result.cropType,
        imageNote: "Analyzed leaf image",
      });
      setSaved(true);
      toast.success("Scan result saved successfully!");
    } catch {
      toast.error("Failed to save. Please try again.");
    }
  };

  const borderColor =
    diseaseInfo.severity === "healthy"
      ? "var(--severity-healthy)"
      : diseaseInfo.severity === "mild"
        ? "var(--severity-mild)"
        : "var(--severity-severe)";

  return (
    <motion.section
      id="results"
      data-ocid="results.panel"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-12 px-4"
      style={{ background: "oklch(0.96 0.02 140)" }}
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <h2
            className="text-3xl font-bold"
            style={{
              color: "var(--green-deep)",
              fontFamily: "Bricolage Grotesque, system-ui, sans-serif",
            }}
          >
            🔬 Analysis Complete
          </h2>
          <p className="mt-2" style={{ color: "var(--brown-earth)" }}>
            Here is what our AI found in your leaf photo
          </p>
        </motion.div>

        <Card
          className="overflow-hidden shadow-2xl border-0"
          style={{
            borderTop: `6px solid ${borderColor}`,
            borderRadius: "1.5rem",
          }}
        >
          {/* Image + disease name row */}
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              {/* Image preview */}
              <div className="flex-shrink-0">
                <img
                  src={result.imagePreview}
                  alt="Analyzed leaf"
                  className="w-full sm:w-32 h-36 sm:h-32 object-cover rounded-xl shadow-md"
                />
              </div>

              {/* Disease info */}
              <div className="flex-1 min-w-0">
                <div className="mb-3">
                  <SeverityBadge severity={diseaseInfo.severity} />
                </div>
                <h3
                  className="text-2xl sm:text-3xl font-bold mb-2 leading-tight"
                  style={{
                    color: "var(--green-deep)",
                    fontFamily: "Bricolage Grotesque, system-ui, sans-serif",
                  }}
                >
                  {result.diseaseName}
                </h3>
                {result.cropType && result.cropType !== "Other" && (
                  <Badge
                    variant="outline"
                    className="text-sm"
                    style={{
                      borderColor: "var(--green-light)",
                      color: "var(--green-forest)",
                    }}
                  >
                    Crop: {result.cropType}
                  </Badge>
                )}
              </div>

              {/* Confidence ring */}
              <div className="flex-shrink-0 mx-auto sm:mx-0">
                <ConfidenceRing value={result.confidenceScore} />
              </div>
            </div>

            {/* Divider */}
            <hr className="my-6" style={{ borderColor: "var(--green-pale)" }} />

            {/* Description */}
            <div className="mb-6">
              <h4
                className="text-lg font-bold mb-2"
                style={{ color: "var(--green-deep)" }}
              >
                📋 What This Means
              </h4>
              <p
                className="text-base leading-relaxed"
                style={{ color: "var(--foreground)" }}
              >
                {diseaseInfo.description}
              </p>
            </div>

            {/* Actions */}
            <div
              className="rounded-xl p-5"
              style={{
                background:
                  diseaseInfo.severity === "healthy"
                    ? "oklch(0.9 0.06 145 / 0.2)"
                    : "oklch(0.95 0.06 70 / 0.3)",
              }}
            >
              <h4
                className="text-lg font-bold mb-3"
                style={{ color: "var(--green-deep)" }}
              >
                {diseaseInfo.severity === "healthy"
                  ? "✅ Keep Up The Good Work"
                  : "⚠️ Recommended Actions"}
              </h4>
              <ul className="space-y-2">
                {diseaseInfo.actions.map((action, i) => (
                  <li
                    key={action}
                    className="flex items-start gap-3 text-base"
                    style={{ color: "var(--foreground)" }}
                  >
                    <span
                      className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-white mt-0.5"
                      style={{ background: "var(--green-forest)" }}
                    >
                      {i + 1}
                    </span>
                    {action}
                  </li>
                ))}
              </ul>
            </div>

            {/* Affected crops */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span
                className="text-sm font-semibold"
                style={{ color: "var(--brown-earth)" }}
              >
                Affects:
              </span>
              {diseaseInfo.affectedCrops.map((crop) => (
                <Badge
                  key={crop}
                  variant="secondary"
                  className="text-xs"
                  style={{
                    background: "var(--green-pale)",
                    color: "var(--green-forest)",
                  }}
                >
                  {crop}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div
            className="px-6 sm:px-8 py-5 flex flex-col sm:flex-row gap-3"
            style={{ background: "oklch(0.97 0.01 140)" }}
          >
            <Button
              data-ocid="results.save_button"
              onClick={handleSave}
              disabled={saved || saveScan.isPending}
              className="flex-1 h-12 text-base font-semibold rounded-xl border-0 transition-all"
              style={{
                background: saved
                  ? "var(--green-medium)"
                  : "var(--green-forest)",
                color: "white",
              }}
            >
              {saveScan.isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : saved ? (
                <CheckCircle2 className="w-4 h-4 mr-2" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {saved
                ? "Saved!"
                : saveScan.isPending
                  ? "Saving..."
                  : "Save This Result"}
            </Button>
            <Button
              data-ocid="results.secondary_button"
              onClick={onScanAnother}
              variant="outline"
              className="flex-1 h-12 text-base font-semibold rounded-xl transition-all"
              style={{
                borderColor: "var(--green-light)",
                color: "var(--green-forest)",
              }}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Scan Another Leaf
            </Button>
          </div>
        </Card>
      </div>
    </motion.section>
  );
}
