import React, { useState, useEffect, useRef } from 'react';
import { graphql } from 'gatsby';
import PageWrapper from '../components/layout/pageWrapper';
import styled from 'styled-components';
import { Link } from "gatsby"
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import { StructuredText } from 'react-datocms';
import { ArrowLeft, ArrowRight } from "../components/vectors/arrows";
import { GatsbyImage } from 'gatsby-plugin-image';
import { parseDateFromEnglishMonth } from '../utils/misc';

const BlogArchiveTemplate = (props) => {
  const constraintsRef = useRef(null);

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
            <Link className='wrapLink' to={choosenPosts[0].slug}/>
                <div>
                  <Category categoryColor={choosenPosts[0].category.color.hex}>{choosenPosts[0].category.name}</Category>
                  <p className="title">{choosenPosts[0].title}</p>
                  <p className="date">{parseDateFromEnglishMonth(choosenPosts[0].publicationDate)}</p>
                </div>
                <GatsbyImage image={choosenPosts[0].coverImage.gatsbyImageData} alt={choosenPosts[0].coverImage.alt} title={choosenPosts[0].coverImage.title} />
              </div>
          </Hero>
          {preFiltredPosts.length === 0
            ? null
            : <>
              <Controls ref={constraintsRef}>
                <h2>
                  {props.data.datoCmsArchivePage.locale === 'pl'
                    ? 'Wybierz kategorię'
                    : 'Choose category'}
                </h2>
                <motion.div drag="x" dragConstraints={constraintsRef}>
                  <button
                    className={'all filterItem active'}
                    onClick={() => {
                      filter('all');
                    }}
                  >
                    {props.data.datoCmsArchivePage.locale === 'pl'
                      ? 'Wszystkie'
                      : 'All'}
                  </button>
                  {props.data.allDatoCmsCategory.nodes.map((el) => (
                    <>
                      {preFiltredPosts.filter(innerEl => innerEl.category.name === el.name).length > 0
                        ? <button
                          className={el.name.replace(/\s/g, '') + ' filterItem'}
                          onClick={() => {
                            filter(el.name);
                          }}
                        >
                          {el.name}
                        </button>
                        : null}
                    </>
                  ))}
                </motion.div>
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
                          <GatsbyImage image={el.cardImage.gatsbyImageData} alt={el.cardImage.alt} title={el.cardImage.title} />
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
            </>
          }
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
          gatsbyImageData
          title
          alt
        }
        coverImage {
          url
          gatsbyImageData
          title
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
      transition: background-color .2s linear, border .2s linear, color .2s linear;

      path{
        transition: stroke .2s linear;
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
  color: ${(props) => props.categoryColor};
  padding: 10px;
  border-radius: 15px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.2s linear, border 0.2s linear,
    color 0.2s linear;

  font-size: 14px;
  line-height: 170%;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: ${(props) => `${props.categoryColor}22`};
    border-radius: 15px;
    transition: background-color 0.2s linear, border 0.2s linear,
      color 0.2s linear;
  }

  
`;

const Wrapper = styled.div`
  padding-top: 192px;
  padding-bottom: 110px;
  overflow-x: hidden ;

  @media (max-width: 1024px){
    padding-top: clamp(140px, 18.2vw, 192px);
    padding-bottom: clamp(45px, 8.4vw, 110px);
  }

  .wrapLink{
      border-radius: 15px;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      &:focus-visible {
          outline: 3px solid var(--active);
          outline-offset: -3px;
      }

      img{
      }
  }
`

const Container = styled.div`

`

const Hero = styled.div`
  h1 {
    color: var(--superBlackText);
    max-width: 726px;
    margin: 0 auto;
    text-align: center;
    margin-bottom: 12px;
    font-size: 48px;
    line-height: 130%;
    @media (max-width: 1024px) {
      font-size: clamp(32px, 5.2vw, 40px);
      line-height: 1.1;
    }
    letter-spacing: -1px;
  }

  p {
    max-width: 726px;
    margin: 0 auto;
    text-align: center;
    font-size: 18px;
    @media (max-width: 1024px) {
      font-size: 16px;
    }
    @media (max-width: 767px) {
      font-size: 14px;
    }
    line-height: 180%;
  }

  .imageBox {
    position: relative;
    margin-top: 100px;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
    border-radius: 15px;
    aspect-ratio: 2.36/1;
    @media (max-width: 1024px) {
      margin-top: 68px;
      aspect-ratio: 1.8/1;
    }
    @media (max-width: 767px) {
      margin-top: 44px;
    }
    width: 100%;
    overflow: hidden;

    div {
      position: absolute;
      bottom: 0;
      padding: clamp(18px, 4.5vw, 50px);

      .title {
        color: var(--mainLightText);
        margin: 22px 0 16px 0;
        text-align: left;
        font-weight: bold;
        font-size: 24px;
        line-height: 1.3;
        letter-spacing: 0px;
      }

      .date {
        font-size: 16px;
        line-height: 180%;
        color: var(--subLightText);
        text-align: left;
      }
    }

    .gatsby-image-wrapper {
      width: 100%;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      aspect-ratio: 2.36/1;
      @media (max-width: 1024px) {
        aspect-ratio: 1.8/1;
      }
      position: absolute;
      z-index: -1;
      border-radius: 15px;
      img {
        transition: transform 0.3s cubic-bezier(0.445, 0.05, 0.55, 0.95);
        transform-origin: center center;
      }
    }

    &:hover {
      img {
        transform: scale(1.075);
      }
    }
  }

  @media (max-width: 767px) {
    font-size: clamp(36px, 5.2vw, 48px);

    .imageBox div .title {
      margin: 10px 0 4px;
      font-size: 18px;
    }
  }
`;

const Controls = styled.div`
  h2 {
    margin-top: 72px;
    margin-bottom: 28px;
    font-size: 32px;
  }

  div {
    display: flex;
    min-width: max-content;
    margin-bottom: 40px;

    button {
      margin-right: 16px;
      margin-bottom: 16px;
      padding: 13px 32px;
      border-radius: 8px;
      color: var(--mainDarkText);
      font-size: 16px;
      @media (max-width: 767px) {
        font-size: 14px;
        padding: 7px 20px;
      }
      line-height: 21px;
      border: 1px solid var(--divider);
      cursor: pointer;
      transition: background-color 0.2s linear, border 0.2s linear,
        color 0.2s linear;
      min-width: fit-content;

      &:hover {
        background-color: var(--divider);
      }

      &.active {
        color: var(--mainLightText);
        border: 1px solid var(--active);
        background-color: var(--active);
      }
    }
  }

  @media (max-width: 880px) {
  }

  @media (max-width: 560px) {
    padding: 5px 0;
  }
`;

const Grid = styled(motion.ul)`
  display: grid;
  grid-gap: 40px;
  grid-template-columns: 1fr 1fr 1fr;

  li {
    position: relative;
    
    filter: drop-shadow(0px 20px 50px rgba(0,0,0,0.18));
    
    span {
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

    h3 {
      color: var(--superDarkText);
      font-weight: bold;
      font-size: 24px;
      line-height: 1.3;
      letter-spacing: 0px;
    }

    a {
      color: var(--active);
      margin-top: 20px;
      display: flex;
      align-items: center;

      svg {
        margin-left: 10px;
        transition: margin 0.2s cubic-bezier(0.445, 0.05, 0.55, 0.95);
        path {
          stroke: var(--active);
        }
      }

      &:hover {
        svg {
          margin-left: 16px;
        }
      }
    }

    .imgWrapp {
      position: relative;
      width: 100%;
      border-radius: 15px;

      .gatsby-image-wrapper {
        border-radius: 15px;
        width: 100%;
        aspect-ratio: 329/201;
        img {
          transition: transform 0.3s cubic-bezier(0.445, 0.05, 0.55, 0.95);
          transform-origin: center center;
        }
      }

      &:hover {
        img {
          transform: scale(1.075);
        }
      }
    }
  }

  @media (max-width: 880px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;