import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import useLanguages from '../hooks/useLanguages';
import PageWrapper from '../components/layout/pageWrapper';
import {
  storeLocale,
  getStoredLocale,
  isSSR,
  getSecondaryLangs,
  findSecondaryLang,
  isDefaultStored,
  isSecondaryStored,
} from '../utils/misc';
import preferredLang from '../utils/preferredLang';

const NotFoundPage = () => {
  const data = useStaticQuery(graphql`
    query {
      datoCmsSite {
        locales
      }
    }
  `);
  const { defaultLanguage } = useLanguages();
  const {
    datoCmsSite: { locales },
  } = data;
  const appLangCodes = [...locales];
  const storedLocale = getStoredLocale();

  if (!isSSR) {
    const browserLangCodes = navigator.languages;
    const {
      allDatoCmsNotFoundPage: { nodes: propsNodes },
    } = data;

    const [defaultLangPropsNode] = propsNodes;

    const {
      seo: { seoTitle, seoDescription },
      title,
      subtitle,
      backToHomeText,
    } = defaultLangPropsNode;

    const defaultLangProps = {
      pageWrapper: {
        seoTitle,
        seoDescription,
        notFoundPageLocale: defaultLanguage,
        notFoundPageManifest: '/manifest.webmanifest',
      },
      hero: {
        title,
        subtitle,
      },
      navigator: {
        children: backToHomeText,
        to: '/',
      },
    };

    const getProps = () => {
      const isDefaultLangStored = isDefaultStored(
        appLangCodes,
        storedLocale,
        defaultLanguage
      );
      if (isDefaultLangStored) return { ...defaultLangProps };

      const isSecondaryLangStored = isSecondaryStored(
        appLangCodes,
        storedLocale,
        defaultLanguage
      );
      if (isSecondaryLangStored) {
        const [storedLangProps] = propsNodes.filter(
          ({ locale }) => locale === storedLocale
        );

        return {
          pageWrapper: {
            seoTitle: storedLangProps.seo.seoTitle,
            seoDescription: storedLangProps.seo.seoDescription,
            notFoundPageLocale: storedLocale,
            notFoundPageManifest: `/manifest_${storedLocale}.webmanifest`,
          },
          hero: {
            title: storedLangProps.title,
            subtitle: storedLangProps.subtitle,
          },
          navigator: {
            children: storedLangProps.backToHomeText,
            notFoundPage: `/${storedLocale}`,
          },
        };
      }

      const matchingLangCode = preferredLang(browserLangCodes, appLangCodes);

      const defaultLanguageMatch = matchingLangCode === defaultLanguage;

      if (!storedLocale && defaultLanguageMatch) {
        storeLocale(defaultLanguage);
        return { ...defaultLangProps };
      }

      const secondaryLanguages = getSecondaryLangs(appLangCodes);
      const secondaryLanguageMatch = findSecondaryLang(
        secondaryLanguages,
        matchingLangCode
      );
      if (!storedLocale && secondaryLanguageMatch) {
        storeLocale(secondaryLanguageMatch);
        const [secondaryLangProps] = propsNodes.filter(
          ({ locale }) => locale === secondaryLanguageMatch
        );
        return {
          pageWrapper: {
            seoTitle: secondaryLangProps.seo.seotitle,
            seoDescription: secondaryLangProps.seo.seoDescription,
            notFoundPageLocale: secondaryLanguageMatch,
            notFoundPageManifest: `/manifest_${secondaryLanguageMatch}.webmanifest`,
          },
          hero: {
            title: secondaryLangProps.title,
            subtitle: secondaryLangProps.subtitle,
          },
          navigator: {
            children: secondaryLangProps.backToHomeText,
            notFoundPage: `/${secondaryLanguageMatch}`,
          },
        };
      }
      return { ...defaultLangProps };
    };

    const { pageWrapper, hero, navigator: navigatorProps } = getProps();

    return (
      <PageWrapper {...pageWrapper} notFoundPage noHeader noFooter>
        awdawd
      </PageWrapper>
    );
  }
  return null;
};

export default NotFoundPage;
