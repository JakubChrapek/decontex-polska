import React from "react"
import styled from "styled-components"
import { StructuredText } from 'react-datocms';

const ImageWithoutButton = ({ data }) => {
    debugger
    return (
        <Wrapper>
            <Container isImgBackground={data.isImgBackground} isImgRight={data.isImgRight} className="container">
                <div>
                    <img src={data.img.url} />
                </div>
                <div className="textPart">
                    <StructuredText data={data.title} />
                    <p>{data.text}</p>
                    <h6>{data.bottomText}</h6>
                </div>
            </Container>
        </Wrapper>
    )
}

export default ImageWithoutButton

const Wrapper = styled.section`
    padding-top: 160px;
`

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: ${props => props.isImgRight ? 'row-reverse' : 'row'};

    img{
        border-radius: 16px;
        box-shadow: ${props => props.isImgBackground ? props.isImgRight ? '32px 32px 0px 0px rgba(27, 53, 94, 1)' : '-32px 32px 0px 0px rgba(27, 53, 94, 1)' : null};
    }

    .textPart{
        max-width: 552px;
        width: 100%;
        h2{
            padding-bottom: 20px;
            font-weight: bold;
            font-size: 40px;
            line-height: 110%;
        }

        p{
            font-size: 18px;
            line-height: 180%;
        }

        h6{
            padding-top: 48px;
            margin-top: 48px;
            position: relative;

            &::before{
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                width: 100%;
                height: 1px;
                background-color: rgba(18, 17, 39, 0.16);
            }
        }
    }
`