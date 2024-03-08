import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';
import { en } from "./translations";

// Set the key-value pairs for the different languages you want to support.
const i18n = new I18n({
  en: en,
  ar: { welcome: 'こんにちは' },
});

// Set the locale once at the beginning of your app.
i18n.locale = getLocales()[0].languageCode;

// console.log(i18n.t('welcome'));

export default i18n;