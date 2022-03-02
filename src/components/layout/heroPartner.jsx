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
                                <img src={el.url}  alt={el.alt}/>
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
    padding-top: 200px;

    @media (max-width: 1024px){
        padding-top: 140px;
    }
`

const Container = styled.div`
    position: relative;
    z-index: 100;
 

 `

const Content = styled.div`
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
        grid-template-columns: calc(50% - 6px) calc(50% - 6px);
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

    @media (max-width: 1024px) {
        grid-template-columns: 1fr;
        grid-row-gap: 48px;

        div{
            max-width: 700px;
            width: 100%;
            margin: 0 auto;
        }

        .grid{
            div{
                img{
                    width: 100%;
                }
            }
        }
    }

 `