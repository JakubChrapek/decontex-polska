import React from "react"
import styled from "styled-components"
import { StructuredText } from 'react-datocms'
import { Link } from "gatsby"

const ImageWithButton = ({ data }) => {
    return (
        <Wrapper>
            <Container isImgBackground={data.isImgBackground} isImgRight={data.isImgRight} className="container">
                <div>
                    <img src={data.img.url} />
                </div>
                <div className="textPart">
                    <StructuredText data={data.title} />
                    <p>{data.text}</p>
                    {data.button.map(el => (
                        <Link to={el.slug} aria-label={el.ariaLabel}><StructuredText data={el.name} /></Link>
                    ))}
                </div>
            </Container>
        </Wrapper>
    )
}

export default ImageWithButton

const Wrapper = styled.section`
    padding-top: 160px;
    max-width: 1920px;
    margin: 0 auto;

    @media (max-width: 1024px){
        padding-top: clamp(72px, 13vw, 160px);

    }
`

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: ${props => props.isImgRight ? 'row-reverse' : 'row'};

    img{
        border-radius: 16px;
        box-shadow: ${props => props.isImgBackground ? props.isImgRight ? '32px 32px 0px 0px var(--backgroundMedium)' : '-32px 32px 0px 0px var(--backgroundMedium)' : null};
        margin-left: ${props => props.isImgRight ? '35px' : '0'};
        margin-right: ${props => props.isImgRight ? '0' : '35px'};
    }

    .textPart{
        max-width: 552px;
        width: 100%;
        padding-left: ${props => props.isImgRight ? '0' : '35px'};
        padding-right: ${props => props.isImgRight ? '35px' : '0'};

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

    @media (max-width: 1024px) {
        flex-direction: column-reverse;

        img{
            max-width: 668px;
            width: 90%;
            margin: 50px auto 32px auto;
            display: block;
            
        }

        .textPart{
            max-width: 700px;
            margin: 0 auto;
            padding-left: 0;

            h2{
                font-size: clamp(32px, 5.7vw, 40px); 
            }
        }
    }
`