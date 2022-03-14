import React from 'react'
import { StructuredText } from 'react-datocms'
import styled from 'styled-components'
import Waves from '../vectors/heroOtherPageWaves'
import { DOTS_IMAGES } from '../img/dots'
import { GatsbyImage } from 'gatsby-plugin-image'

const Hero = ({ data }) => {
  return (
    <Wrapper>
      <Container className="container">
        <Content dotsOnRight={data.dotsOnRight}>
          <div className="left">
            <StructuredText data={data.title} />
            <p>{data.text}</p>
          </div>
          <div>
            {data.img ? (
              <div className="imageWrapper">
                <GatsbyImage
                  image={data.img.gatsbyImageData}
                  alt={data.img.alt}
                  title={data.img.title}
                  imgClassName="mainImage"
                />
                <img className="dots" src={data.dotsOnRight ? DOTS_IMAGES.RIGHT_BOTTOM : DOTS_IMAGES.LEFT_BOTTOM} alt='Waves' />
              </div>
            ) : null}
          </div>
        </Content>
      </Container>
      <Waves />
    </Wrapper>
  );
}

export default Hero

const Wrapper = styled.section`
    max-width: 1920px;
    margin: 0 auto;
    padding-bottom: 150px;
    width: 100%;
    position: relative;
    background-color: var(--backgroundGrey);

    @media (max-width: 1024px){
      padding-bottom: 0;
    }
`

const Container = styled.div`
    position: relative;
    z-index: 100;
 `

const Content = styled.div`
  padding-top: 240px;
  display: grid;
  grid-template-columns: 6fr 5fr;
  grid-gap: clamp(80px, 9.86vw, 142px);
  justify-content: space-between;
  align-items: center;

  div {
    flex: 1 1 50%;

    &.left {
      padding-right: 35px;
      flex: 1 1 60%;
    }
  }

  h1 {
    color: var(--superDarkText);
    font-weight: bold;
    font-size: 36px;
    line-height: 1.3;
    letter-spacing: -2px;
    margin-bottom: 12px;
  }

  p {
    font-size: 20px;
    line-height: 180%;
    @media (max-width: 767px) {
      font-size: 16px;
    }
  }

  .imageWrapper {
    position: relative;
    height: fit-content;
    width: fit-content;
    margin-left: auto;
    padding-right: ${({ dotsOnRight }) => (dotsOnRight ? '56px' : '0')};
    padding-bottom: 14px;

    .dots {
      position: absolute;
      max-width: 40%;
      bottom: -40px;
      right: ${({ dotsOnRight }) => (dotsOnRight ? '-10px' : 'unset')};
      left: ${({ dotsOnRight }) => (dotsOnRight ? 'unset' : '-56px')};
      z-index: 10;
    }

    .mainImage {
      border-radius: 16px;
    }
    position: relative;
    &:before {
      content: '';
      position: absolute;
      background-color: var(--backgroundMedium);
      width: ${({ dotsOnRight }) =>
        dotsOnRight ? 'calc(100% - 56px)' : '100%'};
      height: calc(100% - 14px);
      bottom: -14px;
      right: ${({ dotsOnRight }) => (dotsOnRight ? '28px' : '0')};
      left: ${({ dotsOnRight }) => (dotsOnRight ? 'unset' : '-28px')};
      border-radius: 16px;
      z-index: -1;
    }
  }

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    grid-gap: 0;
    padding-top: 140px;
    --padding-value: clamp(43px, 9.8vw, 76px);
    max-width: 700px;
    margin: 0 auto;

    .imageWrapper {
      width: 100%;
      margin-top: 48px;
      padding-right: ${({ dotsOnRight }) =>
        dotsOnRight ? 'var(--padding-value)' : '0'};
      padding-left: ${({ dotsOnRight }) =>
        dotsOnRight ? '0' : 'var(--padding-value)'};
      aspect-ratio: 610/457;
      .dots {
        width: clamp(129px, 34vw, 262px);
        right: ${({ dotsOnRight }) => (dotsOnRight ? '0' : 'unset')};
        left: ${({ dotsOnRight }) => (dotsOnRight ? 'unset' : '0')};
        bottom: calc(-1 * clamp(36px, 8.5vw, 66px));
      }

      .gatsby-image-wrapper {
        height: 100%;
      }

      .mainImage {
        max-width: 668px;
        width: 100%;
        height: 100%;
      }
      :before {
        max-width: 668px;
        width: calc(100% - var(--padding-value));
        bottom: calc(-1 * var(--padding-value) / 4);
        right: ${({ dotsOnRight }) =>
          dotsOnRight ? 'calc(var(--padding-value) / 2)' : 'unset'};
        left: ${({ dotsOnRight }) =>
          dotsOnRight ? 'unset' : 'calc(var(--padding-value) / 2)'};
      }
    }

    h1 {
      font-size: clamp(32px, 5.7vw, 36px);
    }

    div {
      width: 100%;

      &.left {
        padding: 0;
      }
    }
  }
  @media (max-width: 375px) {
    --padding-value: 32px;
  }
`;