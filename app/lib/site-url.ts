// The same content works at localhost / and at a GitHub Pages project subpath.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function siteUrl(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  return `${basePath}${path}`;
}

export function pageUrl(path: string): string {
  if (!basePath || !path.startsWith("/")) return siteUrl(path);
  const [pathname, fragment] = path.split("#", 2);
  return `${siteUrl(pathname.endsWith("/") ? pathname : `${pathname}/`)}${fragment ? `#${fragment}` : ""}`;
}
