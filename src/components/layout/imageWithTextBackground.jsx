import React from "react"
import { StructuredText } from "react-datocms"
import styled from "styled-components"
import Logo from './../img/logo_light.png'
import { DOTS_IMAGES } from '../img/dots'
import { GatsbyImage } from 'gatsby-plugin-image'

const ImageWithTextBackground = ({ data }) => {
    return (
      <Wrapper>
        <Container logo={Logo} className="container">
          <div className="imageWrapper">
            <img className="dots" src={DOTS_IMAGES.SMALL_DOTS} alt="" />
            <GatsbyImage image={data.img.gatsbyImageData} alt={data.img.alt} title={data.img.title} />
          </div>
          <div className="textPart">
            <StructuredText data={data.title} />
            <StructuredText data={data.list} />
          </div>
        </Container>
      </Wrapper>
    );
}

export default ImageWithTextBackground

const Wrapper = styled.section`
    padding-top: clamp(80px, 10.2vw, 160px);
    padding-bottom: clamp(80px, 12vw, 160px);
    max-width: 1920px;
    margin: 0 auto;
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;

  .imageWrapper {
    position: relative;
    height: fit-content;
    width: fit-content;

    .dots {
      position: absolute;
      max-width: 40%;
      bottom: -8%;
      right: -15%;
      z-index: 10;
    }
    @media (max-width: 480px) {
      max-width: 87.5%;
    }
  }

  .textPart {
    background-color: var(--backgroundGrey);
    border-radius: 20px;
    max-width: 608px;
    padding: 36px 36px 54px 36px;
    margin-left: 56px;
    @media (max-width: 1024px) {
      max-width: 700px;
      margin: 0 auto;
    }
    @media (max-width: 520px) {
      padding: 32px 28px 50px 28px;
    }

    h2 {
      font-weight: bold;
      font-size: 32px;
      line-height: 130%;
      letter-spacing: -0.5px;
      color: var(--superDarkText);
      margin-bottom: 36px;
    }

    ul {
      display: grid;
      grid-row-gap: 24px;

      li {
        padding-left: 37px;
        position: relative;

        &::before {
          content: url(${(props) => props.logo});
          position: absolute;
          left: 0;
        }

        p {
          color: var(--mainDarkText);
          font-weight: bold;
          font-size: 18px;
          line-height: 130%;
          letter-spacing: 0;
        }
      }
    }
  }

  @media (max-width: 1024px) {
    .imageWrapper {
      margin: 72px auto 0;
      .mainImage {
        width: 100%;
      }
    }
    flex-direction: column-reverse;

    div {
      max-width: 700px;
      margin: 0 auto;
    }
  }
  @media (max-width: 640px) {
    .imageWrapper {
      margin: 72px auto 0 0;
    }
  }
`;