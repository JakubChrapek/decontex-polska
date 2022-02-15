import React from 'react';
import { graphql } from 'gatsby';
import PageWrapper from '../components/layout/pageWrapper';
import styled from 'styled-components';
import Hero from '../components/layout/heroMainPage';
import ImageWithoutButton from '../components/layout/imageWithOutButton';

const HomePageTemplate = ({data, pageContext}) => {
  return (
    <PageWrapper
      pageData={pageContext}
      seoTitle={data.seoTitle}
      seoDescription={data.seoDescription}
    >
      <Hero data={data.datoCmsHomepage.hero[0]}/>
      <ImageWithoutButton data={data.datoCmsHomepage.imageFlex[0]}/>
    </PageWrapper>
  );
};

export default HomePageTemplate;

export const query = graphql`
query HomePage($locale: String!) {
  datoCmsHomepage(locale: { eq: $locale }) {
    locale
    hero {
      background {
        url
      }
      buttons {
        name {
          value
        }
        slug
        ariaLabel
      }
      text
      title {
        value
      }
    }
    imageFlex {
      bottomText
      isImgBackground
      isImgRight
      text
      img{
        url
      }
      title {
        value
      }
    }
    newsText
    newsTitle {
      value
    }
    grid {
      mainTitle {
        value
      }
      mainText
      firstImg {
        url
      }
      firstText
      secondImg {
        url
      }
      secondText
      thirdImg {
        url
      }
      subTitle {
        value
      }
      subText
      link {
        slug
        ariaLabel
        name {
          value
        }
      }
    }
    certificates {
      title {
        value
      }
      text
      images {
        img {
          url
          alt
        }
      }
    }
    advantages {
      title {
        value
      }
      text
      listRight {
        value
      }
      listLeft {
        value
      }
    }
  }
}
`;

// query HomePageTemplate($locale: String!) {
//   datoCmsHomepage(locale: { eq: $locale }) {
//     locale
//     seo {
//       seoTitle: title
//       seoDescription: description
//     }
//     hero {
//       heroAlt
//       heroTitle
//       heroSubtitle
//     }
//     features {
//       id: originalId
//       title
//       description
//     }
//     featuredPostsTitle
//   }
//   datoCmsOtherPage(locale: { eq: $locale }, reference: { eq: "guide" }) {
//     guidePageSlug: slug
//   }
//   allDatoCmsBlogPost(
//     sort: { order: ASC, fields: meta___firstPublishedAt }
//     filter: { locale: { eq: $locale }, featuredInHomepage: { eq: true } }
//     limit: 6
//   ) {
//     postNodes: nodes {
//       id: originalId
//       meta {
//         firstPublishedAt(locale: $locale, formatString: "DD MMM YYYY")
//       }
//       minutesOfReading
//       cardImage {
//         gatsbyImageData(
//           width: 280
//           height: 100
//           placeholder: NONE
//           forceBlurhash: false
//         )
//         squaredImage: gatsbyImageData(
//           width: 100
//           height: 100
//           imgixParams: { ar: "1", fit: "crop" }
//         )
//         alt
//       }
//       author {
//         authorName: name
//         picture {
//           authorImageData: gatsbyImageData(height: 30, width: 30)
//           authorImageAlt: alt
//         }
//       }
//       subtitle
//       title
//       slug
//       reference
//     }
//   }
//   datoCmsWebsiteSetting(locale: { eq: $locale }) {
//     minsReadSuffix
//     seeTheGuideButton
//     seeAllButton
//   }
// }