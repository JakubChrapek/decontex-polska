import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import PageWrapper from '../components/layout/pageWrapper';
import styled from 'styled-components';
import { Link } from "gatsby"
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import { StructuredText } from 'react-datocms';
import { ArrowLeft, ArrowRight } from "../components/vectors/arrows";

const BlogArchiveTemplate = (props) => {

  const [choosenPosts, changeChoosenPosts] = useState(props.data.allDatoCmsBlogPost.blogPostNodes.filter(el => el.featuredInHomepage))
  const [canRight, changeCanRight] = useState(true)
  const [canLeft, changeCanLeft] = useState(false)
  const [preFiltredPosts, changePreFiltredPosts] = useState(props.data.allDatoCmsBlogPost.blogPostNodes.filter(el => el.title != choosenPosts[0].title))
  const [currentPage, changeCurrentPage] = useState(1)
  const [preFiltredPagesCount, changePreFiltredPagesCount] = useState(Math.ceil(preFiltredPosts.length / 9))
  const [filtredPagesCount, changeFiltredPagesCount] = useState(null)
  const [filtredPosts, changeFiltredPosts] = useState(preFiltredPosts.filter((el, id) => id < 9 * currentPage))
  const [filtredType, changeFiltredType] = useState(props.location.state?.category ? props.location.state?.category : 'all')

  useEffect(() => {
    if (props.location.state?.category != null) {
      document.querySelectorAll('.filterItem').forEach(el => el.classList.remove('active'))
      document.querySelector('.' + props.location.state.category.replace(/\s/g, '')).classList.add('active')
      filter(props.location.state.category.replace(/\s/g, ''))
      changeFiltredType(props.location.state.category.replace(/\s/g, ''))
    }
  }, [])

  useEffect(() => {
    if (filtredType !== 'all') {
      changeFiltredPosts(preFiltredPosts.filter(el => el.category.name === filtredType).filter((el, id) => id < 9))
      canPaginate(Math.ceil(preFiltredPosts.filter(el => el.category.name === filtredType).length / 9))
    } else {
      changeFiltredPosts(preFiltredPosts.filter((el, id) => id < 9 * currentPage && id >= 9 * (currentPage - 1)))
      canPaginate(preFiltredPagesCount)
    }
  }, [currentPage])

  function filter(type) {
    changeFiltredType(type)

    if (type === 'all') {
      changeFiltredPosts(preFiltredPosts.filter((el, id) => id < 9))
      canPaginate(preFiltredPagesCount)
      changeCurrentPage(1)
    } else {
      canPaginate(Math.ceil(preFiltredPosts.filter(el => el.category.name === type).length / 9))
      changeFiltredPosts(preFiltredPosts.filter(el => el.category.name === type).filter((el, id) => id < 9))
      changeCurrentPage(1)
    }

    document.querySelectorAll('.filterItem').forEach(el => el.classList.remove('active'))
    document.querySelector('.' + type.replace(/\s/g, '')).classList.add('active')
  }

  function pagination(direct) {
    if (direct === 'left' && canLeft) {
      changeCurrentPage(currentPage - 1)
    } else if (direct === 'right' && canRight) {
      changeCurrentPage(currentPage + 1)
    }
  }

  function canPaginate(currentPagesCount) {
    changeFiltredPagesCount(currentPagesCount)
    if (currentPagesCount === 1) {
      changeCanRight(false)
      changeCanLeft(false)
    } else if (currentPage === 1) {
      changeCanRight(true)
      changeCanLeft(false)
    } else if (currentPage === currentPagesCount) {
      changeCanRight(false)
      changeCanLeft(true)
    } else {
      changeCanRight(true)
      changeCanLeft(true)
    }
  }

  debugger
  return (
    <PageWrapper
      pageData={props.pageContext}
      seoTitle={props.data.datoCmsArchivePage.seo.seoTitle}
      seoDescription={props.data.datoCmsArchivePage.seo.seoDescription}
    >
      <Wrapper>
        <Container className="container">
          <Hero>
            <StructuredText data={props.data.datoCmsArchivePage.title} />
            <p>{props.data.datoCmsArchivePage.text}</p>
            <div className='imageBox'>
              <div>
                <Category categoryColor={choosenPosts[0].category.color.hex} onClick={() => { filter(choosenPosts[0].category.name); }}>{choosenPosts[0].category.name}</Category>
                <p className="title">{choosenPosts[0].title}</p>
                <p className="date">{choosenPosts[0].publicationDate}</p>
              </div>
              <img src={choosenPosts[0].coverImage.url} />
            </div>
          </Hero>
          <Controls>
            <h2>
              {props.data.datoCmsArchivePage.locale === 'pl'
                ? 'Wybierz kategorię'
                : 'Choose category'}
            </h2>
            <div>
              <button
                onClick={() => {
                  filter('all');
                }}
                className={'all filterItem active'}
              >
                {props.data.datoCmsArchivePage.locale === 'pl'
                  ? 'Wszystkie'
                  : 'All'}
              </button>
              {props.data.allDatoCmsCategory.nodes.map((el) => (
                <button
                  className={el.name.replace(/\s/g, '') + ' filterItem'}
                  onClick={() => {
                    filter(el.name);
                  }}
                >
                  {el.name}
                </button>
              ))}
            </div>
          </Controls>
          <AnimateSharedLayout>
            <AnimatePresence exitBeforeEnter>
              <Grid layout>
                {filtredPosts.map((el) => (
                  <motion.li
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={el.title}
                    layout
                  >
                    <Link className='imgWrapp' to={el.slug}>
                      <img src={el.cardImage.url} />
                    </Link>
                    <motion.span>{el.category.name}</motion.span>
                    <motion.h3>{el.title}</motion.h3>
                    <Link to={el.slug}>
                      Czytaj dalej <ArrowRight />
                    </Link>
                  </motion.li>
                ))}
              </Grid>
            </AnimatePresence>
          </AnimateSharedLayout>
          <Pagination>
            <button
              disabled={!canLeft}
              onClick={() => {
                pagination('left')
              }}
            >
              <ArrowLeft />
            </button>
            <p>
              {currentPage} z {filtredPagesCount ? filtredPagesCount : preFiltredPagesCount}
            </p>
            <button
              disabled={!canRight}
              onClick={() => {
                pagination('right')
              }}
            >
              <ArrowRight />
            </button>
          </Pagination>
        </Container>
      </Wrapper>
    </PageWrapper>
  );
};

