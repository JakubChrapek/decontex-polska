import React from 'react'
import { graphql } from 'gatsby'
import { StructuredText } from 'react-datocms'
import PageWrapper from '../components/layout/pageWrapper'
import Navigator from '../components/langHelpers/navigator'
import styled from 'styled-components'
import News from '../components/layout/news'
import Waves from '../components/vectors/heroOtherPageWaves'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { useState } from 'react'

const BlogPostTemplate = ({ data, pageContext }) => {
  const { datoCmsBlogPost: { coverImage } } = data;

  return (
    <PageWrapper
      pageData={pageContext}
      seoTitle={data.datoCmsBlogPost.seo.seoTitle}
      seoDescription={data.datoCmsBlogPost.seo.seoDescription}
      seoImage={data.datoCmsBlogPost.seo.seoImageUrl}
    >
      <Wrapper>
        <Content categoryColor={data.datoCmsBlogPost.category.color.hex}>
          <div className='flex'>
            <Link to="/blog/" state={{ category: data.datoCmsBlogPost.category.name }}>
              <span>{data.datoCmsBlogPost.category.name}</span>
            </Link>
            <p>{data.datoCmsBlogPost.meta.firstPublishedAt}</p>
          </div>
          <h1>{data.datoCmsBlogPost.title}</h1>
          <GatsbyImage image={coverImage.gatsbyImageData} alt={coverImage.alt} title={coverImage.title} />
          <div className='content'>
            {data.datoCmsBlogPost.structuredBody?.value && (
              <StructuredText
                key={data.datoCmsBlogPost.originalId}
                data={data.datoCmsBlogPost.structuredBody}
                renderBlock={({ record }) => {
                  switch (record.__typename) {
                    case "DatoCmsBlogImage":
                      return <GatsbyImage image={record.image.gatsbyImageData} alt={record.image.alt} title={record.image.title} />
                    default:
                      return null
                  }
                }}
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
                      )
                    case 'DatoCmsBlogPost':
                      return (
                        <Navigator {...transformedMeta} article to={recordSlug}>
                          {children}
                        </Navigator>
                      )
                    case 'DatoCmsArchivePage':
                      return (
                        <Navigator {...transformedMeta} archive>
                          {children}
                        </Navigator>
                      )
                    case 'DatoCmsHomepage':
                      return (
                        <Navigator {...transformedMeta} home>
                          {children}
                        </Navigator>
                      )
                    default:
                      return null;
                  }
                }}
                renderInlineRecord={({ record }) => {
                  switch (record.__typename) {
                    case 'DatoCmsOtherPage':
                      return (
                        <Navigator page to={record.slug}>
                          link
                        </Navigator>
                      )
                    case 'DatoCmsBlogPost':
                      return (
                        <Navigator article to={record.slug}>
                          link
                        </Navigator>
                      )
                    case 'DatoCmsArchivePage':
                      return (
                        <Navigator archive>
                          link
                        </Navigator>
                      )
                    case 'DatoCmsHomepage':
                      return (
                        <Navigator home>
                          link
                        </Navigator>
                      )
                    default:
                      return null;
                  }
                }}
              />
            )}
          </div>
        </Content>
        {data.allDatoCmsBlogPost.blogPostNodes.filter(el => el.title !== data.datoCmsBlogPost.title && el.category.name === data.datoCmsBlogPost.category.name).length >= 3
          ? <News data='Podobne artykuły' posts={data.allDatoCmsBlogPost.blogPostNodes.filter(el => el.title !== data.datoCmsBlogPost.title && el.category.name === data.datoCmsBlogPost.category.name)} />
          : <News data='Podobne artykuły'
            posts={[...data.allDatoCmsBlogPost.blogPostNodes.filter(el => el.title !== data.datoCmsBlogPost.title && el.category.name === data.datoCmsBlogPost.category.name),
            ...data.allDatoCmsBlogPost.blogPostNodes.filter(el => el.title !== data.datoCmsBlogPost.title && el.category.name !== data.datoCmsBlogPost.category.name)
            ]} />
        }

        <Waves />
      </Wrapper>
    </PageWrapper>
  )
}

export default BlogPostTemplate;

