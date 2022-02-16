import React from "react"
import styled from "styled-components"
import { StructuredText } from 'react-datocms'

const Certificates = ({ data }) => {
    return (
        <Wrapper>
            <Container className="container">
                <Content>
                    <StructuredText data={data.title} />
                    <p>{data.text}</p>
                    <Flex>
                        {data.images.map(el => (
                            <div>
                                <img src={el.img.url} />
                            </div>
                        ))}
                    </Flex>
                </Content>
            </Container>
        </Wrapper>
    )
}

export default Certificates

const Wrapper = styled.section`
    padding: 160px 0 0 0; 
`

const Container = styled.div`
    text-align: center;

    h2{
        font-weight: bold;
        font-size: 48px;
        line-height: 130%;
        text-align: center;
        letter-spacing: -2px;
        max-width: 720px;
        margin: 0 auto;
    }

    p{
        max-width: 511px;
        margin: 0 auto;
        margin-top: 36px;
        font-size: 18px;
        line-height: 180%;
        color: var(--subDarkText);
    }
`

const Content = styled.div`
    position: relative;
    padding: 100px 0;

    &::after{
        z-index: -1;
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        right: 100px;
        left: 100px;
        background-color: var(--backgroundBlue);
        border-radius: 15px;
    }
    
    
`

const Flex = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-column-gap: 30px;
    margin-top: 108px;

    div{
        background-color: #fff;
        box-shadow: 0px 20px 50px rgba(18, 17, 39, 0.08);
        border-radius: 15px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        aspect-ratio: 1/1;
    }
`