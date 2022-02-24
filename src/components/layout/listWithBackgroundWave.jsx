import React from "react"
import { StructuredText } from "react-datocms"
import styled from "styled-components"
import Waves from '../vectors/ImageWithBackgroundWave'
import Logo from './../img/logo_light.png'

const ListWithBackgroundWave = ({data}) => {
    return(
        <Wrapper>
            <Container className="container">
                <StructuredText data={data.title}/>
                <Content logo={Logo}>
                    <div><StructuredText data={data.listLeft}/></div>
                    <div><StructuredText data={data.listRight}/></div>
                </Content>
            </Container>
            <Waves/>
        </Wrapper>
    )
}

export default ListWithBackgroundWave

const Wrapper = styled.section`
    background-color: var(--backgroundMedium);
    position: relative;
    z-index: 3;
    max-width: 1920px;
    margin: 0 auto;
    margin-top: 280px;
    padding-bottom: 100px;
    padding-top: 60px;

    @media (max-width: 1024px){
        padding-bottom: 70px;
    }

`

const Container = styled.div`
    h2{
        color: var(--mainLightText);
        max-width: 750px;
        margin-bottom: 56px;
        font-weight: bold;
        font-size: 48px;
        line-height: 130%;
        letter-spacing: -1px;
    }

    @media (max-width: 1024px) {
        h2{
            font-size: clamp(32px, 5.2vw, 48px);
        }
    }
`

const Content = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 47px;

    li{
        padding-left: 37px;
        margin-bottom: 16px;
        position: relative;
        font-size: 16px;
        line-height: 180%;

        p{
            color: var(--subLightText);
        }

        &::before{
            content: url(${props => props.logo});
            position: absolute;
            left: 0;
            top: 2px;
        }
    }

    @media (max-width: 800px) {
        grid-template-columns: 1fr;
    }

`