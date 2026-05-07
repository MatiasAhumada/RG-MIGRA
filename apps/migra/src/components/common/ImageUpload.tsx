"use client";

import { useState, useRef, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Image02Icon, Upload01Icon, Cancel01Icon } from "hugeicons-react";
import { clientErrorHandler } from "@/utils/handlers/clientHandler";
import { IMAGE_UPLOAD_CONFIG, IMAGE_UPLOAD_MESSAGES } from "@/constants/image-upload.constant";

interface ImageUploadProps {
  value?: string;
  onChange: (file: File | null, previewUrl?: string) => void;
  disabled?: boolean;
  label?: string;
}

const IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/jfif",
];

export function ImageUpload({
  value,
  onChange,
  disabled = false,
  label = "Imagen",
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | undefined>(value);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File | null) => {
    if (!file) {
      setSelectedFile(null);
      setPreview(value);
      onChange(null);
      return;
    }

    const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`;
    
    if (!IMAGE_UPLOAD_CONFIG.SUPPORTED_EXTENSIONS.includes(fileExtension)) {
      clientErrorHandler(new Error(IMAGE_UPLOAD_MESSAGES.UNSUPPORTED_FORMAT));
      return;
    }

    if (file.size > IMAGE_UPLOAD_CONFIG.MAX_FILE_SIZE) {
      clientErrorHandler(new Error(IMAGE_UPLOAD_MESSAGES.FILE_TOO_LARGE));
      return;
    }

    setSelectedFile(file);
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    onChange(file, previewUrl);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFileSelect(file);
  };

  const handleClear = () => {
    setSelectedFile(null);
    setPreview(value);
    onChange(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Input
          ref={fileInputRef}
          type="file"
          accept=".jfif,.jpg,.jpeg,.png,.webp"
          onChange={handleInputChange}
          disabled={disabled}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
          className="gap-2"
        >
          <Upload01Icon className="size-4" />
          {selectedFile ? "Cambiar" : "Subir"} {label}
        </Button>
        {selectedFile && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClear}
            disabled={disabled}
          >
            <Cancel01Icon className="size-4" />
          </Button>
        )}
      </div>
      {preview && (
        <div className="relative h-32 w-32 overflow-hidden rounded-lg border">
          <img
            src={preview}
            alt="Preview"
            className="h-full w-full object-cover"
          />
        </div>
      )}
      {!preview && !selectedFile && (
        <div className="flex h-32 w-32 items-center justify-center rounded-lg border border-dashed">
          <Image02Icon className="size-8 text-muted-foreground" />
        </div>
      )}
    </div>
  );
}
