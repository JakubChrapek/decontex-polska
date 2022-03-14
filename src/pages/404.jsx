import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import PageWrapper from '../components/layout/pageWrapper'
import styled from 'styled-components'
import Dots from '../components/img/dotsSmall.png'
import { Link } from 'gatsby'

const NotFoundPage = () => {
  const data = useStaticQuery(graphql`
    query {
      datoCmsSite {
        locales
      }
      datoCmsNotFoundPage {
        backToHomeText
        title
        subtitle
        img {
          url
          alt
        }
      }
    }
  `);

  return (
    <PageWrapper notFoundPage>
      <Wrapper>
        <Container className='container'>
          <div className="imageWrapper">
            <img className="dots" src={Dots} alt='DOTS' />
            <img className="mainImage" src={data.datoCmsNotFoundPage.img.url} alt="MAIN"/>
          </div>
          <div className="textPart">
            <h1>{data.datoCmsNotFoundPage.title}</h1>
            <p>{data.datoCmsNotFoundPage.subtitle}</p>
            <Link to='/'><p>{data.datoCmsNotFoundPage.backToHomeText}</p></Link>
          </div>
        </Container>
      </Wrapper>
    </PageWrapper>
  );
};

export default NotFoundPage;

const Wrapper = styled.div`
  padding-bottom: 200px;
  padding-top: 200px;

  @media (max-width: 1024px) {
    padding-top: 140px;
    padding-bottom: clamp(120px, 20.8vw, 200px);
  }
`

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    align-items: center;

    .imageWrapper{
        position: relative;
        height: fit-content;
        width: fit-content;
        margin: 0 auto;

        .dots{
            position: absolute;
            max-width: 40%;
            bottom: -15%;
            right: -25%;
            z-index: 10;
        }

        .mainImage{
            border-radius: 16px;
            box-shadow: 32px 32px 0px 0px var(--backgroundMedium);
            margin-right: 35px;
        }
    }

    .textPart{
        max-width: 552px;
        width: 100%;
        padding-right: 35px;

        h1{
            color: var(--superBlackText);
            padding-bottom: 20px;
            font-weight: bold;
            font-size: 48px;
            line-height: 130%;
            letter-spacing: -1px;

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