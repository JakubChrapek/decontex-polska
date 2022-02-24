import React from "react"
import { StructuredText } from "react-datocms"
import styled from "styled-components"
import Logo from './../img/logo_light.png'

const ImageWithTextBackground = ({ data }) => {
    return (
        <Wrapper>
            <Container logo={Logo} className="container">
                <img src={data.img.url} />
                <div>
                    <StructuredText data={data.title} />
                    <StructuredText data={data.list} />
                </div>
            </Container>
        </Wrapper>
    )
}

export default ImageWithTextBackground

const Wrapper = styled.section`
    padding-top: clamp(80px, 10.2vw, 160px);
    padding-bottom: clamp(80px, 12vw, 160px);
    max-width: 1920px;
    margin: 0 auto;
`

const Container = styled.div`
    display: flex;
    justify-content: space-between;

    img{
        margin-right: 35px;
    }

    div{
        background-color: var(--backgroundGrey);
        border-radius: 20px;
        max-width: 608px;
        padding: 36px 36px 54px 36px;

        h2{
            font-weight: bold;
            font-size: 32px;
            line-height: 130%;
            letter-spacing: -0.5px;
            color: var(--superDarkText);
            margin-bottom: 36px;
        }

        

        ul{
            display: grid;
            grid-row-gap: 24px;

            li{
                padding-left: 37px;
                position: relative;

                &::before{
                    content: url(${props => props.logo});
                    position: absolute;
                    left: 0;
                }

                p{
                    color: var(--mainDarkText);
                    font-weight: bold;
                    font-size: 18px;
                    line-height: 130%;
                    letter-spacing: 0;
                }
            }
        }
    }

    @media (max-width: 1024px) {
        flex-direction: column-reverse;
        img{
            max-width: fit-content;
            width: 100%;
            margin: 72px auto 0;
        }

        div{
            max-width: 700px;
            margin: 0 auto;
        }
    }
`