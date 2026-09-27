"use client";

import { useState } from "react";
import { CanvasSummary } from "@/components/canvas-summary";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { WorkspaceCanvas } from "@/components/workspace-canvas";
import type { PlacedItem } from "@/lib/products";

export const DesignerPanels = () => {
  const [items, setItems] = useState<PlacedItem[]>([]);

  const handleRemove = (instanceId: string) => {
    window.dispatchEvent(
      new CustomEvent<string>("workspace:remove-product", {
        detail: instanceId,
      }),
    );
  };

  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="min-h-0 min-w-0 flex-1"
    >
      <ResizablePanel
        defaultSize="75%"
        className="min-h-0 min-w-0 overflow-hidden"
      >
        <WorkspaceCanvas onItemsChange={setItems} />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel
        defaultSize="25%"
        className="min-h-0 min-w-0 overflow-hidden"
      >
        <div className="h-full w-full overflow-hidden">
          <CanvasSummary items={items} onRemove={handleRemove} />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
