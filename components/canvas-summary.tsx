"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { fileIdentity } from "@/lib/file-identity";
import type { PlacedItem } from "@/lib/products";

export const CanvasSummary = ({
  items,
  onRemove,
}: {
  items: PlacedItem[];
  onRemove?: (instanceId: string) => void;
}) => {
  const total = items.reduce((sum, item) => sum + item.price, 0);
  const currency = items[0]?.currency ?? "EUR";

  const handleRent = () => {
    const lines = [
      "PURCHASE ORDER",
      `Date: ${new Date().toISOString()}`,
      "",
      ...items.map((item) => `${item.name} - ${item.price} ${item.currency}`),
      "",
      `Total: ${total} ${currency}`,
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileIdentity("order", "txt");
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="shrink-0 border-b p-3">
        <h2 className="text-sm font-semibold">Summary</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          {items.length === 0
            ? "No items on canvas yet"
            : `${items.length} item${items.length === 1 ? "" : "s"} on canvas`}
        </p>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto p-3">
        {items.length === 0 ? (
          <p className="text-xs text-muted-foreground">
            Add products from the left panel to see them here.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {items.map((item) => (
              <li
                key={item.instanceId}
                className="flex items-center gap-2 rounded-lg border p-2"
              >
                <div className="relative size-12 shrink-0 overflow-hidden rounded-md bg-muted">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.price} {item.currency}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  aria-label={`Remove ${item.name}`}
                  onClick={() => onRemove?.(item.instanceId)}
                >
                  <X />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="shrink-0 border-t p-3">
        <p className="text-sm font-semibold">
          Total: {total} {currency}
        </p>
        <Button
          className="mt-2 w-full"
          disabled={items.length === 0}
          onClick={handleRent}
        >
          Rent
        </Button>
      </div>
    </div>
  );
};