export default BlogArchiveTemplate;

export const query = graphql`
  query BlogArchiveQuery($locale: String!, $skip: Int!) {
    datoCmsArchivePage(locale: { eq: $locale }) {
      title{
        value
      }
      text
      locale
      seo {
        seoTitle: title
        seoDescription: description
      }
    }
    allDatoCmsBlogPost(
      sort: { order: ASC, fields: meta___firstPublishedAt }
      filter: { locale: { eq: $locale } }
      skip: $skip
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

const Pagination = styled.div`
  margin-top: 40px;
  display: flex;
  align-items: center;
  p{
    margin: 0 20px;
    font-size: 24px;
  }
  button{
      width: 56px;
      height: 56px;
      border-radius: 50%;
      border: 1px solid var(--backgroundMedium);
      justify-content: center;
      align-items: center;
      display: inline-flex;
      transition: .2s linear;

      path{
        transition: .2s linear;
      }

      &:hover{
        background-color: var(--backgroundMedium);
        path{
          stroke: var(--mainLightText);
        }
      }

      &:disabled{
          border: 1px solid var(--divider);
          background-color: var(--mainLightText);

          path{
              stroke: var(--divider);
          }
      }
  }

`

const Category = styled.span`
  background-color: var(--mainLightText);
  color: ${props => props.categoryColor};
  padding: 10px;
  border-radius: 8px;
  position: relative;
  cursor: pointer;
  transition: .2s linear;

    &:before {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: ${props => `${props.categoryColor}22`};
        border-radius: 8px;
        transition: .2s linear;
    }

    &:hover{
        color: var(--mainLightText);
        background-color:  ${props => props.categoryColor};

        &::before{
            opacity: 0;
        }
    }
`

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
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%); 
    border-radius: 15px;

    div{
      position: absolute;
      bottom: 0;
      padding: 50px;


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
      aspect-ratio: 2.36/1;
      position: relative;
      z-index: -1;
      border-radius: 15px;
    }

  }
`

const Controls = styled.div`

  h2{
    margin-top: 72px;
    margin-bottom: 28px;
    font-size: 32px;
  }

  div{
    display: flex;
    margin-bottom: 40px;
    
    button{
      margin-right: 16px;
      margin-bottom: 16px;
      padding: 13px 32px;
      border-radius: 8px;
      color: var(--mainDarkText);
      font-size: 16px;
      line-height: 21px;
      border: 1px solid var(--divider);
      cursor: pointer;
      transition: .2s ease-in-out;

      &:hover{
        background-color: var(--divider);
        
      }

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

    .imgWrapp{
      position: relative;

      &:hover{
        &::after{
          opacity: 1;
        }
      }

      &::after{
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
        border-radius: 15px;
        opacity: 0;
        transition: .2s linear;
      }
    }

    img{
      width: 100%;
      border-radius: 15px;
      aspect-ratio: 1.8/1;
     
    }
  }
`