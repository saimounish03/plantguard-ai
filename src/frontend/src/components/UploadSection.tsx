import { useCamera } from "@/camera/useCamera";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Camera,
  FileText,
  FlipHorizontal,
  FolderOpen,
  ImageIcon,
  Leaf,
  Loader2,
  Upload,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  CROP_TYPES,
  getRandomConfidence,
  getRandomDisease,
} from "../data/diseaseData";

export interface AnalysisResult {
  diseaseName: string;
  confidenceScore: number;
  cropType: string;
  imagePreview: string;
}

interface UploadSectionProps {
  onResult: (result: AnalysisResult) => void;
}

export default function UploadSection({ onResult }: UploadSectionProps) {
  const [dragOver, setDragOver] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isPdf, setIsPdf] = useState(false);
  const [cropType, setCropType] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();

  const {
    isActive,
    isSupported,
    error,
    isLoading: cameraLoading,
    startCamera,
    stopCamera,
    capturePhoto,
    switchCamera,
    videoRef,
    canvasRef,
  } = useCamera({
    facingMode: "environment",
    quality: 0.92,
    format: "image/jpeg",
  });

  // Start camera when dialog opens, stop when it closes
  useEffect(() => {
    if (cameraOpen) {
      startCamera();
    } else {
      stopCamera();
    }
  }, [cameraOpen, startCamera, stopCamera]);

  const handleFileSelect = useCallback((file: File) => {
    const isImage = file.type.startsWith("image/");
    const isPdfFile = file.type === "application/pdf";
    if (!isImage && !isPdfFile) return;
    setSelectedFile(file);
    setIsPdf(isPdfFile);
    if (isPdfFile) {
      // Show a placeholder preview for PDFs
      setImagePreview("pdf");
    } else {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFileSelect(file);
    },
    [handleFileSelect],
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleDropzoneClick = () => {
    setUploadModalOpen(true);
  };

  const handleTakePhoto = async () => {
    const file = await capturePhoto();
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      await stopCamera();
      setCameraOpen(false);
    }
  };

  const handleCancelCamera = async () => {
    await stopCamera();
    setCameraOpen(false);
  };

  const handleAnalyze = async () => {
    if (!selectedFile || !imagePreview) return;
    setIsAnalyzing(true);
    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 2200));
    const disease = getRandomDisease();
    const confidence = getRandomConfidence();
    setIsAnalyzing(false);
    onResult({
      diseaseName: disease,
      confidenceScore: confidence,
      cropType: cropType || "Other",
      imagePreview,
    });
  };

  const handleReset = () => {
    setImagePreview(null);
    setSelectedFile(null);
    setIsPdf(false);
    setCropType("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (pdfInputRef.current) pdfInputRef.current.value = "";
  };

  return (
    <section
      id="upload"
      className="py-20 px-4"
      style={{ background: "var(--cream-warm)" }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4"
            style={{
              background: "var(--green-pale)",
              color: "var(--green-forest)",
            }}
          >
            <Leaf className="w-4 h-4" />
            AI-Powered Detection
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            style={{
              color: "var(--green-deep)",
              fontFamily: "Bricolage Grotesque, system-ui, sans-serif",
            }}
          >
            Check Your Plant
          </h2>
          <p className="text-lg" style={{ color: "var(--brown-earth)" }}>
            Take a clear photo of a leaf and our AI will identify any diseases
            in seconds
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card
            className="p-6 sm:p-8 shadow-xl border-0"
            style={{ background: "white", borderRadius: "1.5rem" }}
          >
            {/* Upload zone */}
            <div className="mb-6">
              <Label
                className="text-base font-semibold mb-3 block"
                style={{ color: "var(--green-deep)" }}
              >
                📷 Your Leaf Photo
              </Label>

              <AnimatePresence mode="wait">
                {!imagePreview ? (
                  <motion.div
                    key="dropzone"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    data-ocid="upload.dropzone"
                    onClick={handleDropzoneClick}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className="relative cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-200 overflow-hidden"
                    style={{
                      borderColor: dragOver
                        ? "var(--green-medium)"
                        : "var(--green-light)",
                      background: dragOver
                        ? "oklch(0.88 0.06 145 / 0.15)"
                        : "oklch(0.93 0.04 140 / 0.5)",
                      minHeight: "200px",
                    }}
                  >
                    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                      <motion.div
                        animate={{ y: dragOver ? -4 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center justify-center w-16 h-16 rounded-full mb-4"
                        style={{ background: "var(--green-pale)" }}
                      >
                        {dragOver ? (
                          <ImageIcon
                            className="w-8 h-8"
                            style={{ color: "var(--green-medium)" }}
                          />
                        ) : (
                          <Camera
                            className="w-8 h-8"
                            style={{ color: "var(--green-medium)" }}
                          />
                        )}
                      </motion.div>
                      <p
                        className="text-lg font-semibold mb-1"
                        style={{ color: "var(--green-forest)" }}
                      >
                        {dragOver
                          ? "Drop your file here!"
                          : "Tap to upload your leaf photo"}
                      </p>
                      <p
                        className="text-sm"
                        style={{ color: "var(--brown-light)" }}
                      >
                        Camera, JPG / PNG / WEBP image, or PDF
                      </p>
                      {isSupported === false && (
                        <p
                          className="text-xs mt-2 px-3 py-1.5 rounded-lg"
                          style={{
                            color: "var(--brown-earth)",
                            background: "var(--cream-warm)",
                          }}
                        >
                          Camera unavailable — tap to browse files instead
                        </p>
                      )}
                    </div>
                    {/* Fallback file input (images only) */}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/*"
                      className="absolute inset-0 opacity-0 pointer-events-none"
                      tabIndex={-1}
                      onChange={handleInputChange}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative rounded-2xl overflow-hidden"
                    style={{ border: "2px solid var(--green-light)" }}
                  >
                    {isPdf ? (
                      <div
                        className="flex flex-col items-center justify-center py-12 px-4"
                        style={{
                          background: "oklch(0.93 0.04 140 / 0.5)",
                          minHeight: "200px",
                        }}
                      >
                        <FileText
                          className="w-16 h-16 mb-4"
                          style={{ color: "var(--green-forest)" }}
                        />
                        <p
                          className="text-base font-semibold"
                          style={{ color: "var(--green-forest)" }}
                        >
                          {selectedFile?.name}
                        </p>
                        <p
                          className="text-sm mt-1"
                          style={{ color: "var(--brown-light)" }}
                        >
                          PDF ready for analysis
                        </p>
                      </div>
                    ) : (
                      <img
                        src={imagePreview!}
                        alt="Leaf preview"
                        className="w-full object-cover"
                        style={{ maxHeight: "280px", objectFit: "cover" }}
                      />
                    )}
                    {!isPdf && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    )}
                    <button
                      type="button"
                      onClick={handleReset}
                      className="absolute top-3 right-3 px-3 py-1.5 rounded-full text-sm font-semibold text-white backdrop-blur-sm transition-colors"
                      style={{ background: "rgba(0,0,0,0.45)" }}
                    >
                      Change
                    </button>
                    {!isPdf && (
                      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-sm font-medium">
                        <ImageIcon className="w-4 h-4" />
                        Photo ready
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Crop type selector */}
            <div className="mb-6">
              <Label
                className="text-base font-semibold mb-3 block"
                style={{ color: "var(--green-deep)" }}
              >
                🌱 What Crop is This?{" "}
                <span
                  className="text-sm font-normal"
                  style={{ color: "var(--brown-light)" }}
                >
                  (optional)
                </span>
              </Label>
              <Select value={cropType} onValueChange={setCropType}>
                <SelectTrigger
                  data-ocid="upload.select"
                  className="h-12 text-base rounded-xl"
                  style={{ borderColor: "var(--green-light)" }}
                >
                  <SelectValue placeholder="Select your crop type..." />
                </SelectTrigger>
                <SelectContent>
                  {CROP_TYPES.map((crop) => (
                    <SelectItem
                      key={crop}
                      value={crop}
                      className="text-base py-2"
                    >
                      {crop}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Analyze button */}
            <AnimatePresence mode="wait">
              {isAnalyzing ? (
                <motion.div
                  key="loading"
                  data-ocid="upload.loading_state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-6 rounded-2xl"
                  style={{ background: "var(--green-pale)" }}
                >
                  <Loader2
                    className="w-10 h-10 animate-spin mb-3"
                    style={{ color: "var(--green-medium)" }}
                  />
                  <p
                    className="text-lg font-semibold"
                    style={{ color: "var(--green-forest)" }}
                  >
                    AI is analyzing your leaf...
                  </p>
                  <p
                    className="text-sm mt-1"
                    style={{ color: "var(--brown-light)" }}
                  >
                    This usually takes 2–3 seconds
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="button"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Button
                    data-ocid="upload.submit_button"
                    onClick={handleAnalyze}
                    disabled={!imagePreview}
                    className="w-full h-14 text-xl font-bold rounded-2xl shadow-lg transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed border-0"
                    style={{
                      background: imagePreview
                        ? "var(--green-forest)"
                        : "oklch(0.75 0.05 145)",
                      color: "white",
                    }}
                  >
                    <Leaf className="w-5 h-5 mr-2" />
                    {imagePreview ? "Analyze Now" : "Upload a Photo First"}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {!imagePreview && (
              <p
                className="text-center text-sm mt-3"
                style={{ color: "var(--brown-light)" }}
              >
                💡 <strong>Tip:</strong> For best results, take a close-up photo
                of a single leaf in good light
              </p>
            )}
          </Card>
        </motion.div>
      </div>

      {/* Hidden PDF input */}
      <input
        ref={pdfInputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        tabIndex={-1}
        onChange={handleInputChange}
      />

      {/* Upload choice modal */}
      <Dialog open={uploadModalOpen} onOpenChange={setUploadModalOpen}>
        <DialogContent
          data-ocid="upload.choice_modal"
          className="max-w-sm w-full p-6"
          style={{ borderRadius: "1.25rem" }}
        >
          <DialogHeader className="mb-4">
            <DialogTitle
              className="text-xl font-bold text-center"
              style={{ color: "var(--green-deep)" }}
            >
              Upload Leaf Photo
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            {isSupported !== false && (
              <Button
                data-ocid="upload.camera_option_button"
                onClick={() => {
                  setUploadModalOpen(false);
                  setCameraOpen(true);
                }}
                className="w-full h-14 text-base font-semibold rounded-2xl border-0 flex items-center gap-3 justify-start px-5"
                style={{ background: "var(--green-forest)", color: "white" }}
              >
                <Camera className="w-5 h-5 shrink-0" />
                <span>Take a Photo with Camera</span>
              </Button>
            )}
            <Button
              data-ocid="upload.image_option_button"
              onClick={() => {
                setUploadModalOpen(false);
                fileInputRef.current?.click();
              }}
              variant="outline"
              className="w-full h-14 text-base font-semibold rounded-2xl flex items-center gap-3 justify-start px-5"
              style={{
                borderColor: "var(--green-light)",
                color: "var(--green-forest)",
              }}
            >
              <FolderOpen className="w-5 h-5 shrink-0" />
              <span>Upload Image (JPG / PNG / WEBP)</span>
            </Button>
            <Button
              data-ocid="upload.pdf_option_button"
              onClick={() => {
                setUploadModalOpen(false);
                pdfInputRef.current?.click();
              }}
              variant="outline"
              className="w-full h-14 text-base font-semibold rounded-2xl flex items-center gap-3 justify-start px-5"
              style={{
                borderColor: "var(--green-light)",
                color: "var(--green-forest)",
              }}
            >
              <FileText className="w-5 h-5 shrink-0" />
              <span>Upload PDF Document</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Camera Dialog */}
      <Dialog
        open={cameraOpen}
        onOpenChange={(open) => {
          if (!open) handleCancelCamera();
        }}
      >
        <DialogContent
          data-ocid="upload.camera_modal"
          className="p-0 overflow-hidden max-w-lg w-full"
          style={{
            borderRadius: "1.25rem",
            background: "#000",
            border: "none",
          }}
        >
          <DialogHeader className="px-4 pt-4 pb-2">
            <DialogTitle className="text-white text-lg font-bold flex items-center gap-2">
              <Camera
                className="w-5 h-5"
                style={{ color: "var(--green-light)" }}
              />
              Take a Leaf Photo
            </DialogTitle>
          </DialogHeader>

          {/* Camera preview area */}
          <div className="relative bg-black" style={{ minHeight: "300px" }}>
            {/* Loading state */}
            {cameraLoading && (
              <div
                data-ocid="camera.loading_state"
                className="absolute inset-0 flex flex-col items-center justify-center z-10"
                style={{ background: "rgba(0,0,0,0.85)" }}
              >
                <Loader2
                  className="w-10 h-10 animate-spin mb-3"
                  style={{ color: "var(--green-light)" }}
                />
                <p className="text-white text-sm font-medium">
                  Starting camera…
                </p>
              </div>
            )}

            {/* Error state */}
            {error && !cameraLoading && (
              <div
                data-ocid="camera.error_state"
                className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 text-center"
                style={{ background: "rgba(0,0,0,0.9)" }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                  style={{ background: "oklch(0.45 0.18 25 / 0.3)" }}
                >
                  <X
                    className="w-7 h-7"
                    style={{ color: "oklch(0.75 0.15 25)" }}
                  />
                </div>
                <p
                  className="text-base font-semibold mb-1"
                  style={{ color: "oklch(0.85 0.1 25)" }}
                >
                  Camera unavailable
                </p>
                <p
                  className="text-sm mb-5"
                  style={{ color: "oklch(0.7 0.05 25)" }}
                >
                  {error.message}
                </p>
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-11 font-semibold rounded-xl border-0"
                  style={{ background: "var(--green-forest)", color: "white" }}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Browse Files Instead
                </Button>
              </div>
            )}

            {/* Camera not supported */}
            {isSupported === false && !cameraLoading && !error && (
              <div
                className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 text-center"
                style={{ background: "rgba(0,0,0,0.9)" }}
              >
                <p
                  className="text-base font-semibold mb-3"
                  style={{ color: "oklch(0.85 0.1 25)" }}
                >
                  Camera not supported in this browser
                </p>
                <Button
                  onClick={() => {
                    setCameraOpen(false);
                    setTimeout(() => fileInputRef.current?.click(), 100);
                  }}
                  className="w-full h-11 font-semibold rounded-xl border-0"
                  style={{ background: "var(--green-forest)", color: "white" }}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Browse Files Instead
                </Button>
              </div>
            )}

            {/* Video preview */}
            <video
              ref={videoRef}
              playsInline
              muted
              autoPlay
              style={{
                width: "100%",
                minHeight: "300px",
                background: "black",
                display: "block",
                objectFit: "cover",
              }}
            />
            <canvas ref={canvasRef} style={{ display: "none" }} />
          </div>

          {/* Camera controls */}
          <div
            className="px-4 py-4 flex flex-col gap-3"
            style={{ background: "oklch(0.1 0.02 145)" }}
          >
            {/* Switch camera (mobile only) */}
            {isMobile && (
              <Button
                data-ocid="camera.switch_button"
                onClick={() => switchCamera()}
                disabled={cameraLoading || !isActive}
                variant="outline"
                className="w-full h-11 font-semibold rounded-xl transition-all duration-150"
                style={{
                  background: "oklch(0.18 0.04 145)",
                  borderColor: "oklch(0.35 0.06 145)",
                  color: "oklch(0.88 0.08 145)",
                }}
              >
                <FlipHorizontal className="w-4 h-4 mr-2" />
                Switch Camera
              </Button>
            )}

            {/* Take photo button */}
            <Button
              data-ocid="camera.capture_button"
              onClick={handleTakePhoto}
              disabled={cameraLoading || !isActive}
              className="w-full h-14 text-lg font-bold rounded-2xl border-0 shadow-lg transition-all duration-150 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background:
                  isActive && !cameraLoading
                    ? "var(--green-forest)"
                    : "oklch(0.35 0.05 145)",
                color: "white",
              }}
            >
              {cameraLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Initializing…
                </>
              ) : (
                <>
                  <Camera className="w-5 h-5 mr-2" />
                  Take Photo
                </>
              )}
            </Button>

            {/* Cancel button */}
            <Button
              data-ocid="camera.cancel_button"
              onClick={handleCancelCamera}
              variant="ghost"
              className="w-full h-11 font-semibold rounded-xl transition-colors duration-150"
              style={{ color: "oklch(0.65 0.04 145)" }}
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
