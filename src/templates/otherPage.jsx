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
import ListWithBackgroundWave from '../components/layout/listWithBackgroundWave';
import LinksToPrice from '../components/layout/linksToPrice';
import Price from '../components/layout/price';
import ImageWithTextBackground from '../components/layout/imageWithTextBackground';
import CustomContent from '../components/layout/customContent';
import HeroPartner from '../components/layout/heroPartner';
import PartnersContent from '../components/layout/partnersContent';

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
              case 'DatoCmsSectionListWithBackgroundWave':
                return <ListWithBackgroundWave data={record} />
              case 'DatoCmsSectionLinksToPrice':
                return <LinksToPrice data={record} />
              case 'DatoCmsSectionPrice':
                return <Price data={record} />
              case 'DatoCmsSectionImageWithTextBackground':
                return <ImageWithTextBackground data={record} />
              case 'DatoCmsSectionCustomContent':
                return <CustomContent data={record} />
              case 'DatoCmsSectionHeroPartner':
                return <HeroPartner data={record} />
              case 'DatoCmsSectionPartnersContent':
                return <PartnersContent data={record} />
              case 'DatoCmsSectionContactInformation':
                return <></>
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
  datoCmsOtherPage(locale: {eq: $locale}, originalId: {eq: $id}) {
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
          anotation{
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
        ... on DatoCmsSectionLinksToPrice {
          __typename
          id: originalId
          grid {
            text
            img {
              url
            }
          }
          imageWithButton {
            text
            title {
              value
            }
            button {
              slug
              ariaLabel
              name {
                value
              }
            }
            img{
              url
            }
            isImgRight
            isImgBackground
          }
        }
        ... on DatoCmsSectionListWithBackgroundWave {
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
        ... on DatoCmsSectionCustomContent {
          __typename
          id: originalId
          content {
            value
          }
        }
        ... on DatoCmsSectionHeroPartner {
          __typename
          id: originalId
          title {
            value
          }
          text
          images {
            url
          }
        }
        ... on DatoCmsSectionPartnersContent {
          __typename
          id: originalId
          grid {
            text
            unsTitle
            otherInform {
              value
            }
          }
        }
        ... on DatoCmsSectionContactInformation {
          __typename
          id: originalId
          tableInform {
            value
          }
          leftInform {
            value
          }
        }
      }
    }
  }
}
`;
