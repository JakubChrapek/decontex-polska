import React from 'react'
import { StructuredText } from 'react-datocms'
import styled from 'styled-components'
import Waves from '../vectors/heroOtherPageWaves'
import Dots from '../img/dots-right-bottom.png'
import { DOTS_IMAGES } from '../img/dots'

const Hero = ({ data }) => {
  return (
    <Wrapper>
      <Container className="container">
        <Content>
          <div className='left'>
            <StructuredText data={data.title} />
            <p>{data.text}</p>
          </div>
          <div>
            {data.img
              ? <div className="imageWrapper">
                <img className="dots" src={DOTS_IMAGES.RIGHT_BOTTOM} />
                <img className="mainImage" src={data.img.url} />
              </div>
              : null
            }
          </div>
        </Content>
      </Container>
      <Waves />
    </Wrapper>
  )
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
    display: flex;
    justify-content: space-between;
    align-items: center;

    div{
        max-width: 562px;

        &.left{
          padding-right: 35px;
        }
    }

    h1{
        color: var(--superDarkText);
        font-weight: bold;
        font-size: 48px;
        line-height: 130%;
        letter-spacing: -2px;
        margin-bottom: 12px;
    }

    p{
        font-size: 20px;
        line-height: 180%;
    }

    .imageWrapper{
      position: relative;
      height: fit-content;
      width: fit-content;
      margin: 0 auto;

      .dots{
          position: absolute;
          max-width: 40%;
          bottom: -8%;
          right: -15%;
          z-index: 10;
      }

      .mainImage{
          border-radius: 16px;
          box-shadow: 32px 32px 0px 0px var(--backgroundMedium);
      }
    }

    @media (max-width: 1024px) {
      flex-direction: column;
      padding-top: 140px;

      .imageWrapper{
            width: 100%;

            .dots{
            }

            .mainImage{
              margin-top: 48px;
              max-width: 668px;
              width: 90%;
                
            }
        }

      h1{
            font-size: clamp(32px, 5.7vw, 48px); 
      }

      div{
        max-width: 700px;
        width: 100%;

        &.left{
          padding: 0;
        }
      }

      img{
      }
    }

 `