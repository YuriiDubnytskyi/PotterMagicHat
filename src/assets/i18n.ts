import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en.json';

const resources = {
  en,
} as const;

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init(
    {
      compatibilityJSON: 'v3',
      resources,
      // https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
      lng: 'en',
      interpolation: {
        escapeValue: false, // react already safes from xss
      },
    },
    error => {
      if (error) {
        console.error('i18n init error', error);
      }
    },
  );

export default i18n;
