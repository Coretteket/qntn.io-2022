import type { Locale } from "../scripts/types";
import { isLocale } from "../scripts/utils";

class ToggleLocale extends HTMLElement {
  connectedCallback() {
    this.buttons.forEach((e) => e.addEventListener('click', this.toggleLocale.bind(this)));
  }

  get buttons(): NodeListOf<HTMLElement> {
    return this.querySelectorAll('.toggleLocale')
  }

  get locale(): Locale {
    return isLocale(document.documentElement.lang) ? document.documentElement.lang : 'en';
  }

  toggleLocale() {
    document.cookie = `locale=${this.locale === 'en' ? 'nl' : 'en'}`;
    const href = window.location.href.split('?');
    if (href[1]?.length > 0) window.location.href = href[0];
    else window.location.reload();
  }
}

customElements.define('toggle-locale', ToggleLocale);