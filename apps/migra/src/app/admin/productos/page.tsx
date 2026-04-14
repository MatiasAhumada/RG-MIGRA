"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout";
import { PageHeader, DataTable, PdfUpload } from "@/components/common";
import { Button } from "@/components/ui/button";
import { GenericModal, ConfirmModal } from "@/components/common";
import { Add01Icon, Edit02Icon, Delete01Icon, Refresh01Icon, PackageAdd01Icon, PackageOutOfStockIcon } from "hugeicons-react";
import { productoService } from "@/services";
import { formatCurrency } from "@/utils/formatters";
import { clientSuccessHandler, clientErrorHandler } from "@/utils/handlers/clientHandler";
import { useDataQuery } from "@/hooks/useDataQuery";
import type { ProductoWithRelations, CreateProductoDto, UpdateProductoDto } from "@/types/producto.types";

export default function AdminProductosPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editProducto, setEditProducto] = useState<ProductoWithRelations | null>(null);
  const [deleteProducto, setDeleteProducto] = useState<ProductoWithRelations | null>(null);

  const { data: productos, isLoading, refetch } = useDataQuery<ProductoWithRelations[]>({
    fetcher: () => productoService.findAll(debouncedSearch),
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    const timeout = setTimeout(() => {
      setDebouncedSearch(value);
    }, 500);

    return () => clearTimeout(timeout);
  };

  const handleCreateProduct = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      clientSuccessHandler("Producto creado y agregado al catálogo exitosamente.");

      setIsCreateOpen(false);
    } catch (error) {
      clientErrorHandler(error);
    }
  };

  const handleEditProduct = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      clientSuccessHandler(
        `Producto "${editProducto?.name}" actualizado correctamente.`,
      );

      setEditProducto(null);
    } catch (error) {
      clientErrorHandler(error);
    }
  };

  const handleToggleStock = async (item: ProductoWithRelations) => {
    try {
      await productoService.toggleSinStock(item.id, !item.sinStock);

      clientSuccessHandler(
        item.sinStock
          ? `Producto "${item.name}" marcado como disponible.`
          : `Producto "${item.name}" marcado como sin stock.`,
      );

      refetch();
    } catch (error) {
      clientErrorHandler(error);
    }
  };

  const handleDeleteProduct = async () => {
    if (!deleteProducto) return;
    try {
      await productoService.delete(deleteProducto.id);

      clientSuccessHandler(
        `Producto "${deleteProducto.name}" eliminado del catálogo.`,
      );

      setDeleteProducto(null);
      refetch();
    } catch (error) {
      clientErrorHandler(error);
    }
  };

  const handleUploadComplete = (fileName: string) => {
    clientSuccessHandler(
      `Catálogo "${fileName}" importado.\nProductos actualizados en el catálogo.`,
    );
    refetch();
  };

  const filteredProducts = (productos || []).filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <AppLayout variant="admin">
      <PageHeader
        title="Productos"
        description="Gestión del catálogo de productos"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="mt-8"
      >
        <PdfUpload onUploadComplete={handleUploadComplete} variant="full" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="mt-8"
      >
        <DataTable<ProductoWithRelations>
          title=""
          subtitle=""
          columns={[
            {
              key: "name",
              label: "Producto",
              render: (item) => (
                <div className="flex items-center gap-3">
                  {item.imgUrl && (
                    <div className="size-10 shrink-0 overflow-hidden rounded-xl bg-[#f3fcf0]/60">
                      <img
                        src={item.imgUrl}
                        alt={item.name}
                        className="size-full object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <p
                      className="text-sm font-semibold text-[#161d16]"
                      style={{ fontFamily: "'Manrope', 'Inter', system-ui, sans-serif" }}
                    >
                      {item.name}
                    </p>
                    <p className="text-xs text-[#3d4a3d]">{item.categoria.name}</p>
                  </div>
                </div>
              ),
            },
            {
              key: "sku",
              label: "SKU",
              render: (item) => (
                <p className="text-sm font-mono text-[#3d4a3d]">{item.sku}</p>
              ),
            },
            {
              key: "price",
              label: "Precio",
              render: (item) => (
                <p
                  className="text-sm font-semibold text-[#161d16]"
                  style={{ fontFamily: "'Manrope', 'Inter', system-ui, sans-serif" }}
                >
                  {formatCurrency(item.price)}
                </p>
              ),
            },
            {
              key: "marca",
              label: "Marca",
              render: (item) => (
                <p className="text-sm text-[#3d4a3d]">{item.marca.name}</p>
              ),
            },
            {
              key: "actions",
              label: "Acciones",
              render: (item) => (
                <div className="flex items-center gap-1.5">
                  <Button
                    size="icon-xs"
                    variant="outline"
                    onClick={() => setEditProducto(item)}
                    title="Editar"
                  >
                    <Edit02Icon className="size-3" />
                  </Button>
                  <Button
                    size="icon-xs"
                    variant="outline"
                    className={item.sinStock ? "text-[#5a9a4e] hover:bg-[#5a9a4e]/10" : "text-[#e6a700] hover:bg-[#e6a700]/10"}
                    onClick={() => handleToggleStock(item)}
                    title={item.sinStock ? "Marcar disponible" : "Marcar sin stock"}
                  >
                    {item.sinStock ? (
                      <PackageAdd01Icon className="size-3" />
                    ) : (
                      <PackageOutOfStockIcon className="size-3" />
                    )}
                  </Button>
                  <Button
                    size="icon-xs"
                    variant="outline"
                    className="text-[#db313f] hover:bg-[#db313f]/10"
                    onClick={() => setDeleteProducto(item)}
                    title="Eliminar"
                  >
                    <Delete01Icon className="size-3" />
                  </Button>
                </div>
              ),
            },
          ]}
          data={isLoading ? [] : filteredProducts}
          keyExtractor={(item) => String(item.id)}
          emptyMessage="No se encontraron productos"
          searchPlaceholder="Buscar producto..."
          onSearch={handleSearchChange}
          actions={
            <div className="flex gap-2">
              <Button
                onClick={() => setIsCreateOpen(true)}
                className="gap-2 rounded-[2rem]"
              >
                <Add01Icon className="size-5" />
                Nuevo Producto
              </Button>
              <Button
                size="icon-sm"
                variant="ghost"
                className="rounded-full"
                onClick={refetch}
                disabled={isLoading}
                title="Actualizar ahora"
              >
                <Refresh01Icon className={`size-4 ${isLoading ? "animate-spin" : ""}`} />
              </Button>
            </div>
          }
          totalLabel={`${filteredProducts.length} productos`}
        />
      </motion.div>

      <GenericModal
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        title="Nuevo Producto"
        description="Completá los datos para agregar un producto al catálogo"
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateProduct}>
              Guardar Producto
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label
              className="text-sm font-semibold text-[#161d16]"
              style={{ fontFamily: "'Manrope', 'Inter', system-ui, sans-serif" }}
            >
              Nombre del Producto
            </label>
            <Input
              placeholder="Ej: Pack Pañales Premium Talle M"
              className="h-12 text-base"
            />
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label
                className="text-sm font-semibold text-[#161d16]"
                style={{ fontFamily: "'Manrope', 'Inter', system-ui, sans-serif" }}
              >
                SKU
              </label>
              <Input placeholder="Ej: PAN-PRE-M" className="h-12 text-base" />
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="text-sm font-semibold text-[#161d16]"
                style={{ fontFamily: "'Manrope', 'Inter', system-ui, sans-serif" }}
              >
                Precio
              </label>
              <Input type="number" placeholder="0.00" className="h-12 text-base" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label
              className="text-sm font-semibold text-[#161d16]"
              style={{ fontFamily: "'Manrope', 'Inter', system-ui, sans-serif" }}
            >
              URL de Imagen
            </label>
            <Input placeholder="https://..." className="h-12 text-base" />
          </div>
        </div>
      </GenericModal>

      <GenericModal
        open={!!editProducto}
        onOpenChange={() => setEditProducto(null)}
        title="Editar Producto"
        description={`Editando: ${editProducto?.name}`}
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={() => setEditProducto(null)}>
              Cancelar
            </Button>
            <Button onClick={handleEditProduct}>
              Guardar Cambios
            </Button>
          </>
        }
      >
        {editProducto && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label
                className="text-sm font-semibold text-[#161d16]"
                style={{ fontFamily: "'Manrope', 'Inter', system-ui, sans-serif" }}
              >
                Nombre del Producto
              </label>
              <Input
                defaultValue={editProducto.name}
                className="h-12 text-base"
              />
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label
                  className="text-sm font-semibold text-[#161d16]"
                  style={{ fontFamily: "'Manrope', 'Inter', system-ui, sans-serif" }}
                >
                  SKU
                </label>
                <Input
                  defaultValue={editProducto.sku}
                  className="h-12 text-base"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  className="text-sm font-semibold text-[#161d16]"
                  style={{ fontFamily: "'Manrope', 'Inter', system-ui, sans-serif" }}
                >
                  Precio
                </label>
                <Input
                  type="number"
                  defaultValue={editProducto.price}
                  className="h-12 text-base"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="text-sm font-semibold text-[#161d16]"
                style={{ fontFamily: "'Manrope', 'Inter', system-ui, sans-serif" }}
              >
                URL de Imagen
              </label>
              <Input
                defaultValue={editProducto.imgUrl || ""}
                className="h-12 text-base"
              />
            </div>
          </div>
        )}
      </GenericModal>

      <ConfirmModal
        open={!!deleteProducto}
        onOpenChange={() => setDeleteProducto(null)}
        title="Eliminar Producto"
        description={`¿Estás seguro de que deseas eliminar "${deleteProducto?.name}" del catálogo? Esta acción no se puede deshacer.`}
        onConfirm={handleDeleteProduct}
        confirmText="Eliminar"
        variant="destructive"
      />
    </AppLayout>
  );
}

import { Input } from "@/components/ui/input";
