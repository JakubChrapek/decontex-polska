import React from "react"
import styled from "styled-components"
import { StructuredText } from 'react-datocms'
import Waves from "../vectors/gridWaves"
import { Link } from "gatsby"
import { GatsbyImage } from 'gatsby-plugin-image'

const Grid = ({ data }) => {
  return (
    <Wrapper>
      <Container className="container">
        <ContentDesctop>
          <div className="left">
            <StructuredText data={data.mainTitle} />
            <p className="mainText">{data.mainText}</p>
            <GatsbyImage
              image={data.secondImg.gatsbyImageData}
              className="secondImg"
              alt={data.secondImg.alt}
              title={data.secondImg.title}
            />
            <p className="secondText">{data.secondText}</p>
            <StructuredText data={data.publicationDate} />
            <StructuredText className="subTitle" data={data.subTitle} />
            <p className="subText">{data.subText}</p>
            {data.link.map((el,index) => (
              <Link key={index} className="link" to={el.slug} aria-label={el.ariaLabel}>
                <StructuredText data={el.name} />
              </Link>
            ))}
          </div>
          <div className="right">
            <GatsbyImage
              image={data.firstImg.gatsbyImageData}
              className="firstImg"
              alt={data.firstImg.alt}
              title={data.firstImg.title}
            />
            <p className="firstText">{data.firstText}</p>
            <GatsbyImage
              image={data.thirdImg.gatsbyImageData}
              className="thirdImg"
              alt={data.thirdImg.alt}
              title={data.thirdImg.title}
            />
          </div>
        </ContentDesctop>
        <ContentMobile>
          <span className="title">
            <StructuredText data={data.mainTitle} />
          </span>
          <p className="mainText">{data.mainText}</p>
          <div className="flex flex1">
            <p className="firstText text">{data.firstText}</p>
            <GatsbyImage
              image={data.firstImg.gatsbyImageData}
              className="firstImg"
              alt={data.firstImg.alt}
              title={data.firstImg.title}
            />
          </div>
          <div className="flex flex2">
            <p className="secondText text">{data.secondText}</p>
            <GatsbyImage
              image={data.secondImg.gatsbyImageData}
              className="secondImg"
              alt={data.secondImg.alt}
              title={data.secondImg.title}
            />
          </div>
          <div className="flex flex3">
            <div className="text">
              <StructuredText data={data.publicationDate} />
              <StructuredText className="subTitle" data={data.subTitle} />
              <p className="subText">{data.subText}</p>
              {data.link.map((el) => (
                <Link key={el.slug} className="link" to={el.slug} aria-label={el.ariaLabel}>
                  <StructuredText data={el.name} />
                </Link>
              ))}
            </div>
            <GatsbyImage
              image={data.thirdImg.gatsbyImageData}
              className="thirdImg"
              alt={data.thirdImg.alt}
              title={data.thirdImg.title}
            />
          </div>
        </ContentMobile>
      </Container>
      <Waves />
    </Wrapper>
  );
}

export default Grid

const Wrapper = styled.section`
  padding-top: clamp(140px, 11.1vw, 161px);
  @media (max-width: 767px) {
    padding-top: 16px;
  }
  padding-bottom: clamp(72px, 9.4vw, 160px);
  position: relative;
  max-width: 1920px;
  margin: 0 auto;
  overflow: hidden;
`;

const Container = styled.div`
    display: flex;
    justify-content: space-between;
`

const ContentMobile = styled.div`
  @media (min-width: 1025px) {
    display: none;
  }
  width: 100%;

  .title {
    h2 {
      max-width: 470px;
      color: var(--mainDarkText);
    }
  }

  .mainText {
    max-width: 470px;
  }

  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .gatsby-image-wrapper {
      width: 100%;
    }
    &.flex1 {
      margin-top: 48px;
    }

    &.flex2 {
      margin-top: 200px;
    }

    &.flex3 {
      margin-top: 120px;
    }
  }

  .text {
    margin-right: 9.1vw;
    max-width: 440px;
    width: 100%;
  }

  .secondText {
    color: var(--subLightText);
  }

  .subText {
    margin-bottom: 48px;
    color: var(--subLightText);
  }

  h2 {
    color: var(--mainLightText);
    font-size: clamp(32px, 5.2vw, 64px);
    line-height: 1.3;
    letter-spacing: -1px;
    margin-bottom: 24px;
  }

  p {
    line-height: 180%;
  }

  .firstImg,
  .secondImg,
  .thirdImg {
    min-width: 300px;
  }

  img {
    max-width: clamp(200px, 39.2vw, 400px);
    width: 100%;
    border-radius: 16px;
  }

  @media (max-width: 1024px) {
    .firstImg,
    .secondImg,
    .thirdImg {
      min-width: unset;
      width: clamp(300px, 39vw, 360px);
      img {
        width: 100%;
        max-width: 100%;
      }
    }
  }

  .link {
    padding: 9px 32px;
    display: block;
    width: fit-content;
    border-radius: 8px;
    background-color: var(--mainLightText);
    border: 1px solid var(--mainLightText);
    transition: background-color .2s linear, border .2s linear;

    p {
      color: var(--buttonText);
      transition: color .2s linear;
    }

    &:hover {
      border: 1px solid var(--backgroundLight);
      background-color: var(--backgroundLight);
      p {
        color: var(--mainLightText);
      }
    }
  }

  @media (max-width: 660px) {
    .flex {
      flex-direction: column-reverse;

      &.flex2 {
        margin-top: 36px;
      }

      &.flex3 {
        margin-top: 48px;
      }
    }

    img {
      max-width: 100%;
      margin-bottom: 36px;
    }

    .text {
      margin: 36px 0 0;
      max-width: 100%;
    }
  }
`;

const ContentDesctop = styled.div`
    @media (max-width: 1024px) {
        display: none;
    }

    display: flex;
    justify-content: space-between;
    width: 100%;

    p{
        line-height: 180%;
    }

    .left{
        max-width: 535px;
        margin-right: 35px;

        h2{
            
            font-weight: bold;
            font-size: 64px;
            line-height: 100%;
            letter-spacing: -2px;
        }

        h2:nth-child(5){
        color: var(--mainLightText);
            
        }
    }

    .right{
        max-width: 450px;
    }

    .mainText{
        margin-top: 24px;
        margin-bottom: 160px;
    }

    .secondText{
        margin-top: 36px;
        margin-bottom: 100px;
        max-width: 450px;
        color: var(--subLightText);
    }

    .subText{
        margin-top: 24px;
        margin-bottom: 48px;
        max-width: 450px;
        color: var(--subLightText);
    }

    .firstText{
        margin-top: 36px;
        margin-bottom: 387px;
        color: var(--subDarkText);
    }

    .secondImg{ 
        aspect-ratio: 1.33/1;
        width: 450px;
        border-radius: 15px;
    }

    .firstImg{
        aspect-ratio: 1.33/1;
        width: 450px;
        border-radius: 15px;

    }

    .thirdImg{
        aspect-ratio: 1.33/1;
        width: 450px;
        border-radius: 15px;
        
    }

    .link{
        padding: 9px 32px;
        display: block;
        width: fit-content;
        border-radius: 8px;
        background-color: var(--mainLightText);
        border: 1px solid var(--mainLightText);
        transition: background-color .2s linear, border .2s linear;

        p{
            color: var(--buttonText);
            transition: color .2s linear;
        }

        &:hover{
            border: 1px solid var(--backgroundLight);
            background-color: var(--backgroundLight);
            p{
                color: var(--mainLightText);
            }
        }

    }
`