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
  ImageBulkUpload,
  ProductForm,
} from "@/components/common";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  FileViewIcon,
} from "hugeicons-react";
import { productoService, categoriaService, marcaService } from "@/services";
import { productoVarianteService } from "@/services/producto-variante.service";
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
  ColorProducto,
} from "@/types";
import { getMarcaColor } from "@/constants/marca-colors.constant";

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
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<ProductoWithRelations | null>(null);
  const [formData, setFormData] = useState<ProductFormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [productImage, setProductImage] = useState<File | null>(null);
  const [variantImages, setVariantImages] = useState<Map<number, File>>(
    new Map(),
  );

  const [search, setSearch] = useState("");
  const [filterMarcaId, setFilterMarcaId] = useState("all");
  const [filterCategoriaId, setFilterCategoriaId] = useState("all");
  const [filterSubcategoriaId, setFilterSubcategoriaId] = useState("all");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 50,
    total: 0,
    totalPages: 0,
  });

  useEffect(() => {
    loadData();
  }, [search, filterMarcaId, filterCategoriaId, filterSubcategoriaId, page]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [result, marcasData] = await Promise.all([
        productoService.findAllWithDeleted(
          search || undefined,
          1,
          filterMarcaId !== "all" ? Number(filterMarcaId) : undefined,
          filterCategoriaId !== "all" ? Number(filterCategoriaId) : undefined,
          filterSubcategoriaId !== "all"
            ? Number(filterSubcategoriaId)
            : undefined,
          page,
          50,
        ),
        marcaService.findAll(1),
      ]);
      setProductos(result.data);
      setPagination(result.pagination);
      setMarcas(marcasData);
    } catch (error) {
      clientErrorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenCreateModal = () => {
    setFormData(INITIAL_FORM_DATA);
    setProductImage(null);
    setVariantImages(new Map());
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
        imgUrl: v.imgUrl || "",
      })),
    });
    setProductImage(null);
    setVariantImages(new Map());
    setIsEditModalOpen(true);
  };

  const handleOpenViewModal = (product: ProductoWithRelations) => {
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
        imgUrl: v.imgUrl || "",
      })),
    });
    setIsViewModalOpen(true);
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
        variantes:
          formData.variantes.length > 0
            ? formData.variantes.map((v) => ({
                color: v.color ? (v.color as ColorProducto) : undefined,
                talle: v.talle ? Number(v.talle) : undefined,
              }))
            : undefined,
      };

      const createdProduct = await productoService.create(dto);

      if (productImage) {
        await productoService.uploadImage(createdProduct.id, productImage);
      }

      if (variantImages.size > 0) {
        const fullProduct = await productoService.findById(createdProduct.id);
        if (fullProduct.variantes) {
          for (const [index, file] of variantImages.entries()) {
            const variante = fullProduct.variantes[index];
            if (variante) {
              await productoVarianteService.uploadImage(variante.id, file);
            }
          }
        }
      }

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

      if (productImage) {
        await productoService.uploadImage(selectedProduct.id, productImage);
      }

      if (variantImages.size > 0 && selectedProduct.variantes) {
        for (const [index, file] of variantImages.entries()) {
          const variante = selectedProduct.variantes[index];
          if (variante) {
            await productoVarianteService.uploadImage(variante.id, file);
          }
        }
      }

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

  const filterMarca = marcas.find((m) => m.id === Number(filterMarcaId));
  const filterCategorias = filterMarca?.categorias || [];
  const filterCategoria = filterCategorias.find(
    (c) => c.id === Number(filterCategoriaId),
  );
  const filterSubcategorias = filterCategoria?.subcategorias || [];

  return (
    <AppLayout variant="admin">
      <PageHeader
        title="Gestión de Productos"
        description="Administración del catálogo de productos"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2"
      >
        <PdfUpload
          onUploadComplete={handleUploadComplete}
          variant="full"
          empresaId={1}
        />
        <ImageBulkUpload variant="full" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="mt-8"
      >
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center">
          <Input
            placeholder="Buscar por nombre o SKU..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="lg:flex-[2]"
          />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:flex-1">
            <Select
              value={filterMarcaId}
              onValueChange={(value) => {
                setFilterMarcaId(value);
                setFilterCategoriaId("all");
                setFilterSubcategoriaId("all");
                setPage(1);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Todas las marcas" />
              </SelectTrigger>
              <SelectContent position="popper" side="bottom" align="start">
                <SelectItem value="all">Todas las marcas</SelectItem>
                {marcas.map((marca) => (
                  <SelectItem key={marca.id} value={String(marca.id)}>
                    {marca.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={filterCategoriaId}
              onValueChange={(value) => {
                setFilterCategoriaId(value);
                setFilterSubcategoriaId("all");
                setPage(1);
              }}
              disabled={filterMarcaId === "all"}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Todas las categorías" />
              </SelectTrigger>
              <SelectContent position="popper" side="bottom" align="start">
                <SelectItem value="all">Todas las categorías</SelectItem>
                {filterCategorias.map((cat) => (
                  <SelectItem key={cat.id} value={String(cat.id)}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={filterSubcategoriaId}
              onValueChange={(value) => {
                setFilterSubcategoriaId(value);
                setPage(1);
              }}
              disabled={filterCategoriaId === "all"}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Todas las subcategorías" />
              </SelectTrigger>
              <SelectContent position="popper" side="bottom" align="start">
                <SelectItem value="all">Todas las subcategorías</SelectItem>
                {filterSubcategorias.map((sub) => (
                  <SelectItem key={sub.id} value={String(sub.id)}>
                    {sub.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            size="lg"
            onClick={handleOpenCreateModal}
            className="gap-2 whitespace-nowrap lg:ml-2"
          >
            <Add01Icon className="size-5" />
            <span className="hidden xl:inline">Nuevo Producto</span>
            <span className="xl:hidden">Nuevo</span>
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <DataTable<ProductoWithRelations>
          title="Catálogo de Productos"
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
              render: (item) => {
                const marcaColor = getMarcaColor(item.marca.name);
                return (
                  <span
                    className={`inline-flex rounded-md px-2 py-1 text-sm ${marcaColor.bg} ${marcaColor.text} ${marcaColor.fontWeight || ""}`}
                  >
                    {item.marca.name}
                  </span>
                );
              },
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
              key: "variantes",
              label: "Variantes",
              className: "text-center",
              render: (item) => {
                if (item.variantes.length === 0) {
                  return (
                    <span className="text-xs text-[#3d4a3d]/60">
                      Sin variantes
                    </span>
                  );
                }
                return (
                  <div className="flex flex-wrap justify-center gap-1 max-w-xs mx-auto">
                    {item.variantes.map((v, idx) => (
                      <span
                        key={idx}
                        className="inline-flex whitespace-nowrap rounded-md bg-[#f3fcf0] px-2 py-0.5 text-xs text-[#2b6485]"
                      >
                        {v.color && v.talle
                          ? `${v.color} - T${v.talle}`
                          : v.color
                            ? v.color
                            : `T${v.talle}`}
                      </span>
                    ))}
                  </div>
                );
              },
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
                      onClick={() => handleOpenViewModal(item)}
                      title="Ver detalles"
                    >
                      <FileViewIcon className="size-4" />
                    </Button>
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
          totalLabel={`${pagination.total} productos`}
        />
        {pagination.totalPages > 1 && (
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-[#3d4a3d]">
              Página {pagination.page} de {pagination.totalPages}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={pagination.page === 1 || isLoading}
              >
                Anterior
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setPage((p) => Math.min(pagination.totalPages, p + 1))
                }
                disabled={
                  pagination.page === pagination.totalPages || isLoading
                }
              >
                Siguiente
              </Button>
            </div>
          </div>
        )}
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
        <ProductForm
          formData={formData}
          marcas={marcas}
          onFormDataChange={setFormData}
          onImageChange={(file) => setProductImage(file)}
          onVariantImageChange={(index, file) => {
            const newMap = new Map(variantImages);
            if (file) {
              newMap.set(index, file);
            } else {
              newMap.delete(index);
            }
            setVariantImages(newMap);
          }}
        />
      </GenericModal>

      <GenericModal
        open={isViewModalOpen}
        onOpenChange={setIsViewModalOpen}
        title="Detalles del Producto"
        description="Información completa del producto"
        size="lg"
        footer={
          <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
            Cerrar
          </Button>
        }
      >
        <ProductForm
          formData={formData}
          marcas={marcas}
          onFormDataChange={setFormData}
          disabled
        />
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
        <ProductForm
          formData={formData}
          marcas={marcas}
          onFormDataChange={setFormData}
          onImageChange={(file) => setProductImage(file)}
          onVariantImageChange={(index, file) => {
            const newMap = new Map(variantImages);
            if (file) {
              newMap.set(index, file);
            } else {
              newMap.delete(index);
            }
            setVariantImages(newMap);
          }}
        />
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
