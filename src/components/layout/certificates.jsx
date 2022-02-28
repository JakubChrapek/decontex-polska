import React, { useRef } from "react"
import styled from "styled-components"
import { StructuredText } from 'react-datocms'
import { motion } from "framer-motion";
import { GatsbyImage } from 'gatsby-plugin-image';

const Certificates = ({ data }) => {
    const constraintsRef = useRef(null);
    return (
        <Wrapper>
            <Container className="container">
                <Content>
                    <StructuredText data={data.title} />
                    <p>{data.text}</p>
                    <Flex ref={constraintsRef} >
                        <motion.div drag='x' dragConstraints={constraintsRef} className="slider" >
                            {data.images.map(el => (
                                <div>
                                    <GatsbyImage image={el.img.gatsbyImageData} alt={el.img.alt} title={el.img.title} />
                                    {/* <img src={el.img.url} /> */}
                                </div>
                            ))}
                        </motion.div>
                    </Flex>
                </Content>
            </Container>
        </Wrapper>
    )
}

export default Certificates

const Wrapper = styled.section`
    padding-top: clamp(80px, 11.1vw, 160px);
    max-width: 1920px;
    margin: 0 auto;
    overflow: hidden;

    @media (max-width: 560px) {
        padding-top: 0;
    }
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

    @media (max-width: 1024px){
        h2{
            font-size: clamp(32px, 5.2vw, 48px);
        }

        p{
            font-size: 16px;
        }
    }

    @media (max-width: 767px){
        h2{
            padding: 0 15px;
        }

        p{
            padding: 0 15px;

        }
    }
`

const Content = styled.div`
    position: relative;
    padding: 100px 0;

    &::after{
        content: '';
        z-index: -1;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 100px;
        left: 100px;
        background-color: var(--backgroundBlue);
        border-radius: 15px;
    }
    
    @media (max-width: 1024px) {
        padding: 88px 0 ;
        &::after{
            right: 0;
            left: 0;
        }
    }

    @media (max-width: 560px){
        padding: 72px 0 ;
        &::after{
            border-radius: 0;
            right: -35px;
            left: -35px;
        }
    }

    @media (max-width: 480px) {
        &::after{
            right: -16px;
            left: -16px;
        }
        
    }
`

const Flex = styled.div`

    .slider{
        width: calc(100% + 32px);
        transform: translateX(-16px);
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-column-gap: 30px;
        margin-top: 108px;

        > div{
            background-color: #fff;
            box-shadow: 0px 20px 50px rgba(18, 17, 39, 0.08);
            border-radius: 15px;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            aspect-ratio: 1/1;
            padding: 24px;

            img{
                border-radius: 15px;
                width: 100%;
                max-width: 180px;
                pointer-events: none;
            }
        }

        @media (max-width: 1024px){
            margin-top: clamp(56px, 7.3vw, 108px);
        }

        @media (max-width: 767px) {
            width: 1168px;
        }
    }
`