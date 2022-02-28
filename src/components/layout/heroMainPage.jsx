import React from "react"
import styled from "styled-components"
import Waves from "../vectors/heroMainPageWaves"
import { StructuredText } from 'react-datocms'
import { Link } from "gatsby"
import { GatsbyImage } from 'gatsby-plugin-image'

const StyledHeroImage = styled(GatsbyImage)`
  --image-shift: 0px;
  position: absolute;
  left: calc(-1 * var(--image-shift));
  top: 0;
  width: calc(100% + var(--image-shift));
  height: 100%;
  @media (max-width: 480px) {
    --image-shift: 60px;
  }
  @media (max-width: 420px) {
    --image-shift: 90px;
  }
`;

const Hero = ({ data }) => {
    const {background: {alt, title, gatsbyImageData}} = data;
    return (
      <Wrapper>
        <StyledHeroImage alt={alt} title={title} image={gatsbyImageData} />
        <Container className="container">
          <StructuredText data={data.title} />
          <Text>{data.text}</Text>
          <div>
            {data.buttons.map((el, index) => (
              <Link
                className={'c' + index}
                to={el.slug}
                aria-label={el.ariaLabel}
              >
                <StructuredText data={el.name} />
              </Link>
            ))}
          </div>
        </Container>
        <Waves />
      </Wrapper>
    );
}

export default Hero

const Wrapper = styled.section`
    max-width: 1920px;
    margin: 0 auto;
    min-height: 750px;
    width: 100%;
    position: relative;

    @media (max-width: 1024px){
        min-height: 680px;
    }
    
    @media (max-width: 480px){
        min-height: 620px;
    }
`

const Container = styled.div`
    position: relative;
    z-index: 100;

    h1{
        padding-top: 240px;

        @media (max-width: 1024px){
            font-size: clamp(36px, 8.3vw, 72px);
        }
    }

    div{
        display: flex;

        a{
            padding: 14px 32px;
            border-radius: 8px;
            margin-right: 16px;

            &.c0{
                background-color: var(--mainLightText);
                p{
                    color: var(--buttonText);
                }
            }

            &.c1{
                border: 1px solid var(--mainLightText);
                p{
                    color: var(--mainLightText);
                }
            }
        }
    }

    @media (max-width: 480px){
        div{
            display: grid;
            grid-row-gap: 16px;

            a{
                text-align: center;
            }
        }
    }
 `

const Text = styled.p`
    padding-top: 12px;
    padding-bottom: 24px;
    font-size: 20px;
    line-height: 180%;
    color: var(--subLightText);

    
    @media (max-width: 1024px){
        font-size: clamp(16px, 2.3vw, 20px);
    }
 `