import { toString } from 'mdast-util-to-string';

export function getRawMD() {
  return (tree: any, { data }: any) => {
    data.astro.frontmatter.raw = toString(tree);
  };
}
