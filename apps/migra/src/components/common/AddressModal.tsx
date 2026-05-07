"use client";

import { useState } from "react";
import { GenericModal } from "@/components/common/GenericModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ADDRESS_FORM } from "@/constants/address.constant";
import type { CreateAddressDto } from "@/types/address.types";

interface AddressModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (address: Omit<CreateAddressDto, "clienteId">) => void;
  clienteId: number;
}

export function AddressModal({
  open,
  onOpenChange,
  onSave,
  clienteId,
}: AddressModalProps) {
  const [formData, setFormData] = useState({
    provincia: "",
    localidad: "",
    direccion: "",
    codPostal: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.provincia.trim()) {
      newErrors.provincia = ADDRESS_FORM.REQUIRED_FIELD;
    }
    if (!formData.localidad.trim()) {
      newErrors.localidad = ADDRESS_FORM.REQUIRED_FIELD;
    }
    if (!formData.direccion.trim()) {
      newErrors.direccion = ADDRESS_FORM.REQUIRED_FIELD;
    }
    if (!formData.codPostal.trim()) {
      newErrors.codPostal = ADDRESS_FORM.REQUIRED_FIELD;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      await onSave(formData);
      setFormData({
        provincia: "",
        localidad: "",
        direccion: "",
        codPostal: "",
      });
      onOpenChange(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      provincia: "",
      localidad: "",
      direccion: "",
      codPostal: "",
    });
    setErrors({});
    onOpenChange(false);
  };

  return (
    <GenericModal
      open={open}
      onOpenChange={onOpenChange}
      title={ADDRESS_FORM.TITLE}
      size="md"
    >
      <div className="space-y-4">
        <div>
          <Label
            htmlFor="provincia"
            className="mb-2 block text-sm font-semibold"
          >
            {ADDRESS_FORM.PROVINCIA_LABEL}
          </Label>
          <Input
            id="provincia"
            value={formData.provincia}
            onChange={(e) => handleChange("provincia", e.target.value)}
            placeholder={ADDRESS_FORM.PROVINCIA_PLACEHOLDER}
            className={errors.provincia ? "border-red-500" : ""}
          />
          {errors.provincia && (
            <p className="mt-1 text-xs text-red-500">{errors.provincia}</p>
          )}
        </div>

        <div>
          <Label
            htmlFor="localidad"
            className="mb-2 block text-sm font-semibold"
          >
            {ADDRESS_FORM.LOCALIDAD_LABEL}
          </Label>
          <Input
            id="localidad"
            value={formData.localidad}
            onChange={(e) => handleChange("localidad", e.target.value)}
            placeholder={ADDRESS_FORM.LOCALIDAD_PLACEHOLDER}
            className={errors.localidad ? "border-red-500" : ""}
          />
          {errors.localidad && (
            <p className="mt-1 text-xs text-red-500">{errors.localidad}</p>
          )}
        </div>

        <div>
          <Label
            htmlFor="direccion"
            className="mb-2 block text-sm font-semibold"
          >
            {ADDRESS_FORM.DIRECCION_LABEL}
          </Label>
          <Input
            id="direccion"
            value={formData.direccion}
            onChange={(e) => handleChange("direccion", e.target.value)}
            placeholder={ADDRESS_FORM.DIRECCION_PLACEHOLDER}
            className={errors.direccion ? "border-red-500" : ""}
          />
          {errors.direccion && (
            <p className="mt-1 text-xs text-red-500">{errors.direccion}</p>
          )}
        </div>

        <div>
          <Label
            htmlFor="codPostal"
            className="mb-2 block text-sm font-semibold"
          >
            {ADDRESS_FORM.COD_POSTAL_LABEL}
          </Label>
          <Input
            id="codPostal"
            value={formData.codPostal}
            onChange={(e) => handleChange("codPostal", e.target.value)}
            placeholder={ADDRESS_FORM.COD_POSTAL_PLACEHOLDER}
            className={errors.codPostal ? "border-red-500" : ""}
          />
          {errors.codPostal && (
            <p className="mt-1 text-xs text-red-500">{errors.codPostal}</p>
          )}
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="flex-1"
          >
            {ADDRESS_FORM.CANCEL_BUTTON}
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 gradient-primary text-white"
          >
            {isSubmitting
              ? ADDRESS_FORM.SAVING_BUTTON
              : ADDRESS_FORM.SAVE_BUTTON}
          </Button>
        </div>
      </div>
    </GenericModal>
  );
}
