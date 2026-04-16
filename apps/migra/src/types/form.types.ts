export interface ProductFormData {
  name: string;
  sku: string;
  price: string;
  imgUrl: string;
  marcaId: string;
  categoriaId: string;
  subcategoriaId: string;
  variantes: ProductoVarianteFormData[];
}

export interface ProductoVarianteFormData {
  color: string;
  talle: string;
}
