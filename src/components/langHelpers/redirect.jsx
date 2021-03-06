import React, { useEffect, useState } from 'react';
import { graphql, useStaticQuery, navigate } from 'gatsby';
import { useLocation } from '@reach/router';
import useLanguages from '../../hooks/useLanguages';
import preferredLang from '../../utils/preferredLang';
import {
  storeLocale,
  getStoredLocale,
  getSecondaryLangs,
  findSecondaryLang,
  isDefaultStored,
  isSecondaryStored,
} from '../../utils/misc';
import is404 from '../../utils/is404';

const Redirect = () => {
  const [mounted, setMounted] = useState(true);
  return mounted && <Trigger setMounted={setMounted} />;
};

export default Redirect;

const Trigger = ({ setMounted }) => {
  const data = useStaticQuery(graphql`
    query {
      datoCmsSite {
        locales
      }
    }
  `);
  const { href, pathname } = useLocation();
  const { defaultLanguage } = useLanguages();

  useEffect(() => {
    (async () => {
      try {
        return;
        const {
          datoCmsSite: { locales },
        } = data;
        const appLangCodes = [...locales];
        const browserLangCodes = navigator.languages;
        const visitsRoot = pathname.length === 1;

        const notFound = await is404(href);
        if (notFound) return;

        const storedLocale = getStoredLocale();

        const isDefaultLangStored = isDefaultStored(
          appLangCodes,
          storedLocale,
          defaultLanguage
        );
        if (visitsRoot && isDefaultLangStored) return;

        const isSecondaryLangStored = isSecondaryStored(
          appLangCodes,
          storedLocale,
          defaultLanguage
        );
        if (visitsRoot && isSecondaryLangStored) {
          navigate(`/${storedLocale}`);
          return;
        }

        const pathLangCode = pathname.split('/')[1];
        const visitsSecondary = appLangCodes.some(
          (lang) => lang === pathLangCode
        );
        if (storedLocale && visitsSecondary) {
          return;
        }

        if (!storedLocale && visitsRoot) {
          const matchingLangCode = preferredLang(
            browserLangCodes,
            appLangCodes
          );

          const defaultLanguageMatch = matchingLangCode === defaultLanguage;
          if (defaultLanguageMatch) {
            storeLocale(defaultLanguage);
            return;
          }

          const secondaryLanguages = getSecondaryLangs(appLangCodes);
          const secondaryLanguageMatch = findSecondaryLang(
            secondaryLanguages,
            matchingLangCode
          );
          if (secondaryLanguageMatch) {
            storeLocale(secondaryLanguageMatch);
            navigate(`/${secondaryLanguageMatch}`);
            return;
          }
        }

        if (!storedLocale && visitsSecondary) {
          storeLocale(pathLangCode);
          return;
        }

        storeLocale(defaultLanguage);
      } catch {
      } finally {
        setMounted(false);
      }
    })();
  }, [data, defaultLanguage, pathname, href, setMounted]);

  return null;
};
