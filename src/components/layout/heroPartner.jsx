import React from 'react'
import { StructuredText } from 'react-datocms'
import styled from 'styled-components'

const HeroPartner = ({ data }) => {
    return (
        <Wrapper>
            <Container className="container">
                <Content>
                    <div>
                        <StructuredText data={data.title} />
                        <p>{data.text}</p>
                    </div>
                    <div className='grid'>
                        {data.images.map(el => (
                            <div>
                                <img src={el.url} />
                            </div>
                        ))}
                    </div>
                </Content>
            </Container>
        </Wrapper>
    )
}

export default HeroPartner

const Wrapper = styled.section`
    max-width: 1920px;
    margin: 0 auto;
    width: 100%;
    position: relative;
`

const Container = styled.div`
    position: relative;
    z-index: 100;
 

 `

const Content = styled.div`
    padding-top: 240px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 16px;

    div{
        max-width: 562px;
    }
    

    h1{
        color: var(--superDarkText);
        font-weight: bold;
        font-size: 36px;
        line-height: 110%;
        letter-spacing: -1px;
        margin-bottom: 24px;
    }

    p{
        font-size: 18px;
        line-height: 180%;
    }

    .grid{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 12px;



        div{
            background-color: var(--backgroundGrey);
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 16px;

            :last-child{
                background-color: var(--superDarkText);
            }
        }
    }

 `