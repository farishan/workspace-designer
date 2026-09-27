"use client";

import { useEffect, useState } from "react";

export const TopBarHint = () => {
  const [hasItems, setHasItems] = useState(false);

  useEffect(() => {
    const onChange = (e: Event) => {
      setHasItems((e as CustomEvent<number>).detail > 0);
    };
    window.addEventListener("workspace:items-change", onChange);
    return () => window.removeEventListener("workspace:items-change", onChange);
  }, []);

  return (
    <p className="justify-self-center text-center italic text-muted-foreground">
      {hasItems
        ? "Drag the product to adjust placement or remove from summary panel on the right"
        : "Pick a product on the left to add it to the canvas"}
    </p>
  );
};
