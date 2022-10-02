/** Modified from @astrojs/prefetch@0.0.7 to handle refetching cached pages when switching locale.
 * @see https://github.com/withastro/astro/tree/main/packages/integrations/prefetch
 */

import throttles from 'throttles';
import { shim } from './utils';

const events = ['mouseenter', 'touchstart', 'focus'];

const preloaded = new Set<string>();

function shouldPreload({ href }: { href: string }) {
	try {
		const url = new URL(href);
		return (
			window.location.origin === url.origin &&
			window.location.pathname !== url.hash &&
			// prevent preloading the current page
			window.location.pathname.replace(/\/+$/, '') !== url.pathname.replace(/\/+$/, '') &&
			!preloaded.has(href)
		);
	} catch { }

	return false;
}

let parser: DOMParser;
let observer: IntersectionObserver;

function observe(link: HTMLAnchorElement) {
	preloaded.add(link.href);
	observer.observe(link);
	events.map((event) => link.addEventListener(event, onLinkEvent, { passive: true, once: true }));
}

function unobserve(link: HTMLAnchorElement) {
	observer.unobserve(link);
	events.map((event) => link.removeEventListener(event, onLinkEvent));
}

function onLinkEvent({ target }: Event) {
	if (!(target instanceof HTMLAnchorElement)) {
		return;
	}

	preloadHref(target);
}

async function preloadHref(link: HTMLAnchorElement) {
	unobserve(link);

	const { href } = link;

	try {
		const headers = window.refetchCachedPages ? { headers: { 'cache-control': 'no-cache' } } : {};
		const contents = await fetch(href, headers).then((res) => res.text());

		parser = parser || new DOMParser();

		const html = parser.parseFromString(contents, 'text/html');
		const styles = Array.from(html.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]'));

		await Promise.all(styles.map((el) => fetch(el.href)));
	} catch { }
}

export interface PrefetchOptions {
	/**
	 * Element selector used to find all links on the page that should be prefetched.
	 *
	 * @default 'a[href][rel~="prefetch"]'
	 */
	selector?: string;
	/**
	 * The number of pages that can be prefetched concurrently.
	 *
	 * @default 1
	 */
	throttle?: number;
}

/** Custom function that checks the localStorage to see if the document
 * language matches the cached language. */
function refetchCachedPages() {
	const cacheLanguage = window.localStorage.getItem('cache-language');
	const documentLanguage = document.documentElement.lang;
	window.localStorage.setItem('cache-language', documentLanguage);
	return cacheLanguage !== undefined && cacheLanguage !== documentLanguage;
}

export default function prefetch({
	selector = 'a[href][rel~="prefetch"]',
	throttle = 1,
}: PrefetchOptions) {
	const conn = navigator.connection;

	if (typeof conn !== 'undefined') {
		// Don't prefetch if using 2G or if Save-Data is enabled.
		if (conn.saveData) {
			return Promise.reject(new Error('Cannot prefetch, Save-Data is enabled'));
		}
		if (/2g/.test(conn.effectiveType)) {
			return Promise.reject(new Error('Cannot prefetch, network conditions are poor'));
		}
	}

	const [toAdd, isDone] = throttles(throttle);

	window.refetchCachedPages = refetchCachedPages();

	observer =
		observer ||
		new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting && entry.target instanceof HTMLAnchorElement) {
					toAdd(() => preloadHref(entry.target as HTMLAnchorElement).finally(isDone));
				}
			});
		});

	// Moved here to prevent the script from running on the edge.
	const requestIdleCallback = window.requestIdleCallback || shim;

	requestIdleCallback(() => {
		const links = Array.from(document.querySelectorAll<HTMLAnchorElement>(selector)).filter(
			shouldPreload
		);

		for (const link of links) {
			observe(link);
		}
	});
}
