import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import es from './locales/es.json';

const resources = {
	en: {
		translation: en
	},
	es: {
		translation: es
	}
};

i18next.use(initReactI18next).init({
	resources,
	lng: 'es',
	fallbackLng: 'es',
	interpolation: {
		escapeValue: false
	}
});
