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
    padding-top: 160px;
    max-width: 1920px;
    margin: 0 auto;
    padding-bottom: 160px;
`

const Container = styled.div`
    display: flex;
    justify-content: space-between;

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
`