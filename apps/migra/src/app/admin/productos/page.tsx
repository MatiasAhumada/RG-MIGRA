"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout";
import {
  PageHeader,
  DataTable,
  GenericModal,
  ConfirmModal,
  TableSkeleton,
  PdfUpload,
} from "@/components/common";
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
import {
  Add01Icon,
  PencilEdit01Icon,
  Delete02Icon,
  ViewIcon,
  ViewOffSlashIcon,
  Delete01Icon,
  CheckmarkCircle01Icon,
} from "hugeicons-react";
import { productoService, categoriaService, marcaService } from "@/services";
import {
  clientSuccessHandler,
  clientErrorHandler,
} from "@/utils/handlers/clientHandler";
import { formatCurrency } from "@/utils/formatters";
import type {
  ProductoWithRelations,
  CreateProductoDto,
  UpdateProductoDto,
} from "@/types/producto.types";
import type {
  MarcaWithCategorias,
  ProductFormData,
  ProductoVarianteFormData,
  ColorProducto,
} from "@/types";
import { COLORES_PRODUCTO } from "@/constants/producto.constant";

const INITIAL_FORM_DATA: ProductFormData = {
  name: "",
  sku: "",
  price: "",
  imgUrl: "",
  marcaId: "",
  categoriaId: "",
  subcategoriaId: "",
  variantes: [],
};

