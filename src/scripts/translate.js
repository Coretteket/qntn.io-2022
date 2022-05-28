import { locale } from './stores';

export const toggleLocale = () => {
  locale.update((locale) => {
    locale = locale == 'en' ? 'nl' : 'en';
    document.documentElement.setAttribute('lang', locale);
    return locale;
  });
};

export default {
  en: {
    global: {
      projects: 'projects',
      about: 'about me',
      contact: 'contact',
    },
    index: {
      subtitle:
        'Hey, I study Econometrics and Data Science at the VU Amsterdam, and I love creating accessible ways to interact with data.',
      button: 'get in touch',
    },
  },
  nl: {
    global: {
      projects: 'projecten',
      about: 'over mij',
      contact: 'contact',
    },
    index: {
      subtitle:
        'Hey, ik studeer Econometrie en Data Science aan de Vrije Universiteit, en ik hou ervan om data op een creatieve manier toegangelijk te maken.',
      button: 'neem contact op',
    },
  },
};
