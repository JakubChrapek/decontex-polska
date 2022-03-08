import React from "react"
import styled from "styled-components"
import { StructuredText } from 'react-datocms'
import { GatsbyImage } from 'gatsby-plugin-image';
import { Link } from "gatsby"
import { DOTS_IMAGES } from '../img/dots'

const ImageWithButton = ({ data }) => {
  return (
    <Wrapper>
      <Container
        backgroundColor={data.backgroundColor.hex}
        buttonColor={data.buttonColor?.hex}
        isImgBackground={data.isImgBackground}
        isImgRight={data.isImgRight}
        className="container"
      >
        <div className="imageWrapper">
          <img
            className="dots"
            src={data.isImgRight ? DOTS_IMAGES.RIGHT_BOTTOM : DOTS_IMAGES.LEFT_BOTTOM_BIGGER}
            alt=""
          />
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
          {data.button.map((el) => (
            <Link to={`/${el.slug}`} aria-label={el.ariaLabel}>
              <StructuredText data={el.name} />
            </Link>
          ))}
        </div>
      </Container>
    </Wrapper>
  );
}

export default ImageWithButton

const Wrapper = styled.section`
    padding-top: clamp(110px, 11.11vw, 160px);
    max-width: 1920px;
    margin: 0 auto;

    @media (max-width: 1024px){
        padding-top: clamp(96px, 13vw, 160px);
    }
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: ${(props) => (props.isImgRight ? 'row-reverse' : 'row')};

  .imageWrapper {
    position: relative;
    height: fit-content;
    width: fit-content;
    margin: ${(props) => (props.isImgRight ? '0 0 0 auto' : '0 auto 0 0')};
    padding-left: clamp(24px, 3.88vw, 56px);

    .dots {
      display: ${(props) => (props.isImgBackground ? null : 'none')};
      position: absolute;
      width: clamp(142px, 40%, 172px);
      bottom: -20%;
      left: ${(props) => (props.isImgRight ? 'unset' : '0')};
      right: ${(props) => (props.isImgRight ? '-14%' : '0')};
      z-index: 10;
    }

    .mainImage {
      border-radius: 16px;
      position: relative;
      overflow: visible;
      max-width: 400px;
      img {
        border-radius: 16px;
      }
      &:before {
        content: '';
        position: absolute;
        left: ${(props) => (props.isImgRight ? '28px' : '-28px')};
        bottom: -28px;
        width: 100%;
        height: 100%;
        background-color: ${(props) => props.backgroundColor};
        z-index: -1;
        border-radius: 16px;
      }
    }
  }

  .textPart {
    max-width: 552px;
    width: 100%;
    padding-left: ${(props) => (props.isImgRight ? '0' : '35px')};
    padding-right: ${(props) => (props.isImgRight ? '35px' : '0')};

    > p {
      font-size: 18px;
      line-height: 1.8;
      color: var(--subGreyText);
    }
    h2 {
      padding-bottom: 32px;
      font-weight: bold;
      font-size: clamp(32px, 2.77vw, 40px);
      line-height: 1.3;

      mark {
        background: inherit;
        color: red;
      }
    }
  }

  a {
    display: block;
    margin-top: 32px;
    width: fit-content;
    border-radius: 8px;

    p {
      width: fit-content;
      padding: 13px 24px;
      border: 1px solid
        ${(props) => (props.buttonColor ? props.buttonColor : 'var(--active)')};
      background: ${(props) =>
    props.buttonColor ? props.buttonColor : 'var(--active)'};
      border-radius: 8px;
      display: block;
      color: var(--navHover);
      position: relative;
      transition: background-color .2s linear, border .2s linear;
      text-align: center;

      &:hover {
        border: 1px solid
          ${(props) =>
    props.buttonColor
      ? props.buttonColor === '#51B8EB'
        ? 'var(--backgroundLight)'
        : 'var(--backgroundMedium)'
      : 'var(--backgroundLight)'};
        background-color: ${(props) =>
    props.buttonColor
      ? props.buttonColor === '#51B8EB'
        ? 'var(--backgroundLight)'
        : 'var(--backgroundMedium)'
      : 'var(--backgroundLight)'};
      }
    }
  }

  @media (max-width: 1024px) {
    && {
      flex-direction: column-reverse;
      max-width: 767px;
      display: flex;
      justify-content: flex-end;
    }
    .imageWrapper {
      width: 100%;
      margin: 72px 0 0 auto;
      padding-left: ${(props) => props.isImgRight && '0'};

      .dots {
        width: clamp(130px, 30%, 261px);
        bottom: -64px;
        left: ${(props) => (props.isImgRight ? 'unset' : '7.5%')};
        right: ${(props) => (props.isImgRight ? '-2.5%' : 'unset')};
      }

      .mainImage {
        max-width: 605px;
        aspect-ratio: 4/3;
        width: 87%;
        margin: ${({ isImgRight }) =>
    isImgRight ? '0 auto 0 0' : '0 0 0 auto'};
        display: block;
      }
    }

    .textPart {
      max-width: 700px;
      margin: 0 auto;
      padding-left: 0;
      padding-right: 0;

      h2 {
        font-size: clamp(32px, 5.7vw, 40px);
      }
    }
  }

  @media (max-width: 640px) {
    .imageWrapper {
      padding-left: 0;
      margin: 48px 0 0 auto;
      .mainImage {
        :before {
          left: ${(props) => (props.isImgRight ? '22px' : '-22px')};
          bottom: -22px;
        }
      }

      .dots {
        bottom: -56px;
        left: ${(props) => (props.isImgRight ? 'unset' : '2.5%')};
        right: ${(props) => (props.isImgRight ? '-2.5%' : 'unset')};
      }
    }
  }
`;