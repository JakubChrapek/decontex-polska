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
        backgroundColor={data.backgroundColor}
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
            <Link to={el.slug} aria-label={el.ariaLabel}>
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
        padding-top: clamp(72px, 13vw, 160px);

    }
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;
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
      left: ${(props) => (props.isImgRight ? '0' : 'unset')};
      right: ${(props) => (props.isImgRight ? 'unset' : '-14%')};
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
        left: ${(props) => (props.isImgRight ? '-28px' : '28px')};
        bottom: -28px;
        width: 100%;
        height: 100%;
        background-color: ${(props) => props.backgroundColor.hex};
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

    h2 {
      padding-bottom: 20px;
      font-weight: bold;
      font-size: 40px;
      line-height: 110%;

      mark {
        background: inherit;
        color: red;
      }
    }
  }

  a {
    display: block;
    margin-top: 20px;
    width: fit-content;
    border-radius: 8px;

    p {
      width: fit-content;
      padding: 0 24px;
      background: #51b8eb;
      border-radius: 8px;
      display: block;
      height: 49px;
      line-height: 49px;
      color: var(--navHover);
      border: 1px solid var(--active);
      position: relative;
      transition: 0.2s linear;

      mark {
        color: var(--navHover);
        border-radius: 8px;
        background-color: var(--blackButtonBackground);
        border: 1px solid var(--blackButtonBackground);
        display: block;
        height: 49px;
        line-height: 49px;
        color: var(--navHover);
        border: 1px solid var(--active);
        position: relative;
        transition: 0.2s linear;

        mark {
          color: var(--navHover);
          border-radius: 8px;
          background-color: var(--blackButtonBackground);
          border: 1px solid var(--blackButtonBackground);
          display: block;
          position: absolute;
          padding: 0 24px;
          width: max-content;
          left: 0;
          transition: 0.2s linear;
          transform: translate(-2px, -2px);
        }

        &:hover {
          border: 1px solid var(--backgroundLight);
          background-color: var(--backgroundLight);

          mark {
            border: 1px solid var(--backgroundMedium);
            background-color: var(--backgroundMedium);
          }
        }
      }
    }
  }

  @media (max-width: 1024px) {
    && {
      flex-direction: column-reverse;
      max-width: 697px;
      display: flex;
      justify-content: flex-end;
    }
    .imageWrapper {
      width: 100%;
      margin: 72px 0 0 auto;
      padding-left: ${(props) => props.isImgRight && '0'};

      .dots {
        width: clamp(130px, 30%, 261px);
        bottom: -18.5%;
        left: ${(props) => (props.isImgRight ? '-2.5%' : 'unset')};
        right: ${(props) => (props.isImgRight ? 'unset' : '-2.5%')};
      }

      .mainImage {
        max-width: 605px;
        width: 87%;
        margin: ${({ isImgRight }) =>
          isImgRight ? '0 0 0 auto' : '0 auto 0 0'};
        display: block;
      }
    }

    .textPart {
      max-width: 700px;
      margin: 0 auto;
      padding-left: 0;

      h2 {
        font-size: clamp(32px, 5.7vw, 40px);
      }
    }
  }

  @media (max-width: 640px) {
    .imageWrapper {
      padding-left: 0;
      .mainImage {
        :before {
          left: ${(props) => (props.isImgRight ? '22px' : '-22px')};
          bottom: -22px;
        }
      }
    }
  }
`;