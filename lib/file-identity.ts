export function fileIdentity(
  kind: "workspace" | "order",
  ext: string,
  now = new Date(),
) {
  const p = (n: number) => String(n).padStart(2, "0");
  const stamp = `${now.getFullYear()}${p(now.getMonth() + 1)}${p(now.getDate())}${p(now.getHours())}${p(now.getMinutes())}`;
  return `${stamp}-${kind}_workspace-designer-faris-han.${ext}`;
}
