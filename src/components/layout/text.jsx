import React from "react"
import { StructuredText } from "react-datocms"
import styled from "styled-components"


const Text = ({ data }) => {
    return (
        <Wrapper>
            <Container className='container'>
                <StructuredText data={data.sText} />
            </Container>
        </Wrapper>
    )
}

export default Text

const Wrapper = styled.section`
    padding-top: 120px;
    @media (max-width: 1024px) {
        padding-top: clamp(108px, 21vw, 160px);
    }
`

const Container = styled.div`
    p{
        max-width: clamp(720px , 65vw, 935px);
        font-weight: bold;
        font-size: clamp(24px, 2.22vw ,32px);
        line-height: 130%;
        color: var(--mainDarkText);

        letter-spacing: -0.5px;
    }

    @media (max-width: 1024px) {
        p{
            font-size: clamp(18px, 3.14vw,32px);
            max-width: 700px;
            margin: 0 auto;
        }
    }
`