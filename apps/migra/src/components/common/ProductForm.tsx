"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Add01Icon, Delete01Icon } from "hugeicons-react";
import { COLORES_PRODUCTO } from "@/constants/producto.constant";
import type {
  MarcaWithCategorias,
  ProductFormData,
  ProductoVarianteFormData,
} from "@/types";

interface ProductFormProps {
  formData: ProductFormData;
  marcas: MarcaWithCategorias[];
  onFormDataChange: (data: ProductFormData) => void;
  disabled?: boolean;
}

export function ProductForm({
  formData,
  marcas,
  onFormDataChange,
  disabled = false,
}: ProductFormProps) {
  const selectedMarca = marcas.find((m) => m.id === Number(formData.marcaId));
  const categorias = selectedMarca?.categorias || [];
  const selectedCategoria = categorias.find(
    (c) => c.id === Number(formData.categoriaId),
  );
  const subcategorias = selectedCategoria?.subcategorias || [];

  const handleAddVariante = () => {
    if (disabled) return;
    onFormDataChange({
      ...formData,
      variantes: [...formData.variantes, { color: "", talle: "" }],
    });
  };

  const handleRemoveVariante = (index: number) => {
    if (disabled) return;
    onFormDataChange({
      ...formData,
      variantes: formData.variantes.filter((_, i) => i !== index),
    });
  };

  const handleVarianteChange = (
    index: number,
    field: keyof ProductoVarianteFormData,
    value: string,
  ) => {
    if (disabled) return;
    const newVariantes = [...formData.variantes];
    newVariantes[index] = { ...newVariantes[index], [field]: value };
    onFormDataChange({ ...formData, variantes: newVariantes });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label>Nombre</Label>
          <Input
            placeholder="Nombre del producto"
            value={formData.name}
            onChange={(e) =>
              onFormDataChange({ ...formData, name: e.target.value })
            }
            disabled={disabled}
            className="w-full"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>SKU</Label>
          <Input
            placeholder="Código SKU"
            value={formData.sku}
            onChange={(e) =>
              onFormDataChange({ ...formData, sku: e.target.value })
            }
            disabled={disabled}
            className="w-full"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label>Precio</Label>
        <Input
          type="number"
          placeholder="0.00"
          value={formData.price}
          onChange={(e) =>
            onFormDataChange({ ...formData, price: e.target.value })
          }
          disabled={disabled}
          className="w-full"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Marca</Label>
        <Select
          value={formData.marcaId}
          onValueChange={(value) =>
            onFormDataChange({
              ...formData,
              marcaId: value,
              categoriaId: "",
              subcategoriaId: "",
            })
          }
          disabled={disabled}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Seleccionar marca" />
          </SelectTrigger>
          <SelectContent position="popper">
            {marcas.map((marca) => (
              <SelectItem key={marca.id} value={String(marca.id)}>
                {marca.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label>Categoría</Label>
        <Select
          value={formData.categoriaId}
          onValueChange={(value) =>
            onFormDataChange({
              ...formData,
              categoriaId: value,
              subcategoriaId: "",
            })
          }
          disabled={disabled || !formData.marcaId}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Seleccionar categoría" />
          </SelectTrigger>
          <SelectContent position="popper">
            {categorias.map((categoria) => (
              <SelectItem key={categoria.id} value={String(categoria.id)}>
                {categoria.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label>
          Subcategoría {subcategorias.length === 0 && "(No disponible)"}
        </Label>
        <Select
          value={formData.subcategoriaId}
          onValueChange={(value) =>
            onFormDataChange({ ...formData, subcategoriaId: value })
          }
          disabled={
            disabled || !formData.categoriaId || subcategorias.length === 0
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue
              placeholder={
                subcategorias.length === 0
                  ? "Sin subcategorías"
                  : "Seleccionar subcategoría"
              }
            />
          </SelectTrigger>
          <SelectContent position="popper">
            {subcategorias.map((subcategoria) => (
              <SelectItem key={subcategoria.id} value={String(subcategoria.id)}>
                {subcategoria.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label>URL de Imagen (opcional)</Label>
        <Input
          placeholder="https://..."
          value={formData.imgUrl}
          onChange={(e) =>
            onFormDataChange({ ...formData, imgUrl: e.target.value })
          }
          disabled={disabled}
          className="w-full"
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Label>Variantes (Color y Talle) - Opcional</Label>
          {!disabled && (
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={handleAddVariante}
              className="gap-2"
            >
              <Add01Icon className="size-4" />
              Agregar Variante
            </Button>
          )}
        </div>

        {formData.variantes.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No hay variantes agregadas
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {formData.variantes.map((variante, index) => (
              <div
                key={index}
                className="grid grid-cols-1 gap-3 rounded-lg border p-3 sm:grid-cols-[1fr_1fr_auto]"
              >
                <div className="flex flex-col gap-1">
                  <Label className="text-xs">Color (opcional)</Label>
                  <Select
                    value={variante.color}
                    onValueChange={(value) =>
                      handleVarianteChange(index, "color", value)
                    }
                    disabled={disabled}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccionar color" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {COLORES_PRODUCTO.map((color) => (
                        <SelectItem key={color.value} value={color.value}>
                          {color.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-1">
                  <Label className="text-xs">Talle (opcional)</Label>
                  <Input
                    type="number"
                    placeholder="Ej: 1, 2, 3..."
                    value={variante.talle}
                    onChange={(e) =>
                      handleVarianteChange(index, "talle", e.target.value)
                    }
                    disabled={disabled}
                    className="w-full"
                  />
                </div>

                {!disabled && (
                  <div className="flex items-end">
                    <Button
                      type="button"
                      size="icon-sm"
                      variant="ghost"
                      onClick={() => handleRemoveVariante(index)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Delete01Icon className="size-4" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
