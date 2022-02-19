import React from "react"
import { StructuredText } from "react-datocms"
import styled from "styled-components"
import Waves from "../vectors/stagesWithInformWaves"
import Logo from './../img/logo.png'

const StagesWithInform = ({ data }) => {
    return (
        <Wrapper>
            <Stages>
                <Container className="container">
                    <StructuredText data={data.stages[0].title} />
                    <Content logo={Logo}>
                        <div><StructuredText data={data.stages[0].listLeft} /></div>
                        <div><StructuredText data={data.stages[0].listRight} /></div>
                    </Content>
                    <Anotation>
                        <StructuredText data={data.stages[0].subText} />
                    </Anotation>
                </Container>
            </Stages>
            <Inform>
                <Container className="containerExpanded">
                    <StructuredText data={data.inform[0].title} />
                    <Grid>
                        {data.inform[0].grid.map(el => (
                            <div>
                                <span>
                                    <img src={el.icon.url} />
                                </span>
                                <StructuredText data={el.sText} />
                            </div>
                        ))}
                    </Grid>
                </Container>
                <Waves />
            </Inform>
        </Wrapper>
    )
}

export default StagesWithInform

const Wrapper = styled.section`
    max-width: 1920px;
    margin: 0 auto;
    margin-top: 160px;
`

const Stages = styled.div`
    padding-top: 120px;
    background-color: #FEF2F2;

`

const Inform = styled.div`
    background-color: var(--backgroundLight);
    position: relative;
    padding-bottom: 100px;

    h2{
        padding-top: 80px;
        padding-bottom: 100px !important;
        font-weight: bold;
        font-size: 40px;
        line-height: 110%;
        text-align: center;
        letter-spacing: -1px;
        color: var(--mainLightText);
    }
`

const Container = styled.div`
    position: relative;
    z-index: 10;

    h2{
        padding-bottom: 32px;
        font-weight: bold;
        font-size: 40px;
        line-height: 110%;

        mark{
            background: inherit;
            color: red;
        }
    }

    &.containerExpanded{
        max-width: 1410px;
        padding: 0 45px;
        margin: 0 auto;

    }
`

const Content = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 20px;

    li{
        padding-left: 37px;
        margin-bottom: 16px;
        position: relative;
        font-size: 16px;
        line-height: 180%;

        p{
            color: var(--mainDarkText);
        }

        &::before{
            content: url(${props => props.logo});
            position: absolute;
            left: 0;
            top: 2px;
        }
    }

`

const Anotation = styled.div`
    padding-bottom: 240px;
    padding-top: 56px;
    text-align: right;
`

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 29px;
    grid-row-gap: 60px;

    div{
        box-sizing: border-box;
        padding: 40px 26px 50px;
        background: rgba(255, 255, 255, 0.04);
        border-radius: 8px;     
        text-align: center;

        span{
            width: 48px;
            height: 48px;
            border-radius: 8px;
            background-color: var(--mainLightText);
            display: flex;
            justify-content: center;
            align-items: center;
            margin: -80px auto 36px;

            img{
            
            }
        }
        h3{
            padding-bottom: 10px;
            color: var(--mainLightText);
            font-weight: bold;
            font-size: 18px;
            line-height: 130%;
            text-align: center;
        }

        p{
            color: var(--mainLightText);
            font-size: 14px;
            line-height: 180%;

        }
    }
` 