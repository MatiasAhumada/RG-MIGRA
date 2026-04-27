"use client";

import { useState, useRef, type ChangeEvent, type DragEvent } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Image02Icon,
  Upload01Icon,
  Cancel01Icon,
  FolderOpenIcon,
  CheckmarkCircle02Icon,
  AlertCircleIcon,
} from "hugeicons-react";
import { clientErrorHandler } from "@/utils/handlers/clientHandler";
import { productoService } from "@/services/producto.service";
import { toast } from "sonner";

interface ImageBulkUploadProps {
  onUploadComplete?: () => void;
  variant?: "compact" | "full";
}

const IMAGE_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

function isImageFile(file: File): boolean {
  return IMAGE_MIME_TYPES.includes(file.type.toLowerCase());
}

export function ImageBulkUpload({
  onUploadComplete,
  variant = "compact",
}: ImageBulkUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isFull = variant === "full";

  const handleFilesSelect = (files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    const validFiles = fileArray.filter((file) => {
      if (!isImageFile(file)) {
        clientErrorHandler(new Error(`${file.name} no es una imagen válida`));
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      setSelectedFiles(validFiles);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFilesSelect(e.target.files);
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
    handleFilesSelect(e.dataTransfer.files);
  };

  const handleClear = () => {
    setSelectedFiles([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    setIsUploading(true);

    try {
      const result = await productoService.bulkUploadImages(selectedFiles);

      if (result.success > 0) {
        toast.success(
          `${result.success} imagen${result.success !== 1 ? "es" : ""} subida${result.success !== 1 ? "s" : ""} correctamente`,
          {
            icon: <CheckmarkCircle02Icon className="size-5" />,
          },
        );
      }

      if (result.failed > 0) {
        const failedDetails = result.results
          .filter((r) => !r.success)
          .map((r) => `${r.sku}: ${r.error}`)
          .join("\n");

        console.error("Errores en carga de imágenes:", failedDetails);

        toast.error(
          `${result.failed} imagen${result.failed !== 1 ? "es" : ""} fallaron. Ver consola para detalles.`,
          {
            icon: <AlertCircleIcon className="size-5" />,
            duration: 8000,
          },
        );
      }

      handleClear();
      onUploadComplete?.();
    } catch (error) {
      clientErrorHandler(error, undefined, {
        showToast: true,
        messagePrefix: "Error al subir imágenes: ",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  const getTotalSize = () => {
    return selectedFiles.reduce((acc, file) => acc + file.size, 0);
  };

  return (
    <Card className="rounded-[2rem] overflow-hidden">
      <div className={`border-b border-[#161d16]/5 ${isFull ? "p-6" : "p-4"}`}>
        <h2
          className={`${isFull ? "text-base" : "text-sm"} font-bold text-[#161d16]`}
          style={{ fontFamily: "'Manrope', 'Inter', system-ui, sans-serif" }}
        >
          Cargar Imágenes Masivamente
        </h2>
        {isFull && (
          <p
            className="mt-1 text-sm text-[#3d4a3d]"
            style={{ fontFamily: "'Manrope', 'Inter', system-ui, sans-serif" }}
          >
            Subí múltiples imágenes para optimizar y almacenar en Cloudflare
          </p>
        )}
      </div>

      <div className={isFull ? "p-6" : "p-4"}>
        {selectedFiles.length === 0 ? (
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
              <FolderOpenIcon className={isFull ? "size-6" : "size-5"} />
            </div>
            <p
              className={`${isFull ? "text-sm" : "text-xs"} font-semibold text-[#161d16] text-center`}
              style={{
                fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
              }}
            >
              {isDragging
                ? "Soltá las imágenes acá"
                : isFull
                  ? "Arrastrá imágenes acá o hacé clic"
                  : "Arrastrá o hacé clic"}
            </p>
            <p
              className={`mt-0.5 text-[#3d4a3d]/60 ${isFull ? "text-xs" : "text-[10px]"}`}
            >
              JPG, PNG, WEBP (múltiples archivos)
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              multiple
              onChange={handleInputChange}
              className="hidden"
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-xl border border-[#161d16]/10 bg-[#f3fcf0]/30 ${isFull ? "p-5" : "p-3"}`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`flex items-center justify-center rounded-lg shrink-0 ${
                  isFull ? "size-12" : "size-9"
                } bg-[#f3fcf0]/60 text-[#2b6485]`}
              >
                <Image02Icon className={isFull ? "size-6" : "size-4"} />
              </div>
              <div className="min-w-0 flex-1">
                <p
                  className={`${isFull ? "text-sm" : "text-xs"} font-semibold text-[#161d16]`}
                  style={{
                    fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
                  }}
                >
                  {selectedFiles.length} imagen
                  {selectedFiles.length !== 1 ? "es" : ""} seleccionada
                  {selectedFiles.length !== 1 ? "s" : ""}
                </p>
                <p
                  className={`${isFull ? "text-xs" : "text-[10px]"} text-[#3d4a3d]`}
                >
                  {formatFileSize(getTotalSize())} total
                </p>
              </div>
              <Button
                size="icon-xs"
                variant="ghost"
                onClick={handleClear}
                disabled={isUploading}
                className="text-[#3d4a3d] hover:text-[#b7102a] shrink-0"
              >
                <Cancel01Icon className="size-4" />
              </Button>
            </div>

            <Button
              size={isFull ? "lg" : "sm"}
              className={`mt-4 w-full rounded-[2rem] ${isFull ? "text-base" : "text-xs"}`}
              onClick={handleUpload}
              disabled={isUploading}
            >
              <Upload01Icon
                className={`mr-2 ${isFull ? "size-5" : "size-3.5"}`}
              />
              {isUploading
                ? "Subiendo..."
                : isFull
                  ? "Subir Imágenes"
                  : "Subir"}
            </Button>
          </motion.div>
        )}
      </div>
    </Card>
  );
}
