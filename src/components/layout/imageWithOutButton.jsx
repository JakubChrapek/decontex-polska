import React from "react"
import styled from "styled-components"
import { StructuredText } from 'react-datocms'
import Logo from "../vectors/logo"
import { GatsbyImage } from 'gatsby-plugin-image'
import {DOTS_IMAGES} from '../img/dots'

const ImageWithoutButton = ({ data }) => {
    return (
      <Wrapper>
        <Container
          isImgBackground={data.isImgBackground}
          isImgRight={data.isImgRight}
          className="container"
        >
          <div className="imageWrapper">
            <img className="dots" src={DOTS_IMAGES.LEFT_BOTTOM} alt="kropki dekoracyjne" />
            <GatsbyImage
              className="mainImage"
              image={data.img.gatsbyImageData}
              alt={data.img.alt}
              title={data.img.title}
            />
          </div>
          <div className="textPart">
            <StructuredText data={data.title} />
            <p>{data.text}</p>

            <h3>
              <Logo />
              {data.bottomText}
            </h3>
          </div>
        </Container>
      </Wrapper>
    );
}

export default ImageWithoutButton

const Wrapper = styled.section`
    padding-top: clamp(80px, 11.1vw, 160px);
    max-width: 1920px;
    margin: 0 auto;
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: ${(props) => (props.isImgRight ? 'row-reverse' : 'row')};

  .imageWrapper {
    position: relative;
    height: fit-content;
    width: fit-content;
    margin-left: 28px;
    flex: 1 1 50%;

    .dots {
      display: ${(props) => (props.isImgBackground ? null : 'none')};
      position: absolute;
      width: clamp(142px, 40%, 172px);
      bottom: -10%;
      left: ${(props) => (props.isImgRight ? 'unset' : '-5.5%')};
      right: ${(props) => (props.isImgRight ? '-5.5%' : 'unset')};
      z-index: 10;
    }

    .mainImage {
      display: block;
      margin-left: 28px;
      margin-bottom: 28px;
      margin-right: 35px;
      border-radius: 16px;
      position: relative;
      overflow: visible;
      max-width: 400px;
      img {
        border-radius: 16px;
      }
      /* box-shadow: ${(props) =>
        props.isImgBackground
          ? props.isImgRight
            ? '28px 28px 0px 0px var(--backgroundMedium)'
            : '-28px 28px 0px 0px var(--backgroundMedium)'
          : null}; */
      &:before {
        content: '';
        position: absolute;
        left: -28px;
        bottom: -28px;
        width: 100%;
        height: 100%;
        background-color: var(--backgroundMedium);
        z-index: -1;
        border-radius: 16px;
      }
    }
  }

  .textPart {
    max-width: 552px;
    width: 100%;
    flex: 1 1 50%;
    h2 {
      padding-bottom: 20px;
      font-weight: bold;
      font-size: 40px;
      line-height: 110%;
    }

    p {
      font-size: 18px;
      line-height: 180%;
    }

    h3 {
      padding-top: 48px;
      margin-top: 48px;
      position: relative;
      font-weight: 500;
      font-size: 16px;
      line-height: 180%;
      font-family: 'IBM Plex Sans';
      display: flex;
      align-items: center;

      svg {
        margin-right: 12px;
      }

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 1px;
        background-color: var(--divider);
      }
    }
  }

  @media (max-width: 1024px) {
    flex-direction: column-reverse;
    max-width: 697px;
    display: flex;
    justify-content: flex-end;
    padding-bottom: 50px;
    .imageWrapper {
      align-self: flex-end;
      width: 100%;
      aspect-ratio: 607/455;
      width: 90%;
      .dots {
        width: clamp(221px, 30%, 261px);
        bottom: calc(-50px - 15%);
        left: -11%;
      }

      .mainImage {
          width: 100%;
          max-width: unset;
          aspect-ratio: 400/300;
        margin: 50px 0 0 0;
        display: block;
        &:before {
            left: -42px;
            bottom: -42px;
        }
    }

    .textPart {
      margin: 0 auto;
      max-width: 100%;

      h3 {
        margin-top: clamp(28px, 4.7vw, 48px);
        padding-top: clamp(28px, 4.7vw, 48px);
      }
    }
  }
  @media (max-width: 767px) {
      .imageWrapper {
          .mainImage {
              height: unset;
            &:before {
                left: -22px;
                bottom: -22px;
            }
        }
        .dots {
            width: clamp(121px, 30%, 151px);
            bottom: calc(-15%);
            left: -11%;
        }
      }
  }

  @media (max-width: 480px) {
    .textPart {
      h2 {
        font-size: 32px;
      }

      p {
        font-size: 16px;
      }

      h3 {
        font-size: 14px;
      }
    }
  }
}
`