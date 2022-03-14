import { MONTH_MAP, STORAGE_LANG_KEY } from '../constants';

export const isSSR = typeof window === 'undefined';

export const storeLocale = (locale) =>
  localStorage.setItem(STORAGE_LANG_KEY, locale);

export const getStoredLocale = () => {
  if (!isSSR) {
    return localStorage.getItem(STORAGE_LANG_KEY);
  }
};

export const getLangCode = (string) => {
  const [lang] = string.split('-');
  return lang;
};

export const getLangsCode = (array) =>
  array.map((langCode) => getLangCode(langCode));

export const getSecondaryLangs = (array) => {
  const secondaryLanguages = array;
  array.shift();

  return secondaryLanguages;
};

export const findSecondaryLang = (array, code) =>
  array.find((item) => item === code);

export const isDefaultStored = (array, storageItem, defaultLanguage) => {
  const isStored = array.some(
    (lang) => lang === storageItem && lang === defaultLanguage
  );
  return isStored;
};

export const isSecondaryStored = (array, storageItem, defaultLanguage) => {
  const isStored = array.some(
    (lang) => lang === storageItem && lang !== defaultLanguage
  );
  return isStored;
};

export const parseDateFromEnglishMonth = (date) => {
  const dateInParts = date.split(' ');
  const newMonth = MONTH_MAP[dateInParts[1]];
  dateInParts[1] = newMonth;
  return dateInParts.join(' ');
};
