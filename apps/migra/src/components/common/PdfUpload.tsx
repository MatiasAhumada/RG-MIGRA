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

interface PdfUploadCompactProps {
  onUploadComplete?: (fileName: string, fileSize: number) => void;
}

export function PdfUploadCompact({ onUploadComplete }: PdfUploadCompactProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        `Catálogo "${selectedFile.name}" procesado exitosamente. Productos importados.`,
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
      <div className="border-b border-[#161d16]/5 p-4">
        <h2
          className="text-sm font-bold text-[#161d16]"
          style={{ fontFamily: "'Manrope', 'Inter', system-ui, sans-serif" }}
        >
          Cargar Catálogo PDF
        </h2>
      </div>

      <div className="p-4">
        {!selectedFile ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition-colors cursor-pointer ${
              isDragging
                ? "border-[#b7102a] bg-[#b7102a]/5"
                : "border-[#161d16]/15 hover:border-[#161d16]/30 hover:bg-[#f3fcf0]/30"
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <div
              className={`mb-2 flex size-10 items-center justify-center rounded-full ${
                isDragging
                  ? "bg-[#b7102a]/15 text-[#b7102a]"
                  : "bg-[#f3fcf0]/60 text-[#2b6485]"
              }`}
            >
              <Upload01Icon className="size-5" />
            </div>
            <p
              className="text-xs font-semibold text-[#161d16] text-center"
              style={{ fontFamily: "'Manrope', 'Inter', system-ui, sans-serif" }}
            >
              {isDragging ? "Soltá el archivo" : "Arrastrá o hacé clic"}
            </p>
            <p className="mt-0.5 text-[10px] text-[#3d4a3d]/60">Solo PDF</p>
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
            className={`rounded-xl border p-3 ${
              uploadSuccess
                ? "border-[#7cb56e]/30 bg-[#7cb56e]/5"
                : "border-[#161d16]/10 bg-[#f3fcf0]/30"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex size-9 items-center justify-center rounded-lg shrink-0 ${
                  uploadSuccess
                    ? "bg-[#7cb56e]/15 text-[#5a9a4e]"
                    : isUploading
                      ? "bg-[#2b6485]/15 text-[#2b6485]"
                      : "bg-[#f3fcf0]/60 text-[#2b6485]"
                }`}
              >
                {uploadSuccess ? (
                  <CheckmarkCircle01Icon className="size-4" />
                ) : (
                  <File01Icon className="size-4" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p
                  className="text-xs font-semibold text-[#161d16] truncate"
                  style={{ fontFamily: "'Manrope', 'Inter', system-ui, sans-serif" }}
                >
                  {selectedFile.name}
                </p>
                <p className="text-[10px] text-[#3d4a3d]">
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
                  <Cancel01Icon className="size-3.5" />
                </Button>
              )}
            </div>

            {!uploadSuccess && !isUploading && (
              <Button
                size="sm"
                className="mt-2 w-full rounded-[2rem] text-xs"
                onClick={handleUpload}
              >
                <Upload01Icon className="mr-1.5 size-3.5" />
                Procesar
              </Button>
            )}

            {uploadSuccess && (
              <p className="mt-2 text-center text-[10px] font-medium text-[#5a9a4e]">
                Procesado correctamente
              </p>
            )}
          </motion.div>
        )}
      </div>
    </Card>
  );
}
