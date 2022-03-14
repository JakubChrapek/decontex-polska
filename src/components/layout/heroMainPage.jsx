import React from "react"
import styled from "styled-components"
import Waves from "../vectors/heroMainPageWaves"
import { StructuredText } from 'react-datocms'
import { Link } from "gatsby"
import { GatsbyImage } from 'gatsby-plugin-image'

const StyledHeroImage = styled(GatsbyImage)`
  --image-shift: 0px;
  && {
    position: absolute;
  }

  &::after{
      content: "";
      position: absolute;
      right: 0;
      left: 0;
      top: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.6);
      z-index: 1;
    }
  left: calc(-1 * var(--image-shift));
  top: 0;
  width: calc(100% + var(--image-shift));
  height: 100%;
  @media (max-width: 720px) {
    --image-shift: 50%;
  }
  @media (max-width: 520px) {
    --image-shift: 75%;
  }
`;

const Hero = ({ data }) => {
  const { background: { alt, title, gatsbyImageData } } = data;
  return (
    <Wrapper>
      <StyledHeroImage alt={alt} title={title} image={gatsbyImageData}  />
      
     
      <Container className="container">
        <StructuredText data={data.title} />
        <Text>{data.text}</Text>
        <div>
          {data.buttons.map((el, index) => (
            <Link
            key={el.slug}
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
        max-width: 700px;

        @media (max-width: 1024px){
            font-size: clamp(36px, 8.3vw, 72px);
        }
    }

    div{
        display: flex;

        a{
            padding: 13px 32px;
            border-radius: 8px;
            margin-right: 16px;
            transition: background-color .2s linear, border .2s linear;

            &.c0{
                background-color: var(--mainLightText);
                border: 1px solid var(--mainLightText);
                
                p{
                    color: var(--buttonText);
                }

              &:hover{
                  border: 1px solid var(--backgroundLight);
                  background-color: var(--backgroundLight);
                  p{
                      color: var(--mainLightText);
                  }
              }
            }

            &.c1{
                border: 1px solid var(--mainLightText);
                p{
                    color: var(--mainLightText);
                    transition: color .2s linear;
                }

                &:hover{
                  background-color: var(--mainLightText);

                  p{
                    color: var(--mainDarkText);
                  }
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