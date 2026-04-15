"use client";

import { useState, useRef, type ChangeEvent, type DragEvent } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  File01Icon,
  Upload01Icon,
  Cancel01Icon,
  CheckmarkCircle01Icon,
} from "hugeicons-react";
import {
  clientSuccessHandler,
  clientErrorHandler,
} from "@/utils/handlers/clientHandler";

interface PdfUploadProps {
  onUploadComplete?: (fileName: string, fileSize: number) => void;
  variant?: "compact" | "full";
}

export function PdfUpload({
  onUploadComplete,
  variant = "compact",
}: PdfUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isFull = variant === "full";

  const handleFileSelect = (file: File) => {
    if (file.type !== "application/pdf") {
      clientErrorHandler(new Error("Solo se permiten archivos PDF"));
      return;
    }

    setSelectedFile(file);
    setUploadSuccess(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      clientSuccessHandler(
        `Catálogo "${selectedFile.name}" procesado exitosamente.\nProductos importados al catálogo.`,
      );

      setUploadSuccess(true);
      onUploadComplete?.(selectedFile.name, selectedFile.size);
    } catch (error) {
      clientErrorHandler(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setUploadSuccess(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  return (
    <Card className="rounded-[2rem] overflow-hidden">
      <div className={`border-b border-[#161d16]/5 ${isFull ? "p-6" : "p-4"}`}>
        <h2
          className={`${isFull ? "text-base" : "text-sm"} font-bold text-[#161d16]`}
          style={{ fontFamily: "'Manrope', 'Inter', system-ui, sans-serif" }}
        >
          Cargar Catálogo desde PDF
        </h2>
        {isFull && (
          <p
            className="mt-1 text-sm text-[#3d4a3d]"
            style={{ fontFamily: "'Manrope', 'Inter', system-ui, sans-serif" }}
          >
            Subí el PDF del catálogo de productos para actualizar
            automáticamente
          </p>
        )}
      </div>

      <div className={isFull ? "p-6" : "p-4"}>
        {!selectedFile ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed transition-colors cursor-pointer ${
              isFull ? "p-10" : "p-6"
            } ${
              isDragging
                ? "border-[#b7102a] bg-[#b7102a]/5"
                : "border-[#161d16]/15 hover:border-[#161d16]/30 hover:bg-[#f3fcf0]/30"
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <div
              className={`mb-2 flex items-center justify-center rounded-full ${
                isFull ? "size-14" : "size-10"
              } ${
                isDragging
                  ? "bg-[#b7102a]/15 text-[#b7102a]"
                  : "bg-[#f3fcf0]/60 text-[#2b6485]"
              }`}
            >
              <Upload01Icon className={isFull ? "size-6" : "size-5"} />
            </div>
            <p
              className={`${isFull ? "text-sm" : "text-xs"} font-semibold text-[#161d16] text-center`}
              style={{
                fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
              }}
            >
              {isDragging
                ? "Soltá el archivo acá"
                : isFull
                  ? "Arrastrá el PDF acá o hacé clic"
                  : "Arrastrá o hacé clic"}
            </p>
            <p
              className={`mt-0.5 text-[#3d4a3d]/60 ${isFull ? "text-xs" : "text-[10px]"}`}
            >
              Solo archivos PDF
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleInputChange}
              className="hidden"
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-xl border ${
              uploadSuccess
                ? "border-[#7cb56e]/30 bg-[#7cb56e]/5"
                : "border-[#161d16]/10 bg-[#f3fcf0]/30"
            } ${isFull ? "p-5" : "p-3"}`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`flex items-center justify-center rounded-lg shrink-0 ${
                  isFull ? "size-12" : "size-9"
                } ${
                  uploadSuccess
                    ? "bg-[#7cb56e]/15 text-[#5a9a4e]"
                    : isUploading
                      ? "bg-[#2b6485]/15 text-[#2b6485]"
                      : "bg-[#f3fcf0]/60 text-[#2b6485]"
                }`}
              >
                {uploadSuccess ? (
                  <CheckmarkCircle01Icon
                    className={isFull ? "size-6" : "size-4"}
                  />
                ) : (
                  <File01Icon className={isFull ? "size-6" : "size-4"} />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p
                  className={`${isFull ? "text-sm" : "text-xs"} font-semibold text-[#161d16] truncate`}
                  style={{
                    fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
                  }}
                >
                  {selectedFile.name}
                </p>
                <p
                  className={`${isFull ? "text-xs" : "text-[10px]"} text-[#3d4a3d]`}
                >
                  {formatFileSize(selectedFile.size)}
                  {isUploading && " · Procesando..."}
                </p>
              </div>
              {!isUploading && (
                <Button
                  size="icon-xs"
                  variant="ghost"
                  onClick={handleClear}
                  className="text-[#3d4a3d] hover:text-[#b7102a] shrink-0"
                >
                  <Cancel01Icon className="size-4" />
                </Button>
              )}
            </div>

            {!uploadSuccess && !isUploading && (
              <Button
                size={isFull ? "lg" : "sm"}
                className={`mt-4 w-full rounded-[2rem] ${isFull ? "text-base" : "text-xs"}`}
                onClick={handleUpload}
              >
                <Upload01Icon
                  className={`mr-2 ${isFull ? "size-5" : "size-3.5"}`}
                />
                {isFull ? "Procesar Catálogo" : "Procesar"}
              </Button>
            )}

            {uploadSuccess && (
              <p
                className={`mt-3 text-center font-medium text-[#5a9a4e] ${isFull ? "text-sm" : "text-[10px]"}`}
              >
                Catálogo procesado correctamente
              </p>
            )}
          </motion.div>
        )}
      </div>
    </Card>
  );
}
