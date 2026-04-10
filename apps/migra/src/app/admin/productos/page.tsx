"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout";
import { PageHeader } from "@/components/common";
import { DataTable } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GenericModal, ConfirmModal } from "@/components/common";
import { Add01Icon, Edit02Icon, Delete01Icon } from "hugeicons-react";
import { formatCurrency } from "@/utils/formatters";
import { clientSuccessHandler, clientErrorHandler } from "@/utils/handlers/clientHandler";

interface Producto {
  id: number;
  name: string;
  tipo: string;
  sku: string;
  price: number;
  imgUrl: string;
}

const sampleProducts: Producto[] = [
  {
    id: 1,
    name: "Pack Pañales Premium Talle M",
    tipo: "Pañales",
    sku: "PAN-PRE-M",
    price: 15800,
    imgUrl:
      "https://images.unsplash.com/photo-1594125345722-e6e726a33a79?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Toallitas Húmedas x100",
    tipo: "Higiene",
    sku: "TOH-100",
    price: 4200,
    imgUrl:
      "https://images.unsplash.com/photo-1627916560298-0227d0754b40?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Leche Infantil Fórmula 900g",
    tipo: "Alimentación",
    sku: "LEI-FOR-900",
    price: 12500,
    imgUrl:
      "https://images.unsplash.com/photo-1584693786687-3e4b0a0e3e3e?w=400&h=400&fit=crop&q=80",
  },
  {
    id: 4,
    name: "Biberón Anticólicos 270ml",
    tipo: "Accesorios",
    sku: "BIB-ANT-270",
    price: 6800,
    imgUrl:
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&h=400&fit=crop",
  },
  {
    id: 5,
    name: "Crema Hidratante Bebé 200g",
    tipo: "Cuidado",
    sku: "CRH-BEB-200",
    price: 5400,
    imgUrl:
      "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=400&h=400&fit=crop",
  },
  {
    id: 6,
    name: "Chupete Silicona 6-18m",
    tipo: "Accesorios",
    sku: "CHU-SIL-618",
    price: 3200,
    imgUrl:
      "https://images.unsplash.com/photo-1594125345722-e6e726a33a79?w=400&h=400&fit=crop",
  },
];

export default function AdminProductosPage() {
  const [search, setSearch] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editProducto, setEditProducto] = useState<Producto | null>(null);
  const [deleteProducto, setDeleteProducto] = useState<Producto | null>(null);

  const filteredProducts = sampleProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.tipo.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()),
  );

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

  const handleDeleteProduct = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      clientSuccessHandler(
        `Producto "${deleteProducto?.name}" eliminado del catálogo.`,
      );

      setDeleteProducto(null);
    } catch (error) {
      clientErrorHandler(error);
    }
  };

  return (
    <AppLayout variant="admin">
      <PageHeader
        title="Productos"
        description="Gestión del catálogo de productos"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="mt-8"
      >
        <DataTable<Producto>
          title=""
          subtitle=""
          columns={[
            {
              key: "name",
              label: "Producto",
              render: (item) => (
                <div className="flex items-center gap-3">
                  <div className="size-10 shrink-0 overflow-hidden rounded-xl bg-[#f3fcf0]/60">
                    <img
                      src={item.imgUrl}
                      alt={item.name}
                      className="size-full object-cover"
                    />
                  </div>
                  <div>
                    <p
                      className="text-sm font-semibold text-[#161d16]"
                      style={{
                        fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
                      }}
                    >
                      {item.name}
                    </p>
                    <p className="text-xs text-[#3d4a3d]">{item.tipo}</p>
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
                  style={{
                    fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
                  }}
                >
                  {formatCurrency(item.price)}
                </p>
              ),
            },
            {
              key: "actions",
              label: "Acciones",
              render: (item) => (
                <div className="flex items-center gap-2">
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
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          emptyMessage="No se encontraron productos"
          searchPlaceholder="Buscar producto..."
          onSearch={setSearch}
          actions={
            <Button
              onClick={() => setIsCreateOpen(true)}
              className="gap-2 rounded-[2rem]"
            >
              <Add01Icon className="size-5" />
              Nuevo Producto
            </Button>
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
              style={{
                fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
              }}
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
                style={{
                  fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
                }}
              >
                Tipo
              </label>
              <Input placeholder="Ej: Pañales" className="h-12 text-base" />
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="text-sm font-semibold text-[#161d16]"
                style={{
                  fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
                }}
              >
                SKU
              </label>
              <Input placeholder="Ej: PAN-PRE-M" className="h-12 text-base" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label
              className="text-sm font-semibold text-[#161d16]"
              style={{
                fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
              }}
            >
              Precio
            </label>
            <Input
              type="number"
              placeholder="0.00"
              className="h-12 text-base"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              className="text-sm font-semibold text-[#161d16]"
              style={{
                fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
              }}
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
                style={{
                  fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
                }}
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
                  style={{
                    fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
                  }}
                >
                  Tipo
                </label>
                <Input
                  defaultValue={editProducto.tipo}
                  className="h-12 text-base"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  className="text-sm font-semibold text-[#161d16]"
                  style={{
                    fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
                  }}
                >
                  SKU
                </label>
                <Input
                  defaultValue={editProducto.sku}
                  className="h-12 text-base"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="text-sm font-semibold text-[#161d16]"
                style={{
                  fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
                }}
              >
                Precio
              </label>
              <Input
                type="number"
                defaultValue={editProducto.price}
                className="h-12 text-base"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="text-sm font-semibold text-[#161d16]"
                style={{
                  fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
                }}
              >
                URL de Imagen
              </label>
              <Input
                defaultValue={editProducto.imgUrl}
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
