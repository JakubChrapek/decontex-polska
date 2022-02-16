import React from "react"
import styled from "styled-components"
import { StructuredText } from 'react-datocms'

const Grid = ({data}) => {
    return(
        <Wrapper>
            <Container className="container">
                <div>

                </div>
                <div>

                </div>
            </Container>
        </Wrapper>
    )
}

export default Grid

const Wrapper = styled.section`
    padding-top: 160px;
`

const Container = styled.div`
    display: flex;
    justify-content: space-between;
`