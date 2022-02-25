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
  debugger
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
          url
          alt
        }
        coverImage {
          url
          alt
        }
        category {
          name
        }
        subtitle
        title
        slug
        reference
      }
    }
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
    news{
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