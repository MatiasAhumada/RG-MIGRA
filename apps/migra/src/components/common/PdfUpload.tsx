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
import { productoService } from "@/services";

interface BulkUploadResult {
  created: unknown[];
  errors: unknown[];
  total: number;
}

interface PdfUploadProps {
  onUploadComplete?: (fileName: string, result?: BulkUploadResult) => void;
  variant?: "compact" | "full";
  empresaId?: number;
}

const EXCEL_MIME_TYPES = [
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
  "application/excel",
];

const EXCEL_EXTENSIONS = [".xlsx", ".xls"];

function isExcelFile(file: File): boolean {
  const fileName = file.name.toLowerCase();
  return (
    EXCEL_MIME_TYPES.some((type) => file.type.includes(type)) ||
    EXCEL_EXTENSIONS.some((ext) => fileName.endsWith(ext))
  );
}

export function PdfUpload({
  onUploadComplete,
  variant = "compact",
  empresaId = 1,
}: PdfUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadResult, setUploadResult] = useState<BulkUploadResult | null>(
    null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isFull = variant === "full";

  const handleFileSelect = (file: File) => {
    if (!isExcelFile(file) && file.type !== "application/pdf") {
      clientErrorHandler(
        new Error("Solo se permiten archivos Excel (.xlsx, .xls) o PDF"),
      );
      return;
    }

    setSelectedFile(file);
    setUploadSuccess(false);
    setUploadResult(null);
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
      const isExcel = isExcelFile(selectedFile);
      let result: BulkUploadResult;

      if (isExcel) {
        result = await productoService.bulkCreateFromExcel(
          selectedFile,
          empresaId,
        );
      } else {
        result = await productoService.bulkCreateFromPdf(
          selectedFile,
          "default",
          0,
          empresaId,
        );
      }

      setUploadResult(result);

      const successCount = result.created?.length || 0;
      const errorCount = result.errors?.length || 0;

      clientSuccessHandler(
        `Catálogo "${selectedFile.name}" procesado.\n${successCount} productos creados/actualizados, ${errorCount} errores.`,
      );

      setUploadSuccess(true);
      onUploadComplete?.(selectedFile.name, result);
    } catch (error) {
      clientErrorHandler(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setUploadSuccess(false);
    setUploadResult(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  const getFileTypeLabel = () => {
    if (!selectedFile) return "";
    return isExcelFile(selectedFile) ? "Excel" : "PDF";
  };

  return (
    <Card className="rounded-[2rem] overflow-hidden">
      <div className={`border-b border-[#161d16]/5 ${isFull ? "p-6" : "p-4"}`}>
        <h2
          className={`${isFull ? "text-base" : "text-sm"} font-bold text-[#161d16]`}
          style={{ fontFamily: "'Manrope', 'Inter', system-ui, sans-serif" }}
        >
          Cargar Catálogo desde Excel
        </h2>
        {isFull && (
          <p
            className="mt-1 text-sm text-[#3d4a3d]"
            style={{ fontFamily: "'Manrope', 'Inter', system-ui, sans-serif" }}
          >
            Subí el Excel del catálogo de productos para actualizar
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
                  ? "Arrastrá el Excel acá o hacé clic"
                  : "Arrastrá o hacé clic"}
            </p>
            <p
              className={`mt-0.5 text-[#3d4a3d]/60 ${isFull ? "text-xs" : "text-[10px]"}`}
            >
              Solo archivos Excel (.xlsx, .xls)
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
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
                  {!isUploading &&
                    getFileTypeLabel() &&
                    ` · ${getFileTypeLabel()}`}
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

            {uploadSuccess && uploadResult && (
              <div
                className={`mt-3 text-center ${isFull ? "text-sm" : "text-[10px]"}`}
              >
                <p className="font-medium text-[#5a9a4e]">
                  Catálogo procesado correctamente
                </p>
                <p className="text-[#3d4a3d] mt-1">
                  {uploadResult.created?.length || 0} productos
                  creados/actualizados
                  {uploadResult.errors?.length
                    ? `, ${uploadResult.errors.length} errores`
                    : ""}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </Card>
  );
}
