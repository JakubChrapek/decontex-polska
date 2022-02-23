import React from "react"
import { StructuredText } from "react-datocms"
import styled from "styled-components"
import KontaktForm from "./kontaktForm"

const Kontakt = ({ data }) => {
    return (
        <Wrapper>
            <Container className="container">
                <Content>
                    <div className="text"><StructuredText data={data.leftInform} /></div>
                    <div className="form">
                        <StructuredText data={data.tableInform} />
                        <KontaktForm buttonText={data.buttonText} />
                    </div>
                </Content>
            </Container>
        </Wrapper>
    )
}

export default Kontakt

const Wrapper = styled.section`
    padding-top: 160px;
    max-width: 1920px;
    margin: 0 auto;
`

const Container = styled.div`

`

const Content = styled.div`
    display: flex;
    justify-content: space-between;

    .form{
        padding: 42px 72px;
        max-width: 635px;
        box-shadow: 0px 20px 50px rgba(18, 17, 39, 0.08);
        border-radius: 25px;
        margin-bottom: 100px;

        h2{
            font-weight: bold;
            font-size: 32px;
            line-height: 130%;
            letter-spacing: -0.5px;
            color: var(--superDarkText);
            margin-bottom: 12px;
        }

        p{
            margin-bottom: 26px;
        }
    }

    .text{
        h3{
            margin-bottom: 12px;
        }

        h4{
            margin: 32px 0 24px 0;
            font-size: 16px;
            line-height: 21px;
            color: var(--superDarkText);
        }

        p{
            color: var(--subDarkText);
            font-size: 14px;
            line-height: 180%;
                        
        }
    }
`