export default function AdminProductosPage() {
  const [productos, setProductos] = useState<ProductoWithRelations[]>([]);
  const [marcas, setMarcas] = useState<MarcaWithCategorias[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<ProductoWithRelations | null>(null);
  const [formData, setFormData] = useState<ProductFormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [productosData, marcasData] = await Promise.all([
        productoService.findAllWithDeleted(),
        marcaService.findAll(1),
      ]);
      setProductos(productosData);
      setMarcas(marcasData);
    } catch (error) {
      clientErrorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenCreateModal = () => {
    setFormData(INITIAL_FORM_DATA);
    setIsCreateModalOpen(true);
  };

  const handleUploadComplete = () => {
    loadData();
  };

  const handleOpenEditModal = (product: ProductoWithRelations) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      sku: product.sku,
      price: String(product.price),
      imgUrl: product.imgUrl || "",
      marcaId: String(product.marcaId),
      categoriaId: String(product.categoriaId),
      subcategoriaId: product.subcategoriaId
        ? String(product.subcategoriaId)
        : "",
      variantes: product.variantes.map((v) => ({
        color: v.color || "",
        talle: v.talle ? String(v.talle) : "",
      })),
    });
    setIsEditModalOpen(true);
  };

  const handleOpenDeleteModal = (product: ProductoWithRelations) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleCreateProduct = async () => {
    if (
      !formData.name ||
      !formData.sku ||
      !formData.price ||
      !formData.marcaId ||
      !formData.categoriaId
    ) {
      clientErrorHandler(new Error("Todos los campos son obligatorios"));
      return;
    }

    if (formData.variantes.length === 0) {
      clientErrorHandler(new Error("Debe agregar al menos una variante"));
      return;
    }

    const hasInvalidVariante = formData.variantes.some(
      (v) => !v.color && !v.talle,
    );

    if (hasInvalidVariante) {
      clientErrorHandler(
        new Error("Cada variante debe tener al menos color o talle"),
      );
      return;
    }

    try {
      setIsSubmitting(true);
      const dto: CreateProductoDto = {
        name: formData.name,
        sku: formData.sku,
        price: Number(formData.price),
        imgUrl: formData.imgUrl || undefined,
        empresaId: 1,
        categoriaId: Number(formData.categoriaId),
        subcategoriaId: formData.subcategoriaId
          ? Number(formData.subcategoriaId)
          : undefined,
        marcaId: Number(formData.marcaId),
        variantes: formData.variantes.map((v) => ({
          color: v.color ? (v.color as ColorProducto) : undefined,
          talle: v.talle ? Number(v.talle) : undefined,
        })),
      };

      await productoService.create(dto);
      clientSuccessHandler("Producto creado exitosamente");
      setIsCreateModalOpen(false);
      await loadData();
    } catch (error) {
      clientErrorHandler(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditProduct = async () => {
    if (!selectedProduct) return;

    if (
      !formData.name ||
      !formData.sku ||
      !formData.price ||
      !formData.marcaId ||
      !formData.categoriaId
    ) {
      clientErrorHandler(new Error("Todos los campos son obligatorios"));
      return;
    }

    try {
      setIsSubmitting(true);
      const dto: UpdateProductoDto = {
        name: formData.name,
        sku: formData.sku,
        price: Number(formData.price),
        imgUrl: formData.imgUrl || undefined,
        categoriaId: Number(formData.categoriaId),
        subcategoriaId: formData.subcategoriaId
          ? Number(formData.subcategoriaId)
          : undefined,
        marcaId: Number(formData.marcaId),
      };

      await productoService.update(selectedProduct.id, dto);
      clientSuccessHandler("Producto actualizado exitosamente");
      setIsEditModalOpen(false);
      await loadData();
    } catch (error) {
      clientErrorHandler(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;

    try {
      setIsSubmitting(true);
      await productoService.delete(selectedProduct.id);
      clientSuccessHandler("Producto eliminado exitosamente");
      setIsDeleteModalOpen(false);
      await loadData();
    } catch (error) {
      clientErrorHandler(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRestoreProduct = async (product: ProductoWithRelations) => {
    try {
      setIsRefreshing(true);
      await productoService.restore(product.id);
      clientSuccessHandler("Producto restaurado exitosamente");
      await loadData();
    } catch (error) {
      clientErrorHandler(error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleToggleSinStock = async (product: ProductoWithRelations) => {
    try {
      setIsRefreshing(true);
      await productoService.toggleSinStock(product.id, !product.sinStock);
      clientSuccessHandler(
        product.sinStock
          ? "Producto marcado como disponible"
          : "Producto marcado sin stock",
      );
      await loadData();
    } catch (error) {
      clientErrorHandler(error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleAddVariante = () => {
    setFormData({
      ...formData,
      variantes: [...formData.variantes, { color: "", talle: "" }],
    });
  };

  const handleRemoveVariante = (index: number) => {
    setFormData({
      ...formData,
      variantes: formData.variantes.filter((_, i) => i !== index),
    });
  };

  const handleVarianteChange = (
    index: number,
    field: keyof ProductoVarianteFormData,
    value: string,
  ) => {
    const newVariantes = [...formData.variantes];
    newVariantes[index] = { ...newVariantes[index], [field]: value };
    setFormData({ ...formData, variantes: newVariantes });
  };

  const selectedMarca = marcas.find((m) => m.id === Number(formData.marcaId));
  const categorias = selectedMarca?.categorias || [];
  const selectedCategoria = categorias.find(
    (c) => c.id === Number(formData.categoriaId),
  );
  const subcategorias = selectedCategoria?.subcategorias || [];

  const renderForm = () => (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label>Nombre</Label>
          <Input
            placeholder="Nombre del producto"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>SKU</Label>
          <Input
            placeholder="Código SKU"
            value={formData.sku}
            onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
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
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="w-full"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Marca</Label>
        <Select
          value={formData.marcaId}
          onValueChange={(value) =>
            setFormData({
              ...formData,
              marcaId: value,
              categoriaId: "",
              subcategoriaId: "",
            })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Seleccionar marca" />
          </SelectTrigger>
          <SelectContent>
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
            setFormData({ ...formData, categoriaId: value, subcategoriaId: "" })
          }
          disabled={!formData.marcaId}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Seleccionar categoría" />
          </SelectTrigger>
          <SelectContent>
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
            setFormData({ ...formData, subcategoriaId: value })
          }
          disabled={!formData.categoriaId || subcategorias.length === 0}
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
          <SelectContent>
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
          onChange={(e) => setFormData({ ...formData, imgUrl: e.target.value })}
          className="w-full"
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Label>Variantes (Color y Talle)</Label>
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
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccionar color" />
                    </SelectTrigger>
                    <SelectContent>
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
                    className="w-full"
                  />
                </div>

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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <AppLayout variant="admin">
      <PageHeader
        title="Gestión de Productos"
        description="Administración del catálogo de productos"
        action={
          <Button size="lg" onClick={handleOpenCreateModal} className="gap-2">
            <Add01Icon className="size-5" />
            <span className="hidden sm:inline">Nuevo Producto</span>
            <span className="sm:hidden">Nuevo</span>
          </Button>
        }
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="mt-8"
      >
        <PdfUpload
          onUploadComplete={handleUploadComplete}
          variant="full"
          empresaId={1}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="mt-8"
      >
        <DataTable<ProductoWithRelations>
          title="Productos"
          getRowClassName={(item) =>
            item.deletedAt ? "bg-gray-100/60 opacity-70" : ""
          }
          columns={[
            {
              key: "sku",
              label: "SKU",
              className: "text-center",
              render: (item) => (
                <span className="font-mono text-sm font-semibold text-[#2b6485]">
                  {item.sku}
                </span>
              ),
            },
            {
              key: "name",
              label: "Nombre",
              className: "text-center",
              render: (item) => (
                <p className="text-sm font-medium text-[#161d16]">
                  {item.name}
                </p>
              ),
            },
            {
              key: "marca",
              label: "Marca",
              className: "text-center",
              render: (item) => (
                <p className="text-sm text-[#3d4a3d]">{item.marca.name}</p>
              ),
            },
            {
              key: "categoria",
              label: "Categoría",
              className: "text-center",
              render: (item) => (
                <p className="text-sm text-[#3d4a3d]">{item.categoria.name}</p>
              ),
            },
            {
              key: "price",
              label: "Precio",
              className: "text-center",
              render: (item) => (
                <p className="text-sm font-semibold text-[#161d16]">
                  {formatCurrency(item.price)}
                </p>
              ),
            },
            {
              key: "sinStock",
              label: "Stock",
              className: "text-center",
              render: (item) => (
                <div className="flex justify-center">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                      item.sinStock
                        ? "bg-[#b7102a]/15 text-[#b7102a]"
                        : "bg-[#7cb56e]/15 text-[#5a9a4e]"
                    }`}
                  >
                    {item.sinStock ? "Sin Stock" : "Disponible"}
                  </span>
                </div>
              ),
            },
            {
              key: "actions",
              label: "Acciones",
              className: "text-center",
              render: (item) => {
                const isDeleted = !!item.deletedAt;

                if (isDeleted) {
                  return (
                    <div className="flex items-center justify-center">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => handleRestoreProduct(item)}
                        title="Reactivar producto"
                        className="text-green-600 hover:text-green-700"
                      >
                        <CheckmarkCircle01Icon className="size-4" />
                      </Button>
                    </div>
                  );
                }

                return (
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => handleToggleSinStock(item)}
                      title={
                        item.sinStock ? "Marcar disponible" : "Marcar sin stock"
                      }
                    >
                      {item.sinStock ? (
                        <ViewOffSlashIcon className="size-4" />
                      ) : (
                        <ViewIcon className="size-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => handleOpenEditModal(item)}
                    >
                      <PencilEdit01Icon className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => handleOpenDeleteModal(item)}
                    >
                      <Delete02Icon className="size-4" />
                    </Button>
                  </div>
                );
              },
            },
          ]}
          data={productos}
          keyExtractor={(item) => String(item.id)}
          loading={isLoading || isRefreshing}
          emptyMessage="No hay productos registrados"
          totalLabel={`${productos.length} productos`}
        />
      </motion.div>

      <GenericModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        title="Crear Producto"
        description="Ingresá los datos del nuevo producto"
        size="lg"
        footer={
          <>
            <Button
              variant="outline"
              onClick={() => setIsCreateModalOpen(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button onClick={handleCreateProduct} disabled={isSubmitting}>
              {isSubmitting ? "Creando..." : "Crear Producto"}
            </Button>
          </>
        }
      >
        {renderForm()}
      </GenericModal>

      <GenericModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        title="Editar Producto"
        description="Modificá los datos del producto"
        size="lg"
        footer={
          <>
            <Button
              variant="outline"
              onClick={() => setIsEditModalOpen(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button onClick={handleEditProduct} disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </>
        }
      >
        {renderForm()}
      </GenericModal>

      <ConfirmModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        title="Eliminar Producto"
        description={`¿Estás seguro de eliminar el producto "${selectedProduct?.name}"?`}
        onConfirm={handleDeleteProduct}
        variant="destructive"
        loading={isSubmitting}
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </AppLayout>
  );
}
