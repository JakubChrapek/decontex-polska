import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import PageWrapper from '../components/layout/pageWrapper';
import useLanguages from '../hooks/useLanguages';
import styled from 'styled-components';
import { ArrowRight } from '../components/vectors/arrows';
import { Link } from "gatsby"
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';

const BlogArchiveTemplate = (props) => {
  // debugger
  const { defaultLanguage, blogPath } = useLanguages();
  const { pagesNumber, archivePageNumber, locale } = props.pageContext;

  let choosenPosts = props.data.allDatoCmsBlogPost.blogPostNodes.filter(el => el.featuredInHomepage)

  const [preFiltredPosts, changePreFiltredPosts] = useState(props.data.allDatoCmsBlogPost.blogPostNodes.filter(el => el.title != choosenPosts[0].title))
  const [filtredPosts, changeFiltredPosts] = useState(preFiltredPosts)

  useEffect(() => {
    // debugger
    if (props.location.state != null) {
      if (props.location.state.category != null) {
        document.querySelectorAll('.filterItem').forEach(el => el.classList.remove('active'))
        document.querySelector('.' + props.location.state.category).classList.add('active')
      }
    }
  }, [])

  function filter(type) {
    // debugger
    if (type === 'all') {
      changeFiltredPosts(preFiltredPosts)
    } else {
      changeFiltredPosts(preFiltredPosts.filter(el => el.category.name === type))
    }

    document.querySelectorAll('.filterItem').forEach(el => el.classList.remove('active'))
    document.querySelector('.' + type.replace(/\s/g, '')).classList.add('active')
  }


  return (
    <PageWrapper
      pageData={props.pageContext}
      seoTitle={props.data.datoCmsArchivePage.seo.seoTitle}
      seoDescription={props.data.datoCmsArchivePage.seo.seoDescription}
    >
      <Wrapper>
        <Container className="container">
          <Hero>
            <h1>{choosenPosts[0].featuredTitle}</h1>
            <p>{choosenPosts[0].featuredText}</p>
            <div className='imageBox'>
              <div>
                <span>{choosenPosts[0].category.name}</span>
                <p className='title'>{choosenPosts[0].title}</p>
                <p className='date'>{choosenPosts[0].subtitle}</p>
              </div>
              <img src={choosenPosts[0].cardImage.url} />
            </div>
          </Hero>
          <Controls>
            <h2>{props.data.datoCmsArchivePage.locale === 'pl' ? 'Wybierz kategorie' : 'Choose category'}</h2>
            <ul>
              <li
                onClick={() => { filter('all') }}
                className={'all filterItem active'}>
                {props.data.datoCmsArchivePage.locale === 'pl' ? 'Wszystkie' : 'All'}
              </li>
              {props.data.allDatoCmsCategory.nodes.map(el => (
                <li
                  className={el.name.replace(/\s/g, '') + ' filterItem'}
                  onClick={() => { filter(el.name) }}>
                  {el.name}
                </li>
              ))}
            </ul>
          </Controls>
          <AnimateSharedLayout>
            <AnimatePresence exitBeforeEnter>
              <Grid layout>
                  {filtredPosts.map(
                    (el) => (
                      <motion.li initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} key={el.title} layout>
                        <Link to={el.slug}>
                          <img src={el.coverImage.url} />
                        </Link>
                        <motion.span>{el.category.name}</motion.span>
                        <motion.h3>{el.title}</motion.h3>
                        <Link to={el.slug}>Czytaj dalej <ArrowRight /></Link>
                      </motion.li>
                    )
                  )}
              </Grid>
            </AnimatePresence>
          </AnimateSharedLayout>
        </Container>
      </Wrapper>
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
        featuredInHomepage
        featuredTitle
        featuredText
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
    allDatoCmsCategory(
      filter: { locale: { eq: $locale } }
    ) {
      nodes {
        name
      }
    }
    datoCmsWebsiteSetting(locale: { eq: $locale }) {
      minsReadSuffix
    }
  }
`;

const Wrapper = styled.div`
  padding-top: 192px;
  padding-bottom: 160px;
`

const Container = styled.div`

`

const Hero = styled.div`
  h1{
    color: var(--superBlackText);
    max-width: 726px;
    margin: 0 auto;
    text-align: center;
    margin-bottom: 12px;
    font-size: 48px;
    line-height: 130%;
    letter-spacing: -1px;
  }
  
  p{
    max-width: 726px;
    margin: 0 auto;
    text-align: center;
    font-size: 18px;
    line-height: 180%;
  }

  .imageBox{
    position: relative;
    margin-top: 100px;

    div{
      position: absolute;
      bottom: 0;
      padding: 50px;

      span{
        background-color: var(--mainLightText);
        color: var(--active);
        padding: 10px;
        border-radius: 8px;
      }

      .title{
        color: var(--mainLightText);
        margin: 26px 0 16px 0;
        text-align: left;
        font-weight: bold;
        font-size: 24px;
        line-height: 110%;
        letter-spacing: 0px;
      }

      .date{
        font-size: 16px;
        line-height: 180%;
        color: var(--subLightText);
        text-align: left;

      }
    }

    img{
      width: 100%;
      border-radius: 15px;
    }

  }
`

const Controls = styled.div`

  h2{
    margin-top: 72px;
    margin-bottom: 28px;
  }

  ul{
    display: flex;
    margin-bottom: 40px;
    
    li{
      margin-right: 16px;
      margin-bottom: 16px;
      padding: 14px 32px;
      border-radius: 8px;
      color: var(--mainDarkText);
      font-size: 16px;
      line-height: 21px;
      border: 1px solid var(--divider);
      cursor: pointer;
      transition: .2s ease-in-out;

      &.active{
        color: var(--mainLightText);
        border: 1px solid var(--active);
        background-color: var(--active);
      }
    }
  }

`

const Grid = styled(motion.ul)`
  display: grid;
  grid-gap: 40px; 
  grid-template-columns: 1fr 1fr 1fr;

  li{

    span{
      margin-top: 32px;
      margin-bottom: 8px;
      letter-spacing: 0.8px;
      text-transform: uppercase;
      font-weight: bold;
      font-size: 14px;
      line-height: 170%;
      color: var(--formDarkText);
      display: block;
    }

    h3{
      color: var(--superDarkText);
      font-weight: bold;
      font-size: 24px;
      line-height: 110%;
      letter-spacing: 0px;
    }

    a{
      color: var(--active);
      margin-top: 20px;
      display: flex;
      align-items: center;

      svg{
        margin-left: 10px;
        path{
          stroke: var(--active);
        }
      }
    }

    img{
      width: 100%;
      border-radius: 15px;
    }
  }
`