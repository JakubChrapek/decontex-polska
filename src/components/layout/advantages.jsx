import React from "react"
import styled from "styled-components"
import { StructuredText } from 'react-datocms'
import Logo from "../vectors/logo"

const Advantages = ({ data }) => {
    return (
        <Wrapper>
            <Container className="container">
                <StructuredText data={data.title} />
                <p>{data.text}</p>
                <Flex>
                    <div>
                        {data.listLeft.map(el => (
                            <>
                                <h3><Logo /><span>{el.title}</span></h3>
                                <p>{el.text}</p>
                            </>
                        ))}
                    </div>
                    <div>
                        {data.listRight.map(el => (
                            <>
                                <h3><Logo /><span>{el.title}</span></h3>
                                <p>{el.text}</p>
                            </>
                        ))}
                    </div>
                </Flex>
            </Container>
        </Wrapper>
    )
}

export default Advantages

const Wrapper = styled.section`
    background-color: var(--backgroundGrey);
    padding-top: clamp(80px, 11.1vw, 160px);
    padding-bottom: clamp(80px, 11.1vw, 160px);
    max-width: 1920px;
    margin: 0 auto;
`

const Container = styled.div`
    h2{
        margin-bottom: 16px;
        color: var(--superDarkText);
    }

    p{
        margin-bottom: 56px;
        font-size: 16px;
    }

    div{

        h3{
            color: var(--superDarkText);
            margin-bottom: 8px;
            display: grid;
            grid-template-columns: 25px 1fr;
            grid-column-gap: 12px;
            font-weight: bold;
            font-size: 18px;
            line-height: 130%;

            svg{
            }
        }

        p{
            margin-bottom: 16px;
            margin-left: 38px;
            font-size: 14px;
            line-height: 180%;
        }
    }

    @media (max-width: 1024px) {
        h2{
            font-size: clamp(32px, 5.2vw, 48px);
        }

        p{
            font-size: 14px;
        }
    }
`

const Flex = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 48px;

    div{
        max-width: 521px;
        width: 100%;
    }

    @media (max-width: 870px){
        grid-template-columns: 1fr;

        div{
            max-width: unset;
        }
    }
`