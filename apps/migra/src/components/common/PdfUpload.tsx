"use client";

import { useState, useRef, type ChangeEvent, type DragEvent } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { File01Icon, Upload01Icon, Cancel01Icon, CheckmarkCircle01Icon } from "hugeicons-react";
import { clientSuccessHandler, clientErrorHandler } from "@/utils/handlers/clientHandler";

interface PdfUploadProps {
  onUploadComplete?: (fileName: string, fileSize: number) => void;
}

export function PdfUpload({ onUploadComplete }: PdfUploadProps) {
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
      // TODO: Conectar con servicio de procesamiento de PDF
      // const response = await pdfService.processCatalog(selectedFile);
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
      <div className="border-b border-[#161d16]/5 p-6">
        <h2
          className="text-base font-bold text-[#161d16]"
          style={{ fontFamily: "'Manrope', 'Inter', system-ui, sans-serif" }}
        >
          Cargar Catálogo desde PDF
        </h2>
        <p
          className="mt-1 text-sm text-[#3d4a3d]"
          style={{ fontFamily: "'Manrope', 'Inter', system-ui, sans-serif" }}
        >
          Subí el PDF del catálogo de productos para actualizar automáticamente
        </p>
      </div>

      <div className="p-6">
        {!selectedFile ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-12 transition-colors ${
              isDragging
                ? "border-[#b7102a] bg-[#b7102a]/5"
                : "border-[#161d16]/15 hover:border-[#161d16]/30 hover:bg-[#f3fcf0]/30"
            }`}
          >
            <div
              className={`mb-4 flex size-16 items-center justify-center rounded-full transition-colors ${
                isDragging
                  ? "bg-[#b7102a]/15 text-[#b7102a]"
                  : "bg-[#f3fcf0]/60 text-[#2b6485]"
              }`}
            >
              <Upload01Icon className="size-7" />
            </div>
            <p
              className="text-sm font-semibold text-[#161d16]"
              style={{ fontFamily: "'Manrope', 'Inter', system-ui, sans-serif" }}
            >
              {isDragging ? "Soltá el archivo acá" : "Arrastrá el PDF acá"}
            </p>
            <p className="mt-1 text-xs text-[#3d4a3d]">o</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-2 rounded-[2rem]"
              onClick={() => fileInputRef.current?.click()}
            >
              <File01Icon className="mr-2 size-4" />
              Seleccionar archivo
            </Button>
            <p className="mt-3 text-xs text-[#3d4a3d]/70">Solo archivos PDF</p>
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl border p-5 ${
              uploadSuccess
                ? "border-[#7cb56e]/30 bg-[#7cb56e]/5"
                : "border-[#161d16]/10 bg-[#f3fcf0]/30"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className={`flex size-12 items-center justify-center rounded-xl ${
                    uploadSuccess
                      ? "bg-[#7cb56e]/15 text-[#5a9a4e]"
                      : isUploading
                        ? "bg-[#2b6485]/15 text-[#2b6485]"
                        : "bg-[#f3fcf0]/60 text-[#2b6485]"
                  }`}
                >
                  {uploadSuccess ? (
                    <CheckmarkCircle01Icon className="size-6" />
                  ) : (
                    <File01Icon className="size-6" />
                  )}
                </div>
                <div>
                  <p
                    className="text-sm font-semibold text-[#161d16]"
                    style={{ fontFamily: "'Manrope', 'Inter', system-ui, sans-serif" }}
                  >
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-[#3d4a3d]">
                    {formatFileSize(selectedFile.size)}
                    {isUploading && " · Procesando..."}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {isUploading && (
                  <span className="size-4 animate-spin rounded-full border-2 border-[#2b6485]/30 border-t-[#2b6485]" />
                )}
                {!isUploading && (
                  <Button
                    size="icon-xs"
                    variant="ghost"
                    onClick={handleClear}
                    className="text-[#3d4a3d] hover:text-[#b7102a]"
                  >
                    <Cancel01Icon className="size-4" />
                  </Button>
                )}
              </div>
            </div>

            {!uploadSuccess && !isUploading && (
              <Button
                size="lg"
                className="mt-4 w-full rounded-[2rem]"
                onClick={handleUpload}
              >
                <Upload01Icon className="mr-2 size-5" />
                Procesar Catálogo
              </Button>
            )}

            {uploadSuccess && (
              <p className="mt-3 text-center text-sm font-medium text-[#5a9a4e]">
                Catálogo procesado correctamente
              </p>
            )}
          </motion.div>
        )}
      </div>
    </Card>
  );
}
