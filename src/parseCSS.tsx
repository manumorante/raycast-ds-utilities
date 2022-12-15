export default function parseCSS(css: string): { items: { prop: string; value: string }[] } {
  if (!css) return { items: [] }

  // Use a regular expression to match CSS property-value pairs
  const matches = css.match(/[^\s:;]+:[^;]+/g);
  if (!matches) return { items: [] }

  // Iterate over the matches and split each one into a property and value
  const items: { prop: string; value: string }[] = [];
  for (const match of matches) {
    const [prop, value] = match.split(':');
    items.push({ prop, value });
  }

  return { items };
}
