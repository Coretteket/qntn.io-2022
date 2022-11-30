import { z } from 'https://deno.land/x/zod@v3.19.1/mod.ts';

const schema = z.object({
  data: z.array(z.object({ grand_total: z.object({ total_seconds: z.number() }) })),
});

export default async function wakatime() {
  const res = await fetch(Deno.env.get('WAKATIME_URL')!);
  const raw_data = await res.json();
  const { data } = schema.parse(raw_data);
  const seconds = data.reduce((acc, { grand_total }) => acc + grand_total.total_seconds, 0);
  const hours = Math.round(seconds / 3600);
  return Response.json({ hours });
}
