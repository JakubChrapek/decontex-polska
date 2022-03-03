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
                                <StructuredText data={el.otherInform} />
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
  padding-top: clamp(110px, 11.11vw, 160px);
  max-width: 1920px;
  margin: 0 auto;
  margin-bottom: clamp(72px, 9.3vw, 100px);
`;

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
            padding: clamp(24px, 4.1vw, 58px) clamp(16px, 5.2vw, 73px);
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
                width: 80%;
                padding: 26px 0;
                padding-right: clamp(36px, 6.9vw, 100px);
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
                padding-left: clamp(36px, 6.9vw, 100px);
            }
        }
    }

    @media (max-width: 660px) {
        ul{
            li{
                flex-direction: column;
                align-items: flex-start;

                .right{
                    padding-left: 0;
                    padding-top: 16px;
                }

                .left{
                    padding-top: 0;
                    padding-bottom: 16px;
                    padding-right: 0;
                    width: 100%;

                    &::after{
                        top: unset;
                        left: 0;
                        width: unset;
                        height: 1px;
                    }
                }
            }
        }
    }
`