"use client";

import type Konva from "konva";
import { useEffect, useRef, useState } from "react";
import { Group, Image as KonvaImage, Layer, Stage } from "react-konva";
import { fileIdentity } from "@/lib/file-identity";
import type { AddToCanvasPayload, PlacedItem } from "@/lib/products";

const PX_PER_CM = 3;

const useProductImage = (src: string) => {
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  useEffect(() => {
    let cancelled = false;
    const image = new window.Image();
    image.crossOrigin = "anonymous";
    image.onload = () => {
      if (!cancelled) setImg(image);
    };
    image.src = src;
    return () => {
      cancelled = true;
    };
  }, [src]);
  return img;
};

const PlacedImage = ({ item }: { item: PlacedItem }) => {
  const img = useProductImage(item.image);
  const w = Math.max(80, item.w * PX_PER_CM);
  const h = Math.max(80, item.d * PX_PER_CM);
  return (
    <KonvaImage
      image={img ?? undefined}
      width={w}
      height={h}
      stroke="rgba(0,0,0,0.3)"
      strokeWidth={1}
      opacity={0.75}
      globalCompositeOperation="multiply"
    />
  );
};

export const WorkspaceCanvas = ({
  onItemsChange,
}: {
  onItemsChange?: (items: PlacedItem[]) => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [items, setItems] = useState<PlacedItem[]>([]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      setSize({
        width: Math.max(0, Math.floor(rect.width)),
        height: Math.max(0, Math.floor(rect.height)),
      });
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    onItemsChange?.(items);
    window.dispatchEvent(
      new CustomEvent<number>("workspace:items-change", {
        detail: items.length,
      }),
    );
  }, [items, onItemsChange]);

  useEffect(() => {
    const onAdd = (e: Event) => {
      const payload = (e as CustomEvent<AddToCanvasPayload>).detail;
      if (!payload) return;
      setItems((prev) => {
        const n = prev.length;
        const cols = 3;
        return [
          ...prev,
          {
            ...payload,
            instanceId: `${payload.id}-${Date.now()}-${n}`,
            x: 20 + (n % cols) * 140,
            y: 50 + Math.floor(n / cols) * 110,
          },
        ];
      });
    };
    window.addEventListener("workspace:add-product", onAdd);
    return () => window.removeEventListener("workspace:add-product", onAdd);
  }, []);

  useEffect(() => {
    const onRemove = (e: Event) => {
      const instanceId = (e as CustomEvent<string>).detail;
      if (!instanceId) return;
      setItems((prev) => prev.filter((p) => p.instanceId !== instanceId));
    };
    window.addEventListener("workspace:remove-product", onRemove);
    return () =>
      window.removeEventListener("workspace:remove-product", onRemove);
  }, []);

  useEffect(() => {
    const onExport = () => {
      const stage = stageRef.current;
      if (!stage) return;
      const url = stage.toDataURL({ mimeType: "image/png", pixelRatio: 2 });
      const a = document.createElement("a");
      a.href = url;
      a.download = fileIdentity("workspace", "png");
      document.body.appendChild(a);
      a.click();
      a.remove();
    };
    window.addEventListener("workspace:export-png", onExport);
    return () => window.removeEventListener("workspace:export-png", onExport);
  }, []);

  const handleExport = () => {
    window.dispatchEvent(new CustomEvent("workspace:export-png"));
  };

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden">
      <div className="absolute bottom-3 right-3 z-10">
        <button
          type="button"
          disabled={items.length === 0}
          onClick={handleExport}
          className="rounded-md border bg-background px-2.5 py-1.5 text-xs font-medium shadow-xs hover:bg-muted disabled:pointer-events-none disabled:opacity-50"
        >
          Export PNG
        </button>
      </div>
      <Stage ref={stageRef} width={size.width} height={size.height}>
        <Layer>
          {items.map((item) => (
            <Group
              key={item.instanceId}
              x={item.x}
              y={item.y}
              draggable
              onDragEnd={(e) => {
                const pos = e.target.position();
                setItems((prev) =>
                  prev.map((p) =>
                    p.instanceId === item.instanceId
                      ? { ...p, x: pos.x, y: pos.y }
                      : p,
                  ),
                );
              }}
            >
              <PlacedImage item={item} />
            </Group>
          ))}
        </Layer>
      </Stage>
    </div>
  );
};
