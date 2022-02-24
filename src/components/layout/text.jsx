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
`

const Container = styled.div`
    p{
        max-width: 935px;
        font-weight: bold;
        font-size: 32px;
        line-height: 130%;
        color: var(--mainDarkText);

        letter-spacing: -1.5px;
    }

    @media (max-width: 1024px) {
        p{
            font-size: clamp(18px, 3.14vw,32px);
            max-width: 700px;
            margin: 0 auto;
        }
    }
`