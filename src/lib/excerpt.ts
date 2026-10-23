/**
 * Plain-text excerpt from a Markdown/MDX body, truncated on a word boundary.
 * Stands in for Gatsby's `excerpt(pruneLength: 160)`.
 */
export function excerpt(body: string | undefined, length = 160): string {
  if (!body) return "";

  const text = body
    .replace(/^```[\s\S]*?^```/gm, "") // fenced code
    .replace(/^(import|export)\s.*$/gm, "") // MDX imports/exports
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "") // MDX comments
    .replace(/<[^>]+>/g, "") // HTML/JSX tags
    .replace(/^\s*https?:\/\/\S+\s*$/gm, "") // bare embed URLs
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "") // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // links -> text
    .replace(/^#+\s+/gm, "") // heading markers
    .replace(/[*_`~>]/g, "") // emphasis, code, blockquote markers
    .replace(/\s+/g, " ")
    .trim();

  if (text.length <= length) return text;
  const cut = text.slice(0, length);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}
