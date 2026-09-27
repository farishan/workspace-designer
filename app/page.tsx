import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { DesignerPanels } from "@/components/designer-panels";
import { PickerPanel } from "@/components/picker-panel";
import { TopBarHint } from "@/components/top-bar-hint";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { parseProductsJsonc } from "@/lib/products";

export default async function Home() {
  const raw = await readFile(
    join(process.cwd(), "data", "products.jsonc"),
    "utf-8",
  );
  const products = parseProductsJsonc(raw);
  return (
    <>
      <div className="hidden h-dvh w-full flex-col overflow-hidden lg:flex">
        <div className="bg-foreground/5 grid shrink-0 grid-cols-[1fr_auto_1fr] items-center gap-3 overflow-hidden border-b p-3 text-xs">
          <h1 className="justify-self-start">Workspace Designer v0.1.0</h1>
          <TopBarHint />
          <a
            className="underline hover:no-underline decoration-1 justify-self-end"
            href="https://www.linkedin.com/in/farishan/"
            target="_blank"
            rel="noopener"
          >
            Faris Han
          </a>
        </div>
        <div className="flex min-h-0 min-w-0 flex-1 overflow-hidden">
          <ResizablePanelGroup
            orientation="horizontal"
            className="min-h-0 min-w-0 flex-1"
          >
            <ResizablePanel
              defaultSize="25%"
              minSize={15}
              className="min-h-0 min-w-0 overflow-hidden"
            >
              <div className="h-full w-full overflow-hidden">
                <PickerPanel products={products} />
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel
              defaultSize="75%"
              className="min-h-0 min-w-0 overflow-hidden"
            >
              <div className="h-full w-full overflow-hidden">
                <DesignerPanels />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
      <div className="flex h-dvh w-full items-center justify-center p-6 text-center lg:hidden">
        <div className="max-w-sm space-y-2">
          <p className="font-medium">Desktop only</p>
          <p className="text-sm text-muted-foreground">
            Workspace Designer needs at least a 1024px wide viewport. Please use
            a larger screen.
          </p>
        </div>
      </div>
    </>
  );
}
