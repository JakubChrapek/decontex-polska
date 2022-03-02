import React, { useState, useEffect } from "react"
import { StructuredText } from "react-datocms"
import styled from "styled-components"
import Waves from "../vectors/stagesWithInformWaves"
import Logo from './../img/logo.png'
import { motion } from "framer-motion"
import { useSwipeable } from "react-swipeable"
import { ArrowLeft, ArrowRight } from "../vectors/arrows";

const StagesWithInform = ({ data }) => {
    const [position, positionSet] = useState(0);

    const [canRight, changeCanRight] = useState(true)
    const [canLeft, changeCanLeft] = useState(false)

    useEffect(() => {
        if (position != 0 && position != data.inform[0].grid.length - 1) {
            changeCanLeft(true)
            changeCanRight(true)
        } else if (position === data.inform[0].grid.length - 1) {
            changeCanRight(false)
            changeCanLeft(true)
        } else if (position === 0) {
            changeCanLeft(false)
            changeCanRight(true)
        }
    }, [position])

    const handlers = useSwipeable({
        onSwipedLeft: () => {
            if (canRight) {
                positionSet(position + 1)
            }
        },
        onSwipedRight: () => {
            if (canLeft) {
                positionSet(position - 1)
            }
        },
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });

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
                    <Grid itemCount={data.inform[0].grid.length}>
                        {data.inform[0].grid.map(el => (
                            <motion.div {...handlers} animate={{ left: `calc(${position} * (-100% - 35px))` }}>
                                <span>
                                    <img src={el.icon.url} />
                                </span>
                                <StructuredText data={el.sText} />
                            </motion.div>
                        ))}
                    </Grid>
                    <SliderControls>
                        <button disabled={!canLeft} onClick={() => { positionSet(position - 1) }} ><ArrowLeft /></button>
                        <button disabled={!canRight} onClick={() => { positionSet(position + 1) }} ><ArrowRight /></button>
                    </SliderControls>
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

    @media(max-width: 1024px){
        h2{
            font-size: clamp(32px, 4.1vw, 40px);
        }
    }
`

const Container = styled.div`
  position: relative;
  z-index: 10;

  h2 {
    padding-bottom: 32px;
    font-weight: bold;
    font-size: 40px;
    line-height: 110%;

    mark {
      background: inherit;
      color: red;
    }
  }
  @media (max-width: 1024px) {
    max-width: 697px;
  }

  &.containerExpanded {
    max-width: 1410px;
    padding: 0 45px;
    margin: 0 auto;

    @media (max-width: 660px) {
      padding: 0 35px;
      overflow: hidden;
    }
  }
`;

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

    @media(max-width: 1024px){
        grid-template-columns: 1fr;
    }

`

const Anotation = styled.div`
    padding-bottom: 240px;
    padding-top: 56px;
    text-align: right;

    @media(max-width: 1024px){
        padding-bottom: clamp(120px, 15.7vw, 240px);
        text-align: left;
    }
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

    @media(max-width: 1024px){
        grid-template-columns: 1fr 1fr;
    }

    @media (max-width: 720px) {
        grid-template-columns: repeat(${props => props.itemCount}, 100%);
        grid-column-gap: 35px;

        div{
            position: relative;
            user-select: none;
        }
    }
`

const SliderControls = styled.div`
    @media (min-width: 721) {
        display: none;
    }
    margin-top: 40px;
    button{
        margin-right: 16px;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        border: 1px solid var(--backgroundMedium);
        display: inline-flex;
        justify-content: center;
        align-items: center;

        border: 1px solid var(--mainLightText);
        path{
            stroke: var(--mainLightText);
        }

        &:disabled{
            border: 1px solid var(--divider);

            path{
                stroke: var(--divider);
            }
        }
    }
`