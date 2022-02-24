import React from 'react'
import { StructuredText } from 'react-datocms'
import styled from 'styled-components'
import Waves from '../vectors/heroOtherPageWaves'
import OrdersForm from './ordersForm'
import Logo from "../vectors/logo"

const HeroOrders = ({ data }) => {
    return (
        <Wrapper>
            <Container className="container">
                <Content>
                    <div className='textPart'>
                        <StructuredText data={data.title} />
                        <p>{data.text}</p>
                        <h3><Logo />{data.subText}</h3>
                    </div>
                    <div>
                        <img src={data.img.url} />
                    </div>
                </Content>
                <FormWrapper>
                    <OrdersForm buttonText={data.buttonText} />
                </FormWrapper>
            </Container>
            <Waves />
        </Wrapper>
    )
}

export default HeroOrders

const Wrapper = styled.section`
    max-width: 1920px;
    margin: 0 auto;
    padding-bottom: 160px;
    width: 100%;
    position: relative;
    background-color: var(--backgroundGrey);

    .wrapper{
        height: 30%;
        bottom: 0;
        top: unset;
        background: #fff;

    }

    .svg{
        bottom: unset;
        top: 0;
        transform: translateY(-100%);
    }

    @media (max-width: 1024px) {
        padding-top: clamp(72px, 13vw, 160px);
    }
`

const Container = styled.div`
    position: relative;
    z-index: 100;
 

 `

const Content = styled.div`
    padding-top: 240px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .textPart{
        margin-right: 35px;
    }

    div{
        max-width: 562px;
    }
    

    h1{
        color: var(--superDarkText);
        font-weight: bold;
        font-size: 48px;
        line-height: 130%;
        letter-spacing: -2px;
        margin-bottom: 12px;
    }

    h3{
        margin-top: 12px;
        position: relative;
        font-weight: 500;
        font-size: 16px;
        line-height: 180%;
        font-family: 'IBM Plex Sans';
        display: flex;
        align-items: center;

        svg{
            margin-right: 12px;
        }

    }

    p{
        font-size: 18px;
        line-height: 180%;
    }

    img{
        border-radius: 16px;
        box-shadow: 32px 32px 0px 0px var(--backgroundMedium);
        margin-right: 32px;
    }

    @media (max-width: 1024px) {
        flex-direction: column;
        padding: 0;

        div{
            width: 90%;
            max-width: 700px;
        }

        img{
            max-width: 668px;
            width: 90%;
            margin: 50px 0 32px 0;
            display: block;
            
        }

        .textPart{
            max-width: 700px;
            width: 100%;
            margin: 0 auto;
            padding-left: 0;

            h2{
                font-size: clamp(32px, 5.7vw, 40px); 
            }
        }
    }

 `

const FormWrapper = styled.div`
    background: #FFFFFF;
    box-shadow: 0px 20px 50px rgba(18, 17, 39, 0.08);
    border-radius: 25px;
    padding: clamp(20px, 2vw, 26px)  clamp(20px, 5.2vw, 90px) clamp(44px, 2vw, 50px) clamp(20px, 5.2vw, 90px);
    margin-top: 200px;
`