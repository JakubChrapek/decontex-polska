import React from 'react';
import { graphql } from 'gatsby';
import PageWrapper from '../components/layout/pageWrapper';
import useLanguages from '../hooks/useLanguages';

const BlogArchiveTemplate = ({ data, pageContext }) => {
  const { defaultLanguage, blogPath } = useLanguages();
  const { pagesNumber, archivePageNumber, locale } = pageContext; 
  return (
    <PageWrapper
      pageData={pageContext}
      seoTitle={data.seoTitle}
      seoDescription={data.seoDescription}
    >
      
      {data.allDatoCmsBlogPost.blogPostNodes.map(
        (el) => (
          <>awda</>
        )
      )}

    </PageWrapper>
  );
};

export default BlogArchiveTemplate;

export const query = graphql`
  query BlogArchiveQuery($locale: String!, $skip: Int!, $limit: Int!) {
    datoCmsArchivePage(locale: { eq: $locale }) {
      locale
      seo {
        seoTitle: title
        seoDescription: description
      }
    }
    allDatoCmsBlogPost(
      sort: { order: ASC, fields: meta___firstPublishedAt }
      filter: { locale: { eq: $locale } }
      limit: $limit
      skip: $skip
    ) {
      blogPostNodes: nodes {
        id: originalId
        meta {
          firstPublishedAt(locale: $locale, formatString: "DD MMM YYYY")
        }
        minutesOfReading
        cardImage {
          gatsbyImageData(
            width: 280
            height: 100
            placeholder: NONE
            forceBlurhash: false
          )
          squaredImage: gatsbyImageData(
            width: 100
            height: 100
            imgixParams: { ar: "1", fit: "crop" }
          )
          alt
        }
        author {
          name
          picture {
            gatsbyImageData(height: 30, width: 30)
            alt
          }
        }
        subtitle
        title
        slug
        reference
      }
    }

    datoCmsWebsiteSetting(locale: { eq: $locale }) {
      minsReadSuffix
    }
  }
`;
