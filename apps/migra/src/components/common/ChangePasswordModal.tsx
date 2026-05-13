"use client";

import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import { authService } from "@/services";
import {
  clientErrorHandler,
  clientSuccessHandler,
} from "@/utils/handlers/clientHandler";
import { GenericModal } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ChangePasswordModal() {
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      clientErrorHandler(new Error("Las contraseñas no coinciden"));
      return;
    }

    if (newPassword.length < 8) {
      clientErrorHandler(
        new Error("La contraseña debe tener al menos 8 caracteres"),
      );
      return;
    }

    setIsLoading(true);
    try {
      await authService.changePassword({ currentPassword, newPassword });
      clientSuccessHandler("Contraseña actualizada exitosamente");
      window.location.reload();
    } catch (error) {
      clientErrorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user?.mustChangePassword) return null;

  return (
    <GenericModal
      open={true}
      onOpenChange={() => {}}
      title="Cambio de Contraseña Obligatorio"
      description="Por seguridad, debes cambiar tu contraseña temporal antes de continuar"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="currentPassword">Contraseña Actual</Label>
          <Input
            id="currentPassword"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="newPassword">Nueva Contraseña</Label>
          <Input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength={8}
            disabled={isLoading}
          />
          <p className="text-xs text-muted-foreground">Mínimo 8 caracteres</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirmar Nueva Contraseña</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={8}
            disabled={isLoading}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Actualizando..." : "Cambiar Contraseña"}
        </Button>
      </form>
    </GenericModal>
  );
}
