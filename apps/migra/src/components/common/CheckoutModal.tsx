"use client";

import { useState, useEffect } from "react";
import { GenericModal } from "@/components/common/GenericModal";
import { AddressModal } from "@/components/common/AddressModal";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Add01Icon } from "hugeicons-react";
import { useCart } from "@/context/cart-context";
import { formatCurrency } from "@/utils/formatters";
import { addressService, pedidoService } from "@/services";
import {
  clientErrorHandler,
  clientSuccessHandler,
} from "@/utils/handlers/clientHandler";
import {
  CHECKOUT_MESSAGES,
  DELIVERY_METHOD,
  PICKUP_ADDRESS,
  type DeliveryMethod,
} from "@/constants/checkout.constant";
import type { Address, CreateAddressDto } from "@/types/address.types";
import type { CreateDetallePedidoDto } from "@/types/pedido.types";

interface CheckoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clienteId: number;
}

export function CheckoutModal({
  open,
  onOpenChange,
  clienteId,
}: CheckoutModalProps) {
  const { items, total, clearCart } = useCart();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>(
    DELIVERY_METHOD.DELIVERY,
  );
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [observaciones, setObservaciones] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(false);

  const isDelivery = deliveryMethod === DELIVERY_METHOD.DELIVERY;
  const hasAddresses = addresses.length > 0;

  useEffect(() => {
    if (open && clienteId) {
      loadAddresses();
    }
  }, [open, clienteId]);

  const loadAddresses = async () => {
    setIsLoadingAddresses(true);
    try {
      const data = await addressService.findByClienteId(clienteId);
      setAddresses(data);
    } catch (error) {
      clientErrorHandler(error);
    } finally {
      setIsLoadingAddresses(false);
    }
  };

  const handleAddAddress = () => {
    setIsAddressModalOpen(true);
  };

  const handleSaveAddress = async (
    addressData: Omit<CreateAddressDto, "clienteId">,
  ) => {
    try {
      const newAddress = await addressService.create({
        ...addressData,
        clienteId,
      });

      setAddresses((prev) => [...prev, newAddress]);
      setSelectedAddressId(String(newAddress.id));
      clientSuccessHandler("Dirección agregada exitosamente");
    } catch (error) {
      clientErrorHandler(error);
      throw error;
    }
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);

    try {
      const detalles: CreateDetallePedidoDto[] = items.map((item) => ({
        productoId: item.productoId,
        cantidad: item.cantidad,
        total: item.subtotal,
        color: item.color,
        talle: item.talle,
        varianteSku: item.varianteSku,
      }));

      let direccionId: number;

      if (isDelivery) {
        direccionId = Number(selectedAddressId);
      } else {
        const pickupAddress = await addressService.create({
          clienteId,
          provincia: PICKUP_ADDRESS.PROVINCIA,
          localidad: PICKUP_ADDRESS.LOCALIDAD,
          direccion: PICKUP_ADDRESS.DIRECCION,
          codPostal: PICKUP_ADDRESS.COD_POSTAL,
        });
        direccionId = pickupAddress.id;
      }

      await pedidoService.create({
        clienteId,
        direccionId,
        totalPedido: total,
        detalles,
        observaciones: observaciones || undefined,
      });

      clientSuccessHandler(CHECKOUT_MESSAGES.SUCCESS_MESSAGE);
      clearCart();
      onOpenChange(false);
      setObservaciones("");
      setSelectedAddressId("");
    } catch (error) {
      clientErrorHandler(error, undefined, {
        showToast: true,
        messagePrefix: CHECKOUT_MESSAGES.ERROR_MESSAGE,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit = isDelivery ? selectedAddressId : true;

  return (
    <>
      <GenericModal
        open={open}
        onOpenChange={onOpenChange}
        title={CHECKOUT_MESSAGES.TITLE}
        size="2xl"
      >
        <div className="space-y-6">
          <div>
            <Label className="mb-3 block text-sm font-semibold">
              {CHECKOUT_MESSAGES.DELIVERY_METHOD_LABEL}
            </Label>
            <RadioGroup
              value={deliveryMethod}
              onValueChange={(value) =>
                setDeliveryMethod(value as DeliveryMethod)
              }
              className="grid grid-cols-2 gap-4"
            >
              <div>
                <RadioGroupItem
                  value={DELIVERY_METHOD.DELIVERY}
                  id="delivery"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="delivery"
                  className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-gray-200 p-4 hover:bg-gray-50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                >
                  <span className="text-sm font-semibold">
                    {CHECKOUT_MESSAGES.DELIVERY_OPTION}
                  </span>
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value={DELIVERY_METHOD.PICKUP}
                  id="pickup"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="pickup"
                  className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-gray-200 p-4 hover:bg-gray-50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                >
                  <span className="text-sm font-semibold">
                    {CHECKOUT_MESSAGES.PICKUP_OPTION}
                  </span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {isDelivery ? (
            <div>
              <Label className="mb-2 block text-sm font-semibold">
                {CHECKOUT_MESSAGES.ADDRESS_LABEL}
              </Label>
              {isLoadingAddresses ? (
                <div className="flex items-center justify-center py-4">
                  <span className="size-5 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
                </div>
              ) : hasAddresses ? (
                <div className="space-y-2">
                  <Select
                    value={selectedAddressId}
                    onValueChange={setSelectedAddressId}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          CHECKOUT_MESSAGES.SELECT_ADDRESS_PLACEHOLDER
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {addresses.map((address) => (
                        <SelectItem key={address.id} value={String(address.id)}>
                          {address.direccion} - {address.localidad},{" "}
                          {address.provincia}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAddAddress}
                    className="w-full"
                  >
                    <Add01Icon className="mr-2 size-4" />
                    {CHECKOUT_MESSAGES.ADD_ADDRESS_BUTTON}
                  </Button>
                </div>
              ) : (
                <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center">
                  <p className="mb-3 text-sm text-on-surface-variant">
                    {CHECKOUT_MESSAGES.NO_ADDRESSES}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAddAddress}
                    className="mx-auto"
                  >
                    <Add01Icon className="mr-2 size-4" />
                    {CHECKOUT_MESSAGES.ADD_FIRST_ADDRESS_BUTTON}
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <Label className="mb-2 block text-sm font-semibold">
                {CHECKOUT_MESSAGES.PICKUP_ADDRESS_LABEL}
              </Label>
              <p className="text-sm text-on-surface">
                {PICKUP_ADDRESS.DIRECCION}
                <br />
                {PICKUP_ADDRESS.LOCALIDAD}, {PICKUP_ADDRESS.PROVINCIA}
                <br />
                CP: {PICKUP_ADDRESS.COD_POSTAL}
              </p>
            </div>
          )}

          <div>
            <Label className="mb-2 block text-sm font-semibold">
              {CHECKOUT_MESSAGES.OBSERVATIONS_LABEL}
            </Label>
            <Textarea
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              placeholder={CHECKOUT_MESSAGES.OBSERVATIONS_PLACEHOLDER}
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <h3 className="mb-3 text-sm font-semibold">
              {CHECKOUT_MESSAGES.ORDER_SUMMARY_TITLE}
            </h3>
            <div className="space-y-2">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-on-surface-variant">
                    {item.productoName} x{item.cantidad}
                  </span>
                  <span className="font-semibold">
                    {formatCurrency(item.subtotal)}
                  </span>
                </div>
              ))}
              <div className="border-t border-gray-300 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold">
                    {CHECKOUT_MESSAGES.TOTAL_LABEL}
                  </span>
                  <span className="text-xl font-bold text-primary">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
              className="flex-1"
            >
              {CHECKOUT_MESSAGES.CANCEL_BUTTON}
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={!canSubmit || isSubmitting}
              className="flex-1 gradient-primary text-white"
            >
              {isSubmitting
                ? CHECKOUT_MESSAGES.CONFIRMING_BUTTON
                : CHECKOUT_MESSAGES.CONFIRM_BUTTON}
            </Button>
          </div>
        </div>
      </GenericModal>

      <AddressModal
        open={isAddressModalOpen}
        onOpenChange={setIsAddressModalOpen}
        onSave={handleSaveAddress}
        clienteId={clienteId}
      />
    </>
  );
}
