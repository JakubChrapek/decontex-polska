import React from 'react';
import { graphql } from 'gatsby';
import { StructuredText, renderNodeRule } from 'react-datocms';
import { isCode } from 'datocms-structured-text-utils';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import PageWrapper from '../components/layout/pageWrapper';
import Navigator from '../components/langHelpers/navigator';

const BlogPostTemplate = ({ data, pageContext }) => {
  const { skipNext } = pageContext;
  debugger
  return (
    <PageWrapper
      pageData={pageContext}
      seoTitle={data.seoTitle}
      seoDescription={data.seoDescription}
      seoImage={data.seoImageUrl}
    >

      {data.structuredBody?.value && (
        <StructuredText
          key={data.id}
          data={data.structuredBody}
          customRules={[
            renderNodeRule(isCode, ({ node: { language, code }, key }) => (
              <div style={{ position: 'relative' }} key={key}>
                <SyntaxHighlighter language={language} style={atomDark}>
                  {code}
                </SyntaxHighlighter>
              </div>
            )),
          ]}
          renderLinkToRecord={({
            record: { __typename, slug: recordSlug },
            children,
            transformedMeta,
          }) => {
            switch (__typename) {
              case 'DatoCmsOtherPage':
                return (
                  <Navigator {...transformedMeta} page to={recordSlug}>
                    {children}
                  </Navigator>
                );
              case 'DatoCmsBlogPost':
                return (
                  <Navigator {...transformedMeta} article to={recordSlug}>
                    {children}
                  </Navigator>
                );
              case 'DatoCmsArchivePage':
                return (
                  <Navigator {...transformedMeta} archive>
                    {children}
                  </Navigator>
                );
              case 'DatoCmsHomepage':
                return (
                  <Navigator {...transformedMeta} home>
                    {children}
                  </Navigator>
                );

              default:
                return null;
            }
          }}
          renderBlock={({
            record: {
              __typename,
              image: {
                gatsbyImageData: recordImageData,
                alt: recordImageAlt,
              },
            },
          }) => {
            switch (__typename) {
              case 'DatoCmsArticleBodyImage':
                return (
                  <></>
                );
              default:
                return null;
            }
          }}
        />
      )}
    </PageWrapper>
  );
};

export default BlogPostTemplate;

export const query = graphql`
  query BlogPostTemplateQuery (
      $id: String!
      $locale: String!
      $skipNext: Int!
      $skipPrevious: Int!
   ){
    next: allDatoCmsBlogPost(
       filter: { locale: { eq: $locale } }
       sort: { fields: meta___firstPublishedAt }
       limit: 1
       skip: $skipNext
     ) {
       nodes {
         nextPostSlug: slug
         nextPostTitle: title
       }
     }
     previous: allDatoCmsBlogPost(
       filter: { locale: { eq: $locale } }
       sort: { fields: meta___firstPublishedAt }
       skip: $skipPrevious
       limit: 1
     ) {
       nodes {
         prevPostSlug: slug
         prevPostTitle: title
       }
     }
    datoCmsBlogPost(originalId: { eq: $id }, locale: { eq: $locale }) {
      originalId
      locale
      title
      seo {
        seoTitle: title
        seoDescription: description
        seoImage: image {
          seoImageUrl: url
        }
      }
      subtitle
      coverImage {
        coverImageData: gatsbyImageData
        coverImageAlt: alt
      }
      meta {
        firstPublishedAt(locale: $locale, formatString: "DD MMM YYYY")
      }
      author {
        authorName: name
        picture {
          authorPictureData: gatsbyImageData(height: 60, width: 60)
          authorPictureAlt: alt
        }
      }
      structuredBody {
        blocks 
        links {
          ... on DatoCmsBlogPost {
            __typename
            slug
            id: originalId
          }
          ... on DatoCmsOtherPage {
            __typename
            slug
            id: originalId
          }
          ... on DatoCmsHomepage {
            __typename
            id: originalId
          }
          ... on DatoCmsArchivePage {
            __typename
            id: originalId
          }
        }
        value
      }
    }
  }
`;


// blocks {
//   __typename
//   id: originalId
//   image {
//     gatsbyImageData
//     alt
//   }
// }