import React from "react"
import styled from "styled-components"
import { StructuredText } from 'react-datocms'
import { Link } from "gatsby"
import Dots from '../img/dotsBig.png'

const ImageWithButton = ({ data }) => {
    return (
        <Wrapper>
            <Container backgroundColor={data.backgroundColor} isImgBackground={data.isImgBackground} isImgRight={data.isImgRight} className="container">
                <div className="imageWrapper">
                    <img className="dots" src={Dots} />
                    <img className="mainImage" src={data.img.url} />
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

    .imageWrapper{
        position: relative;
        height: fit-content;
        width: fit-content;
        margin: 0 auto;

        .dots{
            display: ${props => props.isImgBackground ? null : 'none'};
            position: absolute;
            max-width: 40%;
            bottom: -15%;
            left: ${props => props.isImgRight ? 'unset' : '-25%'};
            right: ${props => props.isImgRight ? '-25%' : 'unset'};
            z-index: 10;
        }

        .mainImage{
            border-radius: 16px;
            box-shadow: ${props => props.isImgBackground ? props.isImgRight ? `32px 32px 0px 0px` + props.backgroundColor.hex : '-32px 32px 0px 0px' + props.backgroundColor.hex : null};
            margin-left: ${props => props.isImgRight ? '35px' : '0'};
            margin-right: ${props => props.isImgRight ? '0' : '35px'};
            max-width: 400px;
        }
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
                height: 49px;
                line-height: 49px;
                color: var(--navHover);
                border: 1px solid var(--active);
                position: relative;
                transition: .2s linear;
                
                mark{
                    color: var(--navHover);
                    border-radius: 8px;
                    background-color: var(--blackButtonBackground);
                    border: 1px solid var(--blackButtonBackground);
                    display: block;
                    position: absolute;
                    padding: 0 24px;
                    width: max-content;
                    left: 0;
                    transition: color .2s linear;
                    transform: translate(-2px, -2px);
                }
                    
                &:hover{
                    border: 1px solid var(--active);
                    background-color: transparent;

                    color: var(--active);

                    mark{
                        color: #d30000;
                    }
                }

            }
            
        
        }
    }

    @media (max-width: 1024px) {
        flex-direction: column-reverse;

        .imageWrapper{
            width: 100%;

            .dots{
                max-width: 30%;
                bottom: -10%;
                left: ${props => props.isImgRight ? 'unset' : '-10%'};
                right: ${props => props.isImgRight ? '-10%' : 'unset'};
            }

            .mainImage{
                max-width: 668px;
                width: 90%;
                margin: 50px auto 32px auto;
                display: block;
                
            }
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