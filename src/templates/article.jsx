import React from 'react'
import { graphql } from 'gatsby'
import { StructuredText } from 'react-datocms'
import PageWrapper from '../components/layout/pageWrapper'
import Navigator from '../components/langHelpers/navigator'
import styled from 'styled-components'
import News from '../components/layout/news'
import Waves from '../components/vectors/heroOtherPageWaves'
import { Link } from 'gatsby'

const BlogPostTemplate = ({ data, pageContext }) => {
  const { skipNext } = pageContext
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
          <img className='coverImg' src={data.datoCmsBlogPost.cardImage.cardImageData.images.fallback.src} />
          <div className='content'>
            {data.datoCmsBlogPost.structuredBody?.value && (
              <StructuredText
                key={data.datoCmsBlogPost.originalId}
                data={data.datoCmsBlogPost.structuredBody}
                renderBlock={({ record }) => {
                  switch (record.__typename) {
                    case "DatoCmsBlogImage":
                      return <img src={record.image.url} alt={record.image.alt} />
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
        <News data={data.datoCmsBlogPost.blogNewsTitle} posts={data.allDatoCmsBlogPost.blogPostNodes} />
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
          url
          alt
        }
        coverImage {
          url
          alt
        }
        category {
          name
          color{
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
        cardImageData: gatsbyImageData
        cardImageAlt: alt
      }
      meta {
        firstPublishedAt(locale: $locale, formatString: "DD MMM YYYY")
      }
      category {
        name
        color{
          hex
        }
      }
      structuredBody {
        blocks {
          __typename
          id: originalId
          image {
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
      blogNewsTitle
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
  padding-top: 180px;
  margin: 0 auto;
  position: relative;
  z-index: 2;

  h1{
    color: var(--superBlackText);
    margin-bottom: 68px;
    margin-top: 36px;
    font-size: clamp(32px, 5.2vw, 40px);
    letter-spacing: -1px;
  }

  .flex{
    display: flex;
    align-items: center;

    span{
      color: ${props => props.categoryColor};
      background: #FFFFFF;
      border-radius: 15px;
      padding: 10px;
      margin-right: 16px;
    }

    p{
      color: var(--subDarkText);
    }
  }

  .coverImg{
    width: 100%;
    border-radius: 15px;
    margin-bottom: 48px;
  }

  .content{
    max-width: 744px;
    margin: 0 auto;

    p{
      margin: 24px 0;
      font-size: 20px;
      line-height: 180%;
      color: var(--subDarkText);

      &:last-child{
        margin-bottom: 0;
      }
    }

    h2{
      margin-top: 48px;
    }

    ul{
      display: grid;
      grid-row-gap: 16px;
      margin: 42px 0;

      li{
        padding-left: 28px; 
        position: relative;

        &::before{
            content: "●";
            position: absolute;
            left: 0;
            color: #F4EEE6;
            font-size: 20px;
            line-height: 180%;
        }

        p{
          margin: 0;
        }
      }

    }

    img{
      width: 100%;
      margin: 42px 0;
    }
  }
`