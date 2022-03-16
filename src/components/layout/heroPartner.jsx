import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react'
import { StructuredText } from 'react-datocms'
import styled from 'styled-components'

const HeroPartner = ({ data }) => {
    return (
      <Wrapper>
        <Container className="container">
          <Content>
            <div>
              <StructuredText data={data.title} />
              <p>{data.text}</p>
            </div>
            <div className="grid">
              {data.images.map((el) => (
                <GatsbyImage
                  image={el.gatsbyImageData}
                  alt={el.alt}
                  title={el.title}
                />
              ))}
            </div>
          </Content>
        </Container>
      </Wrapper>
    );
}

export default HeroPartner

const Wrapper = styled.section`
    max-width: 1920px;
    margin: 0 auto;
    width: 100%;
    position: relative;
    padding-top: 200px;

    @media (max-width: 1024px){
        padding-top: 140px;
    }
`

const Container = styled.div`
    position: relative;
    z-index: 100;
 

 `

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 16px;

  div {
    max-width: 562px;
  }

  h1 {
    color: var(--superDarkText);
    font-weight: bold;
    font-size: 36px;
    @media (max-width: 767px) {
      font-size: 32px;
    }
    line-height: 1.1;
    letter-spacing: -1px;
    margin-bottom: 24px;
  }

  p {
    font-size: 18px;
    line-height: 180%;
    @media (max-width: 767px) {
      font-size: 16px;
    }
  }

  .grid {
    display: grid;
    grid-template-columns: calc(50% - 6px) calc(50% - 6px);
    grid-template-rows: repeat(3, minmax(auto, 104px));
    grid-gap: 12px;

    .gatsby-image-wrapper {
      img {
        object-fit: contain !important;
      }
      @media (max-width: 1024px) {
        aspect-ratio: 342/104;
      }
      @media (max-width: 640px) {
        aspect-ratio: 169/104;
      }
    }

    > div {
      background-color: var(--backgroundGrey);
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 16px;
    }

  @media (max-width: 1024px) {
    grid-template-rows: repeat(3, auto);
  }
  }

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    grid-row-gap: 48px;

    div {
      max-width: 700px;
      width: 100%;
      margin: 0 auto;
    }

    .grid {
      div {
        img {
          width: 100%;
        }
      }
    }
  }
`;