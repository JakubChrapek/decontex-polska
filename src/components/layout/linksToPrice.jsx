import React from 'react'
import { StructuredText } from 'react-datocms'
import styled from 'styled-components'

const LinksToPrice = ({ data }) => {
    return (
        <Wrapper>
            <Container className="container">
                <Flex isImgRight={data.imageWithButton[0].isImgRight} isImgBackground={data.imageWithButton[0].isImgBackground}>
                    <div>
                        <img src={data.imageWithButton[0].img.url} />
                    </div>
                    <div className='textPart'>
                        <StructuredText data={data.imageWithButton[0].title} />
                        <p>{data.imageWithButton[0].text}</p>
                        {data.imageWithButton[0].button.map(el => (
                            <a href={el.slug} aria-label={el.ariaLabel}><StructuredText data={el.name} /></a>
                        ))}
                    </div>
                </Flex>
                <Grid>
                    {data.grid.map(el => (
                        <li>
                            <img src={el.img.url}/>
                            <p>{el.text}</p>
                        </li>
                    ))}
                </Grid>
            </Container>
        </Wrapper>
    )
}

export default LinksToPrice

const Wrapper = styled.section`
    padding-top: 160px;
    max-width: 1920px;
    margin: 0 auto;
`

const Container = styled.div`

`

const Flex = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: ${props => props.isImgRight ? 'row-reverse' : 'row'};

    img{
        border-radius: 16px;
        box-shadow: ${props => props.isImgBackground ? props.isImgRight ? '32px 32px 0px 0px var(--backgroundMedium)' : '-32px 32px 0px 0px var(--backgroundMedium)' : null};
    }

    .textPart{
        max-width: 552px;
        width: 100%;
        h2{
            padding-bottom: 20px;
            font-weight: bold;
            font-size: 40px;
            line-height: 110%;

            mark{
                background: inherit;
                color: red;
            }
        }

        p{
            font-size: 18px;
            line-height: 180%;
        }

        a{
            display: block;
            margin-top: 20px;
            width: fit-content;
            border-radius: 8px;


            p{
                width: fit-content;
                padding: 0 24px;
                background: #51B8EB;
                border-radius: 8px;
                display: block;
                height: 40px;
                line-height: 40px;
                color: var(--navHover);
                position: relative;
                
                mark{
                    color: var(--navHover);
                    border-radius: 8px;
                    background-color: var(--blackButtonBackground);
                    display: block;
                    position: absolute;
                    padding: 0 24px;
                    width: max-content;
                    left: 0;
                }

            }
            
            &:hover{
            }
        }
    }
`

const Grid = styled.ul`
    margin-top: 160px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 36px;
    grid-row-gap: 36px;

    li{
        box-shadow: 0px 20px 50px rgba(18, 17, 39, 0.08);
        border-radius: 15px;

        img{
            width: 100%;
        }

        p{
            text-align: center;
            padding: 24px 0 30px;
            font-weight: bold;
            font-size: 24px;
            line-height: 110%;
            text-align: center;
            color: var(--superDarkText);
        }
    }
`