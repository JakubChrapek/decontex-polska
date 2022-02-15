import React from "react"
import styled from "styled-components"
import Waves from "../vectors/heroMainPageWaves"
import { StructuredText } from 'react-datocms'

const Hero = ({ data }) => {
    return (
        <Wrapper bg={data.background.url}>
            <Container className="container">
                <StructuredText data={data.title} />
                <Text>{data.text}</Text>
                <div>
                    {data.buttons.map((el, index) => (
                        <a className={'c' + index} href={el.slug} aria-label={el.ariaLabel}><StructuredText data={el.name} /></a>
                    ))}
                </div>
            </Container>
            <Waves />
        </Wrapper>
    )
}

export default Hero

const Wrapper = styled.section`
    min-height: 750px;
    width: 100%;
    position: relative;
    background-image: url(${props => props.bg});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`

const Container = styled.div`
    position: relative;
    z-index: 100;

    h1{
        padding-top: 240px;
        font-weight: bold;
        font-size: 72px;
        line-height: 75px;
        color: var(--primaryLight);
    }

    div{
        display: flex;

        a{
            padding: 14px 32px;
            border-radius: 8px;
            margin-right: 16px;

            &.c0{
                background-color: var(--primaryLight);
                color: var(--primaryDark);
            }

            &.c1{
                color: var(--primaryLight);
                border: 1px solid var(--primaryLight);
            }
        }
    }
 `

 const Text = styled.p`
    font-size: 20px;
    line-height: 180%;
    color: var(--primaryLight); 
    padding-top: 12px;
    padding-bottom: 24px;
    opacity: 0.56;
 `