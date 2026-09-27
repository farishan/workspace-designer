"use client";

import { ProductPicker } from "@/components/product-picker";
import type { AddToCanvasPayload, Product } from "@/lib/products";

export const PickerPanel = ({ products }: { products: Product[] }) => {
  const handleAdd = (payload: AddToCanvasPayload) => {
    window.dispatchEvent(
      new CustomEvent<AddToCanvasPayload>("workspace:add-product", {
        detail: payload,
      }),
    );
  };

  return (
    <div className="h-full min-h-0 overflow-hidden">
      <ProductPicker products={products} onAdd={handleAdd} />
    </div>
  );
};
