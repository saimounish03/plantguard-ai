import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Leaf,
  Loader2,
  Trash2,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { DISEASE_DATA } from "../data/diseaseData";
import { useClearHistory, useGetScanHistory } from "../hooks/useQueries";

function formatDate(nanos: bigint): string {
  const ms = Number(nanos) / 1_000_000;
  const date = new Date(ms);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function SeverityIcon({ diseaseName }: { diseaseName: string }) {
  const info = DISEASE_DATA[diseaseName];
  if (!info || info.severity === "healthy") {
    return <CheckCircle2 className="w-4 h-4 text-green-600" />;
  }
  if (info.severity === "mild") {
    return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
  }
  return <AlertCircle className="w-4 h-4 text-red-600" />;
}

function SeverityBadge({ diseaseName }: { diseaseName: string }) {
  const info = DISEASE_DATA[diseaseName];
  const severity = info?.severity ?? "healthy";

  if (severity === "healthy") {
    return (
      <Badge
        className="text-xs border-0"
        style={{
          background: "oklch(0.88 0.08 145)",
          color: "oklch(0.28 0.1 145)",
        }}
      >
        Healthy
      </Badge>
    );
  }
  if (severity === "mild") {
    return (
      <Badge
        className="text-xs border-0"
        style={{
          background: "oklch(0.95 0.12 85)",
          color: "oklch(0.5 0.18 65)",
        }}
      >
        Mild
      </Badge>
    );
  }
  return (
    <Badge
      className="text-xs border-0"
      style={{ background: "oklch(0.92 0.1 25)", color: "oklch(0.42 0.2 25)" }}
    >
      Severe
    </Badge>
  );
}

export default function ScanHistorySection() {
  const { data: history, isLoading, isError } = useGetScanHistory();
  const clearHistory = useClearHistory();
  const [isClearing, setIsClearing] = useState(false);

  const handleClearHistory = async () => {
    setIsClearing(true);
    try {
      await clearHistory.mutateAsync();
      toast.success("Scan history cleared");
    } catch {
      toast.error("Failed to clear history");
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <section
      id="history"
      className="py-20 px-4"
      style={{ background: "oklch(0.96 0.02 140)" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
        >
          <div>
            <h2
              className="text-3xl sm:text-4xl font-bold"
              style={{
                color: "var(--green-deep)",
                fontFamily: "Bricolage Grotesque, system-ui, sans-serif",
              }}
            >
              Your Scan History
            </h2>
            <p className="mt-1" style={{ color: "var(--brown-earth)" }}>
              {history && history.length > 0
                ? `${history.length} scan${history.length !== 1 ? "s" : ""} recorded`
                : "Track all your previous plant diagnoses here"}
            </p>
          </div>

          {history && history.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  data-ocid="history.delete_button"
                  variant="outline"
                  className="flex items-center gap-2 h-11 px-5 rounded-xl font-semibold"
                  style={{
                    borderColor: "var(--severity-severe)",
                    color: "var(--severity-severe)",
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                  Clear History
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Clear All Scan History?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete all {history.length} scan
                    record
                    {history.length !== 1 ? "s" : ""}. This action cannot be
                    undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel data-ocid="history.dialog.cancel_button">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    data-ocid="history.dialog.confirm_button"
                    onClick={handleClearHistory}
                    disabled={isClearing}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    {isClearing ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4 mr-2" />
                    )}
                    Yes, Clear All
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </motion.div>

        {/* Loading state */}
        {isLoading && (
          <div data-ocid="history.loading_state" className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 w-full rounded-2xl" />
            ))}
          </div>
        )}

        {/* Error state */}
        {isError && (
          <div
            data-ocid="history.error_state"
            className="flex items-center gap-3 p-5 rounded-2xl"
            style={{
              background: "oklch(0.92 0.1 25 / 0.2)",
              color: "oklch(0.42 0.2 25)",
            }}
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="font-semibold">
              Could not load scan history. Please refresh the page.
            </p>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !isError && (!history || history.length === 0) && (
          <motion.div
            data-ocid="history.empty_state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center py-16 text-center rounded-2xl"
            style={{
              background: "white",
              border: "2px dashed var(--green-light)",
            }}
          >
            <div
              className="flex items-center justify-center w-20 h-20 rounded-full mb-5"
              style={{ background: "var(--green-pale)" }}
            >
              <Leaf
                className="w-10 h-10"
                style={{ color: "var(--green-medium)" }}
              />
            </div>
            <h3
              className="text-xl font-bold mb-2"
              style={{
                color: "var(--green-deep)",
                fontFamily: "Bricolage Grotesque, system-ui, sans-serif",
              }}
            >
              No Scans Yet
            </h3>
            <p
              className="max-w-xs text-base"
              style={{ color: "var(--brown-light)" }}
            >
              Upload your first leaf photo above to start detecting plant
              diseases!
            </p>
          </motion.div>
        )}

        {/* History list */}
        {!isLoading && !isError && history && history.length > 0 && (
          <motion.div
            data-ocid="history.table"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="space-y-3"
          >
            {history.map((record, idx) => (
              <motion.div
                key={record.id.toString()}
                data-ocid={`history.item.${idx + 1}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <Card
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 border-0 shadow-sm"
                  style={{ borderRadius: "1rem" }}
                >
                  {/* Severity icon */}
                  <div
                    className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl"
                    style={{ background: "var(--green-pale)" }}
                  >
                    <SeverityIcon diseaseName={record.diseaseName} />
                  </div>

                  {/* Main info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span
                        className="font-bold text-base"
                        style={{ color: "var(--green-deep)" }}
                      >
                        {record.diseaseName}
                      </span>
                      <SeverityBadge diseaseName={record.diseaseName} />
                    </div>
                    <div
                      className="flex flex-wrap gap-3 text-sm"
                      style={{ color: "var(--brown-light)" }}
                    >
                      {record.cropType && (
                        <span className="flex items-center gap-1">
                          <Leaf className="w-3.5 h-3.5" />
                          {record.cropType}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {formatDate(record.timestamp)}
                      </span>
                    </div>
                  </div>

                  {/* Confidence */}
                  <div className="flex-shrink-0 text-right">
                    <div
                      className="text-xl font-black"
                      style={{
                        color:
                          Number(record.confidenceScore) >= 85
                            ? "var(--green-forest)"
                            : Number(record.confidenceScore) >= 75
                              ? "oklch(0.6 0.18 80)"
                              : "var(--severity-severe)",
                        fontFamily:
                          "Bricolage Grotesque, system-ui, sans-serif",
                      }}
                    >
                      {Number(record.confidenceScore)}%
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "var(--brown-light)" }}
                    >
                      confidence
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
