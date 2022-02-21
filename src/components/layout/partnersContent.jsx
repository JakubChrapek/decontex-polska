import React from 'react'
import { StructuredText } from 'react-datocms'
import styled from 'styled-components'

const PartnersContent = ({ data }) => {
    return (
        <Wrapper>
            <Container className="container">
                <ul>
                    {data.grid.map(el => (
                        <li>
                            <div className='left'>
                                <h2>{el.unsTitle}</h2>
                                <p>{el.text}</p>
                            </div>
                            <div className='right'>
                                <StructuredText data={el.otherInform}/>
                            </div>
                        </li>
                    ))}
                </ul>
            </Container>
        </Wrapper>
    )
}

export default PartnersContent

const Wrapper = styled.section`
    padding-top: 160px;
    max-width: 1920px;
    margin: 0 auto;
    margin-bottom: 100px;

`

const Container = styled.div`
    ul{
        display: grid;
        grid-gap: 24px;

        li{
            background-color: var(--backgroundGrey);
            min-height: 100px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 38px 73px;
            border-radius: 15px;

            h2{
                margin-bottom: 8px;
                font-weight: bold;
                font-size: 18px;
                line-height: 130%;
                letter-spacing: 0px;
                color: var(--superDarkText);
            }

            p{
                font-size: 14px;
                line-height: 180%;
            }

            .left{
                box-sizing: content-box;
                width: 557px;
                padding: 26px 100px 26px 0;
                position: relative;

                &::after{
                    content: "";
                    position: absolute;
                    right: 0;
                    top: 0;
                    bottom: 0;
                    width: 1px;
                    background-color: var(--divider);
                }
            }

            .right{
                box-sizing: content-box;
                width: 223px;
                padding-left: 100px;
            }
        }
    }
`