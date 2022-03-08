import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { StructuredText } from 'react-datocms'
import { motion } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { ArrowLeft, ArrowRight } from "../vectors/arrows";
import { Link } from "gatsby"
import { GatsbyImage, Placeholder } from 'gatsby-plugin-image';
import { parseDateFromEnglishMonth } from '../../utils/misc';

const News = ({ data, posts }) => {
    const [position, positionSet] = useState(0);

    const [canRight, changeCanRight] = useState(true);
    const [canLeft, changeCanLeft] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (position === (window.innerWidth <= 660 ? 2 : 1)) {
                changeCanRight(false)
                changeCanLeft(true)
            } else if (position !== 0 && position !== (window.innerWidth <= 660 ? 2 : 1)) {
                changeCanLeft(true)
                changeCanRight(true)
            } else if (position === 0) {
                changeCanLeft(false)
                changeCanRight(true)
            }
        }
    }, [position])

    const handlers = useSwipeable({
        onSwipedLeft: () => {
            if (canRight && posts.length > 2) {
                positionSet(position + 1)
            }
        },
        onSwipedRight: () => {
            if (canLeft && posts.length > 2) {
                positionSet(position - 1)
            }
        },
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });

    return (
        <>
            {posts.length > 0
                ? <Wrapper isMainPage={data.title}>
                    <Container className="container">
                        <Flex>
                            <span>
                                {data.title
                                    ? <StructuredText data={data.title} />
                                    : <h2>{data}</h2>}
                                {data.text
                                    ? <p>{data.text}</p>
                                    : null}
                            </span>
                            {data.buttonText
                                ? <Link to='blog'>{data.buttonText}</Link>
                                : null}

                        </Flex>
                        <Slider isMainPage={data.title}>
                            <div {...handlers}>
                                <div className="slider">
                                    {posts.map((el, index) => {
                                        const polishDate = parseDateFromEnglishMonth(el.publicationDate)
                                        return index <= 2 ? (
                                            <Link className="wrapLink" to={'/blog/' + el.slug}>
                                                <motion.div
                                                    className="sliderItem"
                                                    animate={{
                                                        left: `calc(${position} * (-100% - 36px))`,
                                                    }}
                                                    transition={{
                                                        ease: 'easeOut',
                                                        duration: 0.25,
                                                    }}
                                                >
                                                    <div>
                                                        <Link
                                                            to="/blog/"
                                                            state={{ category: el.category.name }}
                                                        >
                                                            <Category
                                                                categoryColor={
                                                                    el.category.color.hex
                                                                }
                                                            >
                                                                {el.category.name}
                                                            </Category>
                                                        </Link>
                                                        <p className="title">{el.title}</p>
                                                        <p className="date">{polishDate}</p>
                                                    </div>
                                                    <GatsbyImage
                                                        image={el.cardImage.gatsbyImageData}
                                                        alt={el.cardImage.alt}
                                                        title={el.cardImage.title}
                                                    />
                                                </motion.div>
                                            </Link>
                                        ) : null;
                                    })}
                                </div>
                            </div>
                        </Slider >
                        {posts.length < 3
                            ? null
                            : <SliderControls>
                                <button
                                    aria-label="slider scroll left"
                                    name="poprzedni artykuł"
                                    disabled={!canLeft}
                                    onClick={() => {
                                        positionSet(position - 1);
                                    }}
                                >
                                    <ArrowLeft />
                                </button>
                                <button
                                    aria-label="slider scroll right"
                                    name="następny artykuł"
                                    disabled={!canRight}
                                    onClick={() => {
                                        positionSet(position + 1);
                                    }}
                                >
                                    <ArrowRight />
                                </button>
                            </SliderControls>
                        }
                    </Container >
                </Wrapper >
                : <PlaceholderNews />
            }
        </>
    );
}

export default News

const PlaceholderNews = styled.div`
    margin-top: 100px;
`