export const query = graphql`
  query BlogPostTemplateQuery(
    $id: String!
    $locale: String!
    $skipNext: Int!
    $skipPrevious: Int!
  ) {
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
    allDatoCmsBlogPost(
      sort: { order: ASC, fields: meta___firstPublishedAt }
      filter: {
        id: { ne: "DatoCmsBlogPost-111857832-pl" }
        locale: { eq: "pl" }
      }
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
          title
          url
          alt
        }
        coverImage {
          gatsbyImageData
          title
          url
          alt
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
      publicationDate(formatString: "DD MMMM YYYY")
      cardImage {
        gatsbyImageData
        alt
        title
      }
      coverImage {
        gatsbyImageData
        alt
        title
      }
      meta {
        firstPublishedAt(locale: $locale, formatString: "DD MMM YYYY")
      }
      category {
        name
        color {
          hex
        }
      }
      structuredBody {
        blocks {
          __typename
          id: originalId
          image {
            gatsbyImageData
            title
            url
            alt
          }
        }
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




const Wrapper = styled.div`
  background-color: var(--backgroundGrey);
  position: relative;
  max-width: 1920px;
  margin: 0 auto;

  .wrapper{
    z-index: 0;
    bottom: 0;
    height: calc(100% - 500px);
    background-color: #FFF;
    top: unset;

    svg{
      top: 0;
      bottom: unset;
      transform: translateY(-99%);
      path{

      }
    }
  }
`

const Content = styled.div`
  max-width: 1158px;
  width: 100%;
  padding: 0 35px;
  @media (max-width: 640px) {
    padding: 0 16px;
  }
  padding-top: 180px;
  margin: 0 auto;
  position: relative;
  z-index: 2;

  h1 {
    color: var(--superBlackText);
    margin-bottom: 68px;
    margin-top: 36px;
    font-size: clamp(32px, 5.2vw, 40px);
    line-height: 1.1;
    letter-spacing: -1px;
  }
  
  @media (max-width: 767px) {
    h1 {
      margin-bottom: 54px;
    }
    .gatsby-image-wrapper {
    aspect-ratio: 1.8/1;
    margin: 0 auto 64px;

  }
  }

  .gatsby-image-wrapper {
    border-radius: 16px;
    margin: 0 auto 48px;
    @media (max-width: 767px) {
      margin-bottom: 32px;
    }
    + p {
      margin-top: 24px;
    }
  }
  p + .gatsby-image-wrapper {
    margin-top: 42px;
  }

  .flex {
    display: flex;
    align-items: center;

    a{
      border-radius: 15px;
      padding: 10px;

    }

    span {
      color: ${(props) => props.categoryColor};
      background: #ffffff;
      border-radius: 15px;
      padding: 10px;
      margin-right: 16px;
      transition: background-color .2s linear, color .2s linear;
      position: relative;

      &:before {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: ${(props) => `${props.categoryColor}22`};
        border-radius: 15px;
        transition: opacity 0.2s linear;
      }

      &:hover {
        color: var(--mainLightText);
        background-color: ${(props) => props.categoryColor};

        &::before {
          opacity: 0;
        }
      }
    }

    p {
      color: var(--subDarkText);
    }
  }

  .coverImg {
    width: 100%;
    border-radius: 15px;
    margin-bottom: 48px;
  }

  .content {
    max-width: 744px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;

    blockquote {
      position: relative;
      margin: 48px 0;
      padding-left: 21px;
      margin-left: 0;
      margin-right: 0;

      &::before {
        content: '‘‘';
        font-family: auto;
        position: absolute;
        left: -27px;
        top: -17px;
        letter-spacing: -8px;
        font-size: 100px;
        color: var(--active);
      }
      @media (max-width: 640px) {
        padding-left: 36px;
        &::before {
          left: -8px;
          top: -14px;
          font-size: 88px;
        }
      }

      p {
        font-weight: bold;
        font-size: 24px;
        line-height: 1.3;
        letter-spacing: 0px;
        color: var(--superDarkText);
      }
    }

    p {
      font-size: 20px;
      line-height: 180%;
      color: var(--subDarkText);

      &:last-child {
        margin-bottom: 0;
      }

      + p {
        margin-top: 24px;
      }
    }

    h2 {
      margin-top: 48px;
      font-weight: bold;
      font-size: 32px;
      line-height: 130%;
      letter-spacing: -0.5px;
      color: var(--superDarkText);
      + p {
        margin-top: 24px;
      }
    }

    h3 {
      margin-top: 40px;
      font-weight: bold;
      font-size: 26px;
      line-height: 1.3;
      letter-spacing: -0.4px;
      color: var(--superDarkText);
      + p {
        margin-top: 20px;
      }
    }

    ul {
      display: grid;
      grid-row-gap: 16px;
      margin: 42px 0;

      li {
        padding-left: 28px;
        position: relative;

        > ul {
          margin-top: 16px;
          margin-bottom: 8px;
        }

        &::before {
          content: '●';
          position: absolute;
          left: 0;
          color: #f4eee6;
          font-size: 20px;
          line-height: 180%;
        }

        p {
          margin: 0;
        }
      }
    }
  }

  @media (max-width: 1024px) {
    padding-top: 140px;
  }
`;