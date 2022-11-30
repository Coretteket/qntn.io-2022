/** Returns true if path is a localized route. */
export const isLocalized = (href: string) => /^\/(en|nl)(\W|$)/.test(new URL(href).pathname);

/** Returns true if path is a public file. */
export const isPublic = (href: string) => /(api|@vite|_image|\.\w+$)/.test(new URL(href).pathname);
