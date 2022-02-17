import React from "react"
import styled from "styled-components"
import { StructuredText } from 'react-datocms'
import Waves from "../vectors/gridWaves"

const Grid = ({ data }) => {
    return (
        <Wrapper>
            <Container className="container">
                <ContentDesctop>
                    <div className="left">
                        <StructuredText data={data.mainTitle} />
                        <p className="mainText">{data.mainText}</p>
                        <img className="secondImg" src={data.secondImg.url} />
                        <p className="secondText">{data.secondText}</p>
                        <StructuredText data={data.subTitle} />
                        <p className="subText">{data.subText}</p>
                        {data.link.map(el => (
                            <a className="link" href={el.slug} aria-label={el.ariaLabel}>
                                <StructuredText data={el.name} />
                            </a>
                        ))}
                    </div>
                    <div className="right">
                        <img className="firstImg" src={data.firstImg.url} />
                        <p className="firstText">{data.firstText}</p>
                        <img className="thirdImg" src={data.thirdImg.url} />
                    </div>
                </ContentDesctop>
            </Container>
            <Waves />
        </Wrapper>
    )
}

export default Grid

const Wrapper = styled.section`
    padding-top: 160px;
    padding-bottom: 136px;
    position: relative;
    max-width: 1920px;
    margin: 0 auto;
    overflow: hidden;
`

const Container = styled.div`
    display: flex;
    justify-content: space-between;
`

const ContentDesctop = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;

    .left{
        max-width: 535px;

        h2{
            
            font-weight: bold;
            font-size: 64px;
            line-height: 100%;
            /* or 64px */

            letter-spacing: -2px;
        }

        h2:nth-child(5){
        color: var(--mainLightText);
            
        }
    }

    .right{
        max-width: 450px;
    }

    .mainText{
        margin-top: 24px;
        margin-bottom: 160px;
    }

    .secondText{
        margin-top: 36px;
        margin-bottom: 100px;
        max-width: 450px;
        color: var(--subLightText);
    }

    .subText{
        margin-top: 24px;
        margin-bottom: 48px;
        max-width: 450px;
        color: var(--subLightText);
    }

    .firstText{
        margin-top: 36px;
        margin-bottom: 387px;
        color: var(--subDarkText);
    }

    .secondImg{ 
        aspect-ratio: 1.33/1;
        width: 450px;
        border-radius: 15px;
    }

    .firstImg{
        aspect-ratio: 1.33/1;
        width: 450px;
        border-radius: 15px;

    }

    .thirdImg{
        aspect-ratio: 1.33/1;
        width: 450px;
        border-radius: 15px;
        
    }

    .link{
        padding: 14px 32px;
        display: block;
        width: fit-content;
        border-radius: 8px;
        background-color: var(--mainLightText);
        p{
            color: var(--buttonText);
        }

    }
`