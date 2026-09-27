"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  type AddToCanvasPayload,
  categories,
  type Product,
  type ProductCategory,
  toAddPayload,
} from "@/lib/products";
import { cn } from "@/lib/utils";

type ProductPickerProps = {
  products: Product[];
  onAdd?: (payload: AddToCanvasPayload) => void;
};

export const ProductPicker = ({ products, onAdd }: ProductPickerProps) => {
  const [category, setCategory] = useState<ProductCategory>("desks");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (p.category !== category) return false;
      if (!q) return true;
      return p.name.toLowerCase().includes(q);
    });
  }, [products, category, query]);

  const selected = useMemo(
    () => products.find((p) => p.id === selectedId) ?? null,
    [products, selectedId],
  );

  const handleAdd = () => {
    if (!selected || !selected.inStock) return;
    onAdd?.(toAddPayload(selected));
  };

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <div className="shrink-0 border-b p-3">
        <div className="flex gap-1">
          {categories.map((c) => (
            <Button
              key={c}
              variant={c === category ? "default" : "outline"}
              className="capitalize"
              onClick={() => setCategory(c)}
            >
              {c}
            </Button>
          ))}
        </div>
        {(query || filtered.length > 3) && (
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="mt-2"
          />
        )}
      </div>
      <div className="grid min-h-0 flex-1 content-start gap-2 overflow-y-auto p-3">
        {filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground">No products found</p>
        ) : (
          filtered.map((p) => (
            <button
              key={p.id}
              type="button"
              disabled={!p.inStock}
              onClick={() => setSelectedId(p.id)}
              className={cn(
                "flex w-full items-center gap-2 overflow-hidden rounded-lg border p-2 text-left transition-colors",
                !p.inStock && "opacity-60",
                selectedId === p.id
                  ? "border-primary ring-2 ring-ring/50"
                  : "hover:border-muted-foreground/40",
              )}
            >
              <div className="relative size-20 shrink-0 overflow-hidden rounded-md bg-muted">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                  loading="eager"
                />
                {!p.inStock && (
                  <span className="absolute top-1.5 left-1.5 rounded bg-background/90 px-1.5 py-0.5 text-[10px]">
                    Out of stock
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-sm font-medium">{p.name}</p>
                <p className="text-xs text-muted-foreground">
                  {p.price} {p.currency} · {p.dimensions.w}×{p.dimensions.d}×
                  {p.dimensions.h} cm
                </p>
              </div>
            </button>
          ))
        )}
      </div>
      <div className="shrink-0 border-t p-3">
        {!selected ? (
          <p className="text-xs text-muted-foreground">
            Select a product to see details.
          </p>
        ) : (
          <div>
            <div className="flex gap-2">
              <div className="relative size-20 shrink-0 overflow-hidden rounded-md bg-muted">
                <Image
                  src={selected.image}
                  alt={selected.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                  loading="eager"
                />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">
                  {selected.name}
                </p>
                <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                  {selected.description}
                </p>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  {selected.dimensions.w}×{selected.dimensions.d}×
                  {selected.dimensions.h} cm
                </p>
                <p className="mt-0.5 text-sm font-medium">
                  {selected.price} {selected.currency}
                </p>
              </div>
            </div>
            {selected.url && (
              <a
                href={selected.url}
                target="_blank"
                rel="noreferrer"
                className="block mt-3"
              >
                <Button size="sm" variant="outline" className="w-full">
                  View product
                </Button>
              </a>
            )}
            <Button
              className="mt-2 w-full"
              disabled={!selected.inStock}
              onClick={handleAdd}
            >
              {selected.inStock ? "Add to canvas" : "Out of stock"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
