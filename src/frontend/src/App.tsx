import { Toaster } from "@/components/ui/sonner";
import { AnimatePresence } from "motion/react";
import { useRef, useState } from "react";
import BenefitsSection from "./components/BenefitsSection";
import DiseaseLibrary from "./components/DiseaseLibrary";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import HowItWorksSection from "./components/HowItWorksSection";
import ResultsPanel from "./components/ResultsPanel";
import ScanHistorySection from "./components/ScanHistorySection";
import UploadSection from "./components/UploadSection";
import type { AnalysisResult } from "./components/UploadSection";

export default function App() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null,
  );
  const uploadRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);

  const scrollToUpload = () => {
    uploadRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToHowItWorks = () => {
    howItWorksRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleResult = (result: AnalysisResult) => {
    setAnalysisResult(result);
    // Scroll to results after a brief delay
    setTimeout(() => {
      document
        .getElementById("results")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleScanAnother = () => {
    setAnalysisResult(null);
    scrollToUpload();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-center" richColors />

      {/* Hero */}
      <HeroSection onScanNow={scrollToUpload} onLearnHow={scrollToHowItWorks} />

      {/* Upload */}
      <div ref={uploadRef}>
        <UploadSection onResult={handleResult} />
      </div>

      {/* Results — shown after analysis */}
      <AnimatePresence>
        {analysisResult && (
          <ResultsPanel
            result={analysisResult}
            onScanAnother={handleScanAnother}
          />
        )}
      </AnimatePresence>

      {/* How it works */}
      <div ref={howItWorksRef}>
        <HowItWorksSection />
      </div>

      {/* Disease library */}
      <DiseaseLibrary />

      {/* Benefits */}
      <BenefitsSection />

      {/* History */}
      <ScanHistorySection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
