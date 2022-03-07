import React from 'react';
import { graphql } from 'gatsby';
import PageWrapper from '../components/layout/pageWrapper';
import Hero from '../components/layout/heroMainPage';
import ImageWithoutButton from '../components/layout/imageWithOutButton';
import Grid from '../components/layout/gridMainPage';
import Advantages from '../components/layout/advantages';
import Certificates from '../components/layout/certificates';
import News from '../components/layout/news';

const HomePageTemplate = ({ data, pageContext }) => {
  return (
    <PageWrapper
      pageData={pageContext}
      seoTitle={data.seoTitle}
      seoDescription={data.seoDescription}
    >
      <Hero data={data.datoCmsHomepage.hero[0]} />
      <ImageWithoutButton data={data.datoCmsHomepage.imageFlex[0]} />
      <Grid data={data.datoCmsHomepage.grid[0]} />
      <Advantages data={data.datoCmsHomepage.advantages[0]} />
      <Certificates data={data.datoCmsHomepage.certificates[0]} />
      <News data={data.datoCmsHomepage.news[0]} posts={data.allDatoCmsBlogPost.blogPostNodes.filter(el => el.featuredInHomepage)} />
    </PageWrapper>
  );
};

export default HomePageTemplate;

export const query = graphql`
  query HomePage($locale: String!) {
    allDatoCmsBlogPost(
      sort: { order: ASC, fields: meta___firstPublishedAt }
      filter: { locale: { eq: $locale } }
    ) {
      blogPostNodes: nodes {
        featuredInHomepage
        id: originalId
        meta {
          firstPublishedAt(locale: $locale, formatString: "DD MMM YYYY")
        }
        minutesOfReading
        cardImage {
          gatsbyImageData
          url
          alt
          title
        }
        coverImage {
          gatsbyImageData
          url
          alt
          title
        }
        category {
          name
          color {
            hex
          }
        }
        publicationDate(formatString: "DD MMMM YYYY")
        title
        slug
        reference
      }
    }
    datoCmsHomepage(locale: { eq: $locale }) {
      locale
      hero {
        background {
          alt
          title
          gatsbyImageData(placeholder: BLURRED)
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
        img {
          url
          gatsbyImageData
          alt
          title
        }
        title {
          value
        }
      }
      news {
        buttonText
        text
        title {
          value
        }
      }
      grid {
        mainTitle {
          value
        }
        mainText
        firstImg {
          url
          gatsbyImageData
          alt
          title
        }
        firstText
        secondImg {
          url
          gatsbyImageData
          alt
          title
        }
        secondText
        thirdImg {
          url
          gatsbyImageData
          alt
          title
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
            gatsbyImageData
            alt
            title
          }
        }
      }
      advantages {
        title {
          value
        }
        text
        listRight {
          title
          text
        }
        listLeft {
          title
          text
        }
      }
    }
  }
`;

// query HomePageTemplate($locale: String!) {
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
//       publicationDate(formatString: "DD MMMM YYYY")
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