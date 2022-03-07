import React from 'react'
import { StructuredText } from 'react-datocms'
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from 'styled-components'
import Waves from '../vectors/heroOtherPageWaves'
import OrdersForm from './ordersForm'
import Logo from "../vectors/logo"
import { DOTS_IMAGES } from '../img/dots';

const HeroOrders = ({ data }) => {
    return (
      <Wrapper>
        <Container className="container">
          <Content dotsOnRight>
            <div className="textPart">
              <StructuredText data={data.title} />
              <p>{data.text}</p>
              <h3>
                <Logo />
                {data.subText}
              </h3>
            </div>
            <div className="imageWrapper">
              <GatsbyImage
                image={data.img.gatsbyImageData}
                alt={data.img.alt}
                title={data.img.title}
                imgClassName="mainImage"
              />
              <img
                className="dots"
                src={
                  data.dotsOnRight
                    ? DOTS_IMAGES.RIGHT_BOTTOM
                    : DOTS_IMAGES.LEFT_BOTTOM
                }
                alt=""
              />
            </div>
          </Content>
          <FormWrapper>
            <OrdersForm buttonText={data.buttonText} />
          </FormWrapper>
        </Container>
        <Waves />
      </Wrapper>
    );
}

export default HeroOrders

const Wrapper = styled.section`
    max-width: 1920px;
    margin: 0 auto;
    padding-bottom: 60px;
    width: 100%;
    position: relative;
    background-color: var(--backgroundGrey);
    padding-top: 240px;

    .wrapper{
        height: 30%;
        bottom: 0;
        top: unset;
        background: #fff;
    }

    .svg{
        bottom: unset;
        top: 0;
        transform: translateY(-99%);
    }

    @media (max-width: 1024px) {
        padding-top: clamp(140px, 13vw, 160px);
    }
`

const Container = styled.div`
    position: relative;
    z-index: 100;
 `

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .textPart {
    margin-right: 35px;
  }

  div {
    max-width: 562px;
    @media (max-width: 1024px) {
        max-width: 100%;
    }
  }

  h1 {
    color: var(--superDarkText);
    font-weight: bold;
    font-size: 48px;
    line-height: 1.3;
    letter-spacing: -2px;
    margin-bottom: 12px;
  }

  h3 {
    margin-top: 12px;
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
  }

  p {
    font-size: 18px;
    line-height: 180%;
    @media (max-width: 640px) {
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
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 0;
    padding-top: 0;
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
      margin-left: 0;
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
      font-size: clamp(32px, 5.2vw, 48px);
    }

    div {
      width: 100%;

      &.left {
        padding: 0;
      }
    }

    .textPart {
      max-width: 700px;
      width: 100%;
      margin: 0 auto;
      padding-left: 0;

      h2 {
        font-size: clamp(32px, 5.7vw, 40px);
      }
    }
  }

  @media (max-width: 375px) {
    --padding-value: 32px;
  }
`;

const FormWrapper = styled.div`
    background: #FFFFFF;
    box-shadow: 0px 20px 50px rgba(18, 17, 39, 0.08);
    border-radius: 25px;
    padding: clamp(20px, 2vw, 26px)  clamp(20px, 5.2vw, 90px) clamp(44px, 2vw, 50px) clamp(20px, 5.2vw, 90px);
    margin-top: clamp(120px, 20.2vw, 200px);
`