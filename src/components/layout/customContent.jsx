import React from "react"
import { StructuredText } from "react-datocms"
import styled from "styled-components"

const CustomContent = ({ data }) => {
    return (
        <Wrapper>
            <Container className="container">
                <StructuredText data={data.content} />
            </Container>
        </Wrapper>
    )
}

export default CustomContent

const Wrapper = styled.section`
    padding-top: 80px;
    padding-bottom: 100px;
    max-width: 1920px;
    margin: 0 auto;

`

const Container = styled.div`
    h2{
        margin-bottom: 48px;
        color: var(--mainDarkText);
        font-weight: bold;
        font-size: 40px;
        line-height: 1.3;
        letter-spacing: -1px;
    }

    h3{
        margin-bottom: 24px;
        color: var(--mainDarkText);
        font-weight: bold;
        font-size: 32px;
        line-height: 130%;
        letter-spacing: -0.5px;
    }

    p{
        margin-bottom: 24px;
        font-size: 20px;
        line-height: 180%;
        color: var(--subDarkText);
    }

    ul{
        margin-top: 42px;
        margin-bottom: 42px;

        li{
            padding-left: 28px;
            position: relative;

            &::before{
                content: "●";
                position: absolute;
                left: 0;
                color: #F4EEE6;
                font-size: 20px;
                line-height: 180%;
            }

            p{

            }
        }
    }

`