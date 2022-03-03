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
            alt="kropki dekoracyjne"
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
    padding-top: 160px;
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
    margin: 0 auto 0 0;
    padding-left: clamp(24px, 3.88vw, 56px);

    .dots {
      display: ${(props) => (props.isImgBackground ? null : 'none')};
      position: absolute;
      width: clamp(142px, 40%, 172px);
      bottom: -20%;
      left: ${(props) => (props.isImgRight ? 'unset' : '-14%')};
      right: ${(props) => (props.isImgRight ? '-14%' : 'unset')};
      z-index: 10;
    }

    .mainImage {
      border-radius: 16px;
      /* margin-left: ${(props) => (props.isImgRight ? '35px' : '0')};
      margin-right: ${(props) => (props.isImgRight ? '0' : '35px')}; */
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
        bottom: ${(props) => (props.isImgRight ? '-28px' : '-28px')};
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

        .mainImage{
            border-radius: 16px;
            box-shadow: ${props => props.isImgBackground ? props.isImgRight ? `32px 32px 0px 0px` + props.backgroundColor : '-32px 32px 0px 0px' + props.backgroundColor : null};
            margin-left: ${props => props.isImgRight ? '35px' : '0'};
            margin-right: ${props => props.isImgRight ? '0' : '35px'};
            max-width: 400px;
        }
    }

    a {
      display: block;
      margin-top: 20px;
      width: fit-content;
      border-radius: 8px;

      p {
        width: fit-content;
        padding: 13px 24px;
        border: 1px solid ${props => props.buttonColor ? props.buttonColor : 'var(--active)'};
        background: ${props => props.buttonColor ? props.buttonColor : 'var(--active)'};
        border-radius: 8px;
        display: block;
        color: var(--navHover);
        position: relative;
        transition: 0.2s linear;

        &:hover {
          border: 1px solid ${props => props.buttonColor ? props.buttonColor === '#51B8EB' ? 'var(--backgroundLight)' : 'var(--backgroundMedium)' : 'var(--backgroundLight)'};
          background-color: ${props => props.buttonColor ? props.buttonColor === '#51B8EB' ? 'var(--backgroundLight)' : 'var(--backgroundMedium)' : 'var(--backgroundLight)'};
        }
      }
    }

  @media (max-width: 1024px) {
    flex-direction: column-reverse;
    max-width: 697px;
    display: flex;
    justify-content: flex-end;
    .imageWrapper {
      width: 100%;
      margin: 72px 0 0 auto;
      .dots {
        width: clamp(130px, 30%, 261px);
        bottom: -18.5%;
        left: ${(props) => (props.isImgRight ? 'unset' : '2.5%')};
        right: ${(props) => (props.isImgRight ? '2.5%' : 'unset')};
      }

      .mainImage {
        max-width: 605px;
        aspect-ratio: 4/3;
        width: 87%;
        margin: ${({ isImgRight }) => isImgRight ? '0 auto 0 0' : '0 0 0 auto'};
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
    .imageWrapper .mainImage {
      :before {
        left: -22px;
        bottom: -22px;
      }
    }
  }
`;