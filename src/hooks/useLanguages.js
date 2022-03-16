import { graphql, useStaticQuery } from 'gatsby';

const useLanguages = () => {
  useStaticQuery(
    graphql`
      query {
        allDatoCmsSite {
          edges {
            node {
              locale
            }
          }
        }
        datoCmsWebsiteSetting {
          blogPath
        }
      }
    `
  );

  let defaultLanguage = 'pl';
  let blogPath = 'blog';
  return {
    defaultLanguage,
    blogPath,
  };
};

export default useLanguages;
