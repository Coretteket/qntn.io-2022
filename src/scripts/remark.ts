export function toString(value: unknown, options: { includeImageAlt?: boolean } = {}) {
  const { includeImageAlt = true } = options;
  return one(value, includeImageAlt);
}

function one(value: unknown, includeImageAlt: boolean): string {
  if (!node(value)) return '';
  if (value.type.includes('mdx')) return '';
  if (value?.value) return value.value;
  if (includeImageAlt && value?.alt) return value.alt;
  if ('children' in value) return all(value.children as unknown[], includeImageAlt);
  if (Array.isArray(value)) return all(value, includeImageAlt);
  return '';
}

function all(values: unknown[], includeImageAlt: boolean): string {
  const result: string[] = [];
  let index = -1;
  while (++index < values.length) result[index] = one(values[index], includeImageAlt);
  return result.join('');
}

type Node = { type: string; children: unknown[]; value?: string; alt?: string };

function node(value: unknown): value is Node {
  return Boolean(value && typeof value === 'object');
}

export function getRawMD() {
  return (tree: any, { data }: any) => {
    data.astro.frontmatter.raw = toString(tree);
  };
}
