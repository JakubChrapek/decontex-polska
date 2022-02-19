import React from 'react';
import { graphql } from 'gatsby';
import { StructuredText } from 'react-datocms';
import Navigator from '../components/langHelpers/navigator';
import PageWrapper from '../components/layout/pageWrapper';
import Hero from '../components/layout/hero'
import Text from '../components/layout/text';
import ImageWithButton from '../components/layout/imageWithButton';
import ImageWithBackgroundWave from '../components/layout/imageWithBackgroundWave';
import StagesWithInform from '../components/layout/stagesWithInform';
import Faq from '../components/layout/faq';

const OtherPageTemplate = ({
  data: {
    datoCmsOtherPage: {
      seo: {
        seoTitle,
        seoDescription,
        image: { seoImageUrl },
      },
      structuredBody,
    },
  },
  pageContext,
}) => {
  return (
    <PageWrapper
      pageData={pageContext}
      seoTitle={seoTitle}
      seoDescription={seoDescription}
      seoImage={seoImageUrl}
    >
      {structuredBody?.value && (
        <StructuredText
          data={structuredBody}
          renderBlock={({ record }) => {
            switch (record.__typename) {
              case 'DatoCmsSectionHero':
                return <Hero data={record} />
              case 'DatoCmsSectionText':
                return <Text data={record} />
              case 'DatoCmsSectionImageWithButton':
                return <ImageWithButton data={record} />
              case 'DatoCmsSectionImageWithBackgroundWave':
                return <ImageWithBackgroundWave data={record} />
              case 'DatoCmsSectionStagesWithInform':
                return <StagesWithInform data={record} />
              case 'DatoCmsSectionFaq':
                return <Faq data={record} />
              default:
                return null
            }
          }}
        />
      )}
    </PageWrapper>
  );
};
export default OtherPageTemplate;

export const query = graphql`
  query OtherPageQuery($locale: String!, $id: String!) {
    datoCmsOtherPage(locale: { eq: $locale }, originalId: { eq: $id }) {
      seo {
        seoTitle: title
        seoDescription: description
        image {
          seoImageUrl: url
        }
      }
      structuredBody {
        value
        blocks {
        ... on DatoCmsSectionImageWithBackgroundWave {
          __typename
          id: originalId
          textPart {
            value
          }
          img {
            url
          }
        }
        ... on DatoCmsSectionStagesWithInform {
          __typename
          id: originalId
          stages {
            title {
              value
            }
            subText {
              value
            }
            listRight {
              value
            }
            listLeft {
              value
            }
          }
          inform {
            title {
              value
            }
            grid {
              sText {
                value
              }
              icon {
                url
              }
            }
          }
        }
        ... on DatoCmsSectionAdvantage {
          __typename
          id: originalId
          title {
            value
          }
          listRight {
            value
          }
          listLeft {
            value
          }
        }
        ... on DatoCmsSectionBenefit {
          __typename
          id: originalId
          title {
            value
          }
          benefits {
            title {
              value
            }
            text
            icon {
              url
            }
          }
        }
        ... on DatoCmsSectionFaq {
          __typename
          id: originalId
          title {
            value
          }
          questions {
            answer {
              value
            }
            question {
              value
            }
          }
        }
        ... on DatoCmsSectionHero {
          __typename
          id: originalId
          title {
            value
          }
          text
          img {
            url
          }
        }
        ... on DatoCmsSectionImageWithButton {
          __typename
          id: originalId
          title {
            value
          }
          isImgRight
          isImgBackground
          button {
            ariaLabel
            name {
              value
            }
            slug
          }
          img {
            url
          }
          text
        }
        ... on DatoCmsSectionImageWithTextBackground {
          __typename
          id: originalId
          title {
            value
          }
          subText {
            value
          }
          list {
            value
          }
          img {
            url
          }
        }
        ... on DatoCmsSectionPrice {
          __typename
          id: originalId
          title {
            value
          }
          table {
            price
            name
            itemList {
              value
            }
          }
        }
        ... on DatoCmsSectionService {
          __typename
          id: originalId
          sectionImageWithButton {
            title {
              value
            }
            text
            isImgRight
            isImgBackground
            button {
              slug
              ariaLabel
              name {
                value
              }
            }
            img {
              url
            }
          }
        }
        ... on DatoCmsSectionText {
          __typename
          id: originalId
          sText {
            value
          }
        }
      }
    }
  }
  }`;
