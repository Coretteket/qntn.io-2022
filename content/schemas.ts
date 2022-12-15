import { z } from 'zod';

const pages = z.object({
  title: z.string(),
  raw: z.string(),
  draft: z.boolean().optional(),
  date: z.coerce.date().optional(),
});

const blog = pages.extend({
  date: z.coerce.date(),
});

const project = blog.extend({
  stat: z.string(),
});

export default { pages, blog, project };
