import React from 'react'
import { StructuredText } from 'react-datocms'
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from 'styled-components'
import Waves from '../vectors/ImageWithBackgroundWave'

const ImageWithBackgroundWave = ({ data }) => {
    return (
      <Wrapper>
        <Container className="container">
          <Content>
            <div className="left">
              <StructuredText data={data.textPart} />
            </div>
            <div>
              <GatsbyImage
                image={data.img.gatsbyImageData}
                alt={data.img.alt}
                title={data.img.title}
              />
            </div>
          </Content>
        </Container>
        <Waves />
      </Wrapper>
    );
}

export default ImageWithBackgroundWave

const Wrapper = styled.section`
  background-color: var(--backgroundMedium);
  position: relative;
  z-index: 3;
  max-width: 1920px;
  margin: 0 auto;
  margin-top: 320px;

  @media (max-width: 1024px) {
    margin-top: clamp(180px, 31.4vw, 320px);
  }
  @media (max-width: 767px) {
    margin-top: clamp(132px, 16.4vw, 180px);
  }
`;

const Container = styled.div`

`

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 78px 0;

  div {
    max-width: 560px;
    .gatsby-image-wrapper {
      max-width: 400px;
    }
    img {
      border-radius: 16px;
    }

    h2 {
      color: var(--mainLightText);
      font-weight: bold;
      font-size: 40px;
      line-height: 1.3;
      letter-spacing: -1px;
    }

    p {
      font-weight: normal;
      padding-top: 20px;
      font-size: 18px;
      line-height: 180%;
      color: var(--subLightText);
    }

    &.left {
      padding-right: 35px;
    }
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    padding-bottom: 72px;
    div {
      max-width: 695px;
      width: 100%;

      h2 {
        font-size: clamp(32px, 5.7vw, 40px);
      }
      .gatsby-image-wrapper {
        width: 100%;
        max-width: 100%;
        margin-top: 48px;
      }
      &.left {
        padding-right: 0;
      }
    }
  }
`;