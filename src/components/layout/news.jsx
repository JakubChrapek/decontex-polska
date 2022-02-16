import React, { useState } from "react"
import styled from "styled-components"
import { StructuredText } from 'react-datocms'
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "../vectors/arrows";
import { useSwipeable } from "react-swipeable";

const News = ({ data }) => {
    const [position, positionSet] = useState(0);

    const handlers = useSwipeable({
        onSwipedLeft: () => {
            if (position !== 1) {
                positionSet(position + 1)
            }
        },
        onSwipedRight: () => {
            if (position !== 0) {
                positionSet(position - 1)
            }
        },
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });

    return (
        <Wrapper>
            <Container className="container">
                <Flex>
                    <span>
                        <StructuredText data={data.title} />
                        <p>{data.text}</p>
                    </span>
                    <a href='#'>{data.buttonText}</a>
                </Flex>
                <Slider>
                    <div {...handlers}>
                        <div className="slider">
                            <motion.div
                                className="sliderItem"
                                animate={{
                                    left: `${position * -624}px`,
                                }} >
                            </motion.div>
                            <motion.div
                                className="sliderItem"
                                animate={{
                                    left: `${position * -624}px`,
                                }} >
                            </motion.div>
                            <motion.div
                                className="sliderItem"
                                animate={{
                                    left: `${position * -624}px`,
                                }} >
                            </motion.div>
                        </div>
                    </div>
                </Slider>
                <SliderControls>
                    <button disabled={!position} onClick={() => { positionSet(position - 1) }} ><ArrowLeft /></button>
                    <button disabled={position} onClick={() => { positionSet(position + 1) }} ><ArrowRight /></button>
                </SliderControls>
            </Container>
        </Wrapper>
    )
}

export default News

const Wrapper = styled.section`
    margin-top: 160px;
    padding: 96px 0 126px;
    background-color: var(--backgroundGrey);
    overflow: hidden;
`

const Container = styled.div`
`

const Flex = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    span{
        display: flex;

        h2{
            font-weight: bold;
            font-size: 48px;
            line-height: 100%;
            letter-spacing: -2px;
            margin-right: 62px;
        }

        p{
            max-width: 431px;
            font-size: 18px;
            line-height: 180%;
        }
    }

    a{
        padding: 14px 32px;
        border-radius: 8px;
        background-color: var(--blackButtonBackground);
        color: var(--mainLightText);
        font-weight: 500;
        font-size: 16px;
        line-height: 21px;
    }
`

const Slider = styled.div`
    .slider{

        display: grid;
        grid-template-columns: 588px 588px 588px;
        grid-column-gap: 36px;
        margin-top: 150px;
        width: fit-content;

        .sliderItem{
            background-color: red;
            height: 442px;
            border-radius: 15px;
            position: relative;
        }
    }
`

const SliderControls = styled.div`
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

        &:disabled{
            border: 1px solid var(--divider);

            path{
                stroke: var(--divider);
            }
        }
    }
`