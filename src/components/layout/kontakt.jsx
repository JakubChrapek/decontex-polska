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

    @media (max-width: 480px){
        padding-top: 80px;
    }
`

const Container = styled.div`

`

const Content = styled.div`
    display: grid;
    grid-template-columns: calc(35% - 18px) calc(65% - 18px);
    grid-column-gap: 36px;

    .form{
        justify-self: end;
        padding: 42px clamp(20px, 4.1vw, 72px);
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

        a{
            color: var(--active);
            transition: .2s linear;
            border-bottom: 1px solid #fff;

            &:hover{
                border-bottom: 1px solid var(--active);
            }
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

    @media (max-width: 767px) {
        display: flex;
        flex-direction: column-reverse;

        .form{
            width: 100%;
            margin-bottom: 72px;
        }
    }
`