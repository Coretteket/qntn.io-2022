export function get(event) {
  return {
    body: {
      city: decodeURIComponent(event.request.headers.get('x-vercel-ip-city')),
    },
  };
}
