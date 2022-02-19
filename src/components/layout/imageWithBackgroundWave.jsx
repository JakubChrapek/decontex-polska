import React from 'react'
import { StructuredText } from 'react-datocms'
import styled from 'styled-components'
import Waves from '../vectors/ImageWithBackgroundWave'

const ImageWithBackgroundWave = ({ data }) => {
    return (
        <Wrapper>
            <Container className='container'>
                <Content>
                    <div><StructuredText data={data.textPart} /></div>
                    <div><img src={data.img.url} /></div>
                </Content>
            </Container>
            <Waves/>
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
    }
`