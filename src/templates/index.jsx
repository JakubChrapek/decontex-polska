import React from 'react';
import { graphql } from 'gatsby';
import PageWrapper from '../components/layout/pageWrapper';
import Navigator from '../components/langHelpers/navigator';
import Hero from '../components/layout/hero';
import {
  SectionContainerGridThreeCols,
  SectionWrapper,
  SectionTitleContainer,
  TextBox,
} from '../components/layout/sectionStyles';
import { HeadingSmall, SectionTitle } from '../components/layout/headingStyles';
import { Paragraph } from '../components/layout/paragraphStyles';
import ArticleCard, { CardImgArtDir } from '../components/ui/articleCard';
import styled from 'styled-components';

const HomePageTemplate = ({
  data: {
    datoCmsHomepage: {
      seo: { seoTitle, seoDescription },
      hero: [heroEntry],
      // features,
      // featuredPostsTitle,
    },
    // datoCmsOtherPage: { guidePageSlug },
    // allDatoCmsBlogPost: { postNodes },
    // datoCmsWebsiteSetting: { seeTheGuideButton, seeAllButton, minsReadSuffix },
  },
  pageContext,
}) => {
  const { heroAlt, heroTitle, heroSubtitle } = heroEntry;

  return (
    <PageWrapper
      pageData={pageContext}
      seoTitle={seoTitle}
      seoDescription={seoDescription}
    >
      {/* <Hero
        hasDivider
        alt={heroAlt}
        title={heroTitle}
        subtitle={heroSubtitle}
        button={
          <Navigator
            className="classicButton classicButtonOutline"
            page
            to={guidePageSlug}
          >
            {seeTheGuideButton}
          </Navigator>
        }
        sectionChildren={
          <SectionContainerGridThreeCols>
            {features.map(({ id, title, description }) => (
              <TextBox small key={id}>
                <HeadingSmall hasTip>{title}</HeadingSmall>
                <Paragraph>{description}</Paragraph>
              </TextBox>
            ))}
          </SectionContainerGridThreeCols>
        }
      /> */}
      {/* <SectionWrapper>
        <SectionTitleContainer hasButton>
          <SectionTitle>{featuredPostsTitle}</SectionTitle>
          <Navigator className="classicButton classicButtonOutline" archive>
            {seeAllButton}
          </Navigator>
        </SectionTitleContainer>
        <SectionContainerGridThreeCols>
          {postNodes.map(
            ({
              id,
              meta: { firstPublishedAt },
              minutesOfReading,
              cardImage,
              title,
              subtitle,
              author: {
                authorName,
                picture: { authorImageData, authorImageAlt },
              },
              slug,
            }) => (
              <ArticleCard
                key={id}
                date={firstPublishedAt}
                time={`${minutesOfReading} ${minsReadSuffix}`}
                cardImg={
                  cardImage &&
                  CardImgArtDir(
                    cardImage.gatsbyImageData,
                    cardImage.squaredImage,
                    cardImage.alt
                  )
                }
                title={title}
                excerpt={subtitle}
                authorImg={authorImageData}
                authorAltImg={authorImageAlt}
                authorName={authorName}
                slug={slug}
              />
            )
          )}
        </SectionContainerGridThreeCols>
      </SectionWrapper> */}
      <ComingSoon
        title="Trwają prace nad stroną"
        subtitle="Dbamy o zdrowie i życie strażaków "
      />
    </PageWrapper>
  );
};

const ComingSoonWrapper = styled.section`
  background: var(--primaryDark);
`

const SectionContainer = styled.div`
  max-width: var(--globalContainer);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Title = styled.p`
  font-size: clamp(52px, 5vw, 72px);
  line-height: 1.05;
  font-weight: 700;
  letter-spacing: -0.05em;
  color: #fff;
`

const Subtitle = styled.p`
  color: #ffffffB8;
  font-size: clamp(16px, 1.25vw, 18px);
  line-height: 1.75;
  font-weight: 400;
  margin-top: clamp(26px, 2.5vw, 36px);
`;

const ComingSoon = ({title, subtitle}) => {
  return (
    <ComingSoonWrapper>
      <SectionContainer as="div">
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </SectionContainer>
    </ComingSoonWrapper>
  );
}

export default HomePageTemplate;

export const query = graphql`
  query HomePageTemplate($locale: String!) {
    datoCmsHomepage(locale: { eq: $locale }) {
      locale
      seo {
        seoTitle: title
        seoDescription: description
      }
      hero {
        heroAlt
        heroTitle
        heroSubtitle
      }
      features {
        id: originalId
        title
        description
      }
      featuredPostsTitle
    }
    datoCmsOtherPage(locale: { eq: $locale }, reference: { eq: "guide" }) {
      guidePageSlug: slug
    }
    allDatoCmsBlogPost(
      sort: { order: ASC, fields: meta___firstPublishedAt }
      filter: { locale: { eq: $locale }, featuredInHomepage: { eq: true } }
      limit: 6
    ) {
      postNodes: nodes {
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
          authorName: name
          picture {
            authorImageData: gatsbyImageData(height: 30, width: 30)
            authorImageAlt: alt
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
      seeTheGuideButton
      seeAllButton
    }
  }
`;
