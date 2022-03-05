import React from "react"
import { StructuredText } from "react-datocms"
import styled from "styled-components"
import Yes from '../vectors/yes.svg'

const Price = ({ data }) => {
    return (
        <Wrapper>
            <Container className="container">
                <Flex>
                    <div>
                        <StructuredText data={data.title} />
                    </div>
                    <div>
                        <StructuredText data={data.anotation} />
                    </div>
                </Flex>
                <Table yes={Yes}>
                    {data.table.map(el => (
                        <li>
                            <span>
                                <p className="name">{el.name}</p>
                            </span>
                            <ul>
                                <StructuredText data={el.itemList} />
                            </ul>
                            <span>
                                <p className="price">{el.price}</p>
                            </span>
                        </li>
                    ))}
                </Table>
            </Container>
        </Wrapper>
    )
}

export default Price

const Wrapper = styled.section`
    padding-top: clamp(120px, 20vw, 160px);
    max-width: 1920px;
    margin: 0 auto;

`

const Container = styled.div`
    max-width: 1190px;

`

const Flex = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 76px;

    h2{
    font-weight: bold;
    font-size: 40px;
    line-height: 110%;
    letter-spacing: -1px;
        mark{
            color: var(--active);
            background-color: inherit;
        }
    }

    p{
        margin-left: 200px;
        font-size: 18px;
        line-height: 180%;
    }

    @media (max-width: 1024px) {
        display: grid;
        grid-row-gap: 24px;
        margin-bottom: 40px;

        h2{
            font-size: clamp(32px, 5.2vw, 40px);
        }

        p{
            margin-left: 0;
        }
    }
`

const Table = styled.ul`
    margin-bottom: 60px;

    li{
        display: flex;
        align-items: center;
        padding-top: 56px;
        padding-bottom: 43px;
        position: relative;

        &::before{
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 1px;
            background-color: var(--divider);
        }

        span, ul{
            width: 100%;
            max-width: 264px;
        }

        span{
            .name{            
                font-weight: bold;
                font-size: 24px;
                line-height: 110%;
                letter-spacing: -1px;
                color: var(--superDarkText);
                padding-right: 8px;
            }

            .price{
                font-weight: bold;
                font-size: 40px;
                line-height: 110%;
                letter-spacing: -1px;
                color: var(--superDarkText);
            }
        }

        ul{
            display: grid;
            grid-row-gap: 12px;

            li{
                padding: 0 0 0 32px;
                position: relative;

                p{
                    font-size: 14px;
                    line-height: 180%;
                    color: var(--superDarkText);

                }

                &::before{
                    content: url(${props => props.yes});
                    position: absolute;
                    left: 0;
                    top: 2px;
                    background-color: inherit;
                    color: var(--active);
                }
            }
        }
    }

    @media (max-width: 660px) {
        li{
            display: grid;
            padding-top: 30px;
            padding-bottom: 22px;

            ul{
                margin-top: 8px;
            }

            .price{
                margin-top: 20px;
            }
        }
    }
    
`