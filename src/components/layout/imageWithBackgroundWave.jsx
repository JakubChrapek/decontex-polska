import React from 'react'
import { StructuredText } from 'react-datocms'
import styled from 'styled-components'
import Waves from '../vectors/ImageWithBackgroundWave'

const ImageWithBackgroundWave = ({ data }) => {
    return (
        <Wrapper>
            <Container className='container'>
                <Content>
                    <div className='left'><StructuredText data={data.textPart} /></div>
                    <div><img src={data.img.url} /></div>
                </Content>
            </Container>
            <Waves />
        </Wrapper>
    )
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
`

const Container = styled.div`

`

const Content = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 78.5px 0;

    div{
        max-width: 560px;

        img{
            border-radius: 16px;
        }

        h2{
            color: var(--mainLightText);
            font-weight: bold;
            font-size: 40px;
            line-height: 110%;
            letter-spacing: -1px;

        }

        p{
            font-weight: normal;
            padding-top: 20px;
            font-size: 18px;
            line-height: 180%;
            color: var(--subLightText);
        }

        &.left{
            padding-right: 35px;
        }
    }

    @media (max-width: 1024px){
        flex-direction: column;
        div{
            max-width: 700px;
            width: 100%;
            
            h2{
                font-size: clamp(32px, 5.7vw, 40px); 
            }

            img{
                width: 100%;
                margin-top: 48px;
            }
        }
    }
`