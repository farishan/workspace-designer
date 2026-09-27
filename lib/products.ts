export type ProductCategory = "desks" | "chairs" | "accessories";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  price: number;
  currency: string;
  description: string;
  image: string;
  dimensions: { w: number; d: number; h: number };
  material: string;
  color: string;
  inStock: boolean;
  url?: string;
};

export type AddToCanvasPayload = {
  id: string;
  name: string;
  image: string;
  price: number;
  currency: string;
  w: number;
  d: number;
};

export const categories: ProductCategory[] = ["desks", "chairs", "accessories"];

export function parseProductsJsonc(jsonc: string): Product[] {
  const withoutComments = jsonc.replace(/^\s*\/\/.*$/gm, "");
  return JSON.parse(withoutComments) as Product[];
}

export type PlacedItem = AddToCanvasPayload & {
  instanceId: string;
  x: number;
  y: number;
};

export function toAddPayload(product: Product): AddToCanvasPayload {
  return {
    id: product.id,
    name: product.name,
    image: product.image,
    price: product.price,
    currency: product.currency,
    w: product.dimensions.w,
    d: product.dimensions.d,
  };
}
