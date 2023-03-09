import { z } from 'zod';

const page = z.object({
  title: z.string(),
  raw: z.string(),
  draft: z.boolean().optional(),
  date: z.coerce.date().optional(),
});

const post = page.extend({
  date: z.coerce.date(),
});

const project = post.extend({
  stat: z.string(),
});

export default { page, post, project };
