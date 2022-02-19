import React from 'react'
import { StructuredText } from 'react-datocms'
import styled from 'styled-components'
import Waves from '../vectors/heroOtherPageWaves'

const Hero = ({ data }) => {
  return (
    <Wrapper>
      <Container className="container">
        <Content>
          <div>
            <StructuredText data={data.title}/>
            <p>{data.text}</p>
          </div>
          <div>
            <img src={data.img.url}/>
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
    min-height: 750px;
    width: 100%;
    position: relative;
    background-color: var(--backgroundGrey);
`

const Container = styled.div`
    position: relative;
    z-index: 100;
 

 `

const Content = styled.div`
    padding-top: 240px;
    display: flex;
    justify-content: space-between;

    div{
      max-width: 562px;
    }
    

    h1{
        color: var(--superDarkText);
        font-weight: bold;
        font-size: 48px;
        line-height: 130%;
        letter-spacing: -2px;
        margin-bottom: 12px;
    }

    img{
      border-radius: 16px;
      box-shadow: 32px 32px 0px 0px var(--backgroundMedium);
    }

 `