const Wrapper = styled.section`
    padding-bottom: 126px;  
    padding-top: ${props => props.isMainPage ? '96px' : '0'};
    background-color: ${props => props.isMainPage ? 'var(--backgroundGrey)' : null};
    overflow: hidden;
    max-width: 1920px;
    margin: 0 auto;
    margin-top: clamp(80px, 11.1vw, 160px);
    position: relative;
    z-index: 2;

    @media (max-width: 1024px) {
        padding: clamp(72px, 9.41vw, 128px) 0;
    }

    @media (max-width: 480px){
        margin-top: 0;
    }
`

const Container = styled.div`
`

const Flex = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    span{
        display: flex;

        h2{
            font-weight: bold;
            font-size: 36px;
            line-height: 100%;
            letter-spacing: -2px;
            margin-right: 62px;
            @media (max-width: 767px) {
                margin-right: 0;
            }
        }

        p{
            max-width: 400px;
            font-size: 18px;
            line-height: 180%;
        }
    }

    a{
        padding: 13px 32px;
        border-radius: 8px;
        background-color: var(--blackButtonBackground);
        border: 1px solid var(--blackButtonBackground);
        color: var(--mainLightText);
        font-weight: 500;
        font-size: 16px;
        line-height: 21px;
        transition: background-color .2s linear, border .2s linear;
        
        &:hover{
            border: 1px solid var(--backgroundMedium);
            background-color:  var(--backgroundMedium);
        }
    }

    @media (max-width: 1024px) {
        display: block;
        span{
            display: block;

            h2{
                margin-bottom: 16px;
                max-width: 700px;
                font-size: clamp(32px, 5.2vw, 36px);
                line-height: 1.3;
            }

            p{
                margin-bottom: 38px;
                max-width: 700px;
                font-size: 16px;
            }
        }
    }

    @media (max-width: 480px) {
        span{

            p{
                font-size: 14px;
            }
        }
    }
`

const Slider = styled.div`
    cursor: grab;

    .wrapLink{
        border-radius: 15px;
        &:focus-visible {
            outline: 3px solid var(--active);
            outline-offset: -3px;
        }
    }

    .slider{
        display: grid;
        grid-template-columns: calc(50% - 18px) calc(50% - 18px) calc(50% - 18px);
        grid-column-gap: 36px;
        margin-top: ${props => props.isMainPage ? '150px' : '48px'};
        width: 100%;
        overflow: hidden;

    .sliderItem {
        margin: 2px;
      aspect-ratio: 1.33/1;
      border-radius: 15px;
      position: relative;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
      overflow: hidden;

      > div {
        position: absolute;
        bottom: 0;
        padding: clamp(20px, 4vw, 60px) 26px;

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

      a{
          border-radius: 15px;
      }

      .gatsby-image-wrapper {
        width: 100%;
        height: 100%;
        padding: 0 !important;
        position: relative;
        border-radius: 15px;
        bottom: unset;
        z-index: -1;

        img {
          transition: transform 0.3s cubic-bezier(0.445, 0.05, 0.55, 0.95);
          border-radius: 15px;
        }
      }

      &:hover {
        img {
          transform: scale(1.075);
        }
      }
    }

    @media (max-width: 1024px) {
      margin-top: 48px;
    }

    @media (max-wdith: 840px) {
      grid-template-columns: repeat(3, minmax(320px, 62.8vw));
    }

    @media (max-width: 660px) {
      grid-template-columns: repeat(3, 100%);
    }
  }
`;

const SliderControls = styled.div`
    margin-top: 40px;
    button{
        margin-right: 16px;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        border: 1px solid var(--backgroundMedium);
        display: inline-flex;
        justify-content: center;
        align-items: center;
        transition: background-color .2s linear, border .2s linear;

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
    color: ${props => props.categoryColor};
    background-color: var(--mainLightText);
    padding: 15px 10px;
    border-radius: 15px;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 0.8px;
    line-height: 1;
    display: inline-block;
    position: relative;
    transition: background-color .2s linear, color .2s linear;

    &::before {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: ${props => `${props.categoryColor}22`};
        border-radius: 15px;
    transition: opacity .2s linear;
    }

    &:hover{
        color: var(--mainLightText);
        background-color:  ${props => props.categoryColor};

        &::before{
            opacity: 0;
        }
    }
`