import React, { Fragment, useContext } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import { StructuredText } from 'react-datocms';
import { LangContext } from '../../context/langProvider';
import Waves from '../vectors/footerWaves';
import { Link } from "gatsby"

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      allDatoCmsFooter {
        nodes {
          id: originalId
          locale
          title {
            value
          }
          copyright
          socialMedia {
            ariaLabel
            link
            icon {
              url
            }
          }
          navigation {
            ariaLabel
            slug
            name {
              value
            }
          }
          buttons {
            slug
            ariaLabel
            name {
              value
            }
          }
        }
      }
    }
  `);

  // const { currentLanguage } = useContext(LangContext);
  const currentLanguage = 'pl'
  return (
    <Wrapper>
      <Container className="container">
        {data.allDatoCmsFooter.nodes
          .filter((el) => el.locale === currentLanguage)
          .map((el) => (
            <StructuredText data={el.title} />
          ))}
        <Flex>
          {data.allDatoCmsFooter.nodes
            .filter((el) => el.locale === currentLanguage)
            .map((el) =>
              el.buttons.map((innerEl, index) => (
                <Link
                  className={`c` + index}
                  aria-label={innerEl.ariaLabel}
                  to={`/${innerEl.slug}`}
                  key={el.id}
                >
                  <StructuredText data={innerEl.name} />
                </Link>
              ))
            )}
        </Flex>
        <Nav>
          <ul>
            {data.allDatoCmsFooter.nodes
              .filter((el) => el.locale === currentLanguage)
              .map((el) =>
                el.navigation.map((innerEl, index) => (
                  <li>
                    <Link
                      className={`c` + index}
                      aria-label={innerEl.ariaLabel}
                      to={`/${innerEl.slug}`}
                      key={el.id}
                    >
                      <StructuredText data={innerEl.name} />
                    </Link>
                  </li>
                ))
              )}
          </ul>
        </Nav>
        <CopyAndSocialWrapper>
          <SocialMedia>
            {data.allDatoCmsFooter.nodes
              .filter((el) => el.locale === currentLanguage)
              .map((el) =>
                el.socialMedia.map((innerEl, index) => (
                  <li>  
                    <a
                      className={`c` + index}
                      href={innerEl.slug}
                    >
                      <img src={innerEl.icon.url} />
                    </a>
                  </li>
                ))
              )}
          </SocialMedia>
          <Copyright>
            {data.allDatoCmsFooter.nodes
              .filter((el) => el.locale === currentLanguage)
              .map((el) => (
                <>{el.copyright}</>
              ))}
          </Copyright>
        </CopyAndSocialWrapper>
      </Container>
      <Waves />
    </Wrapper>
  );
};

export default Footer;


const Wrapper = styled.footer`
  background-color: var(--backgroundGrey);
  padding: 90px 0 80px;
  position: relative;
  overflow: hidden;
    max-width: 1920px;
    margin: 0 auto;
`

const Container = styled.div`
  position: relative;
  z-index: 10;
  h2{
    text-align: center;
  }

  @media (max-width: 1024px){
    h2{
      font-size: clamp(24px, 5.2vw , 48px);
    }
  }
`

const Flex = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 240px;
  a{
    padding: 13px 32px;
    border-radius: 8px;
    margin: 0 8px;
    transition: .2s linear;

    &.c0{
      background-color: var(--active);
      border: 1px solid var(--active);
      p{
        color: var(--mainLightText);
        text-align: center;
        transition: .2s linear;
      }

      &:hover{
        border: 1px solid var(--active);
        background-color: transparent;

        p{
          color: var(--active);

        }
      }
    }

    &.c1{
      border: 1px solid var(--divider);
      p{
        color: var(--mainDarkText);
        text-align: center;
        transition: .2s linear;
      }

      &:hover{
        background-color: var(--active);
        border: 1px solid var(--active);

        p{
          color: var(--mainLightText);
        }
      }
    }
  }

  @media (max-width: 1024px){
    a{
      padding: clamp(7px, 1.8vw, 14px) clamp(16px, 4.1vw, 32px);
    }
  }

  @media (max-width: 480px){
    margin-bottom: 160px;
    display: grid;
    grid-template-columns: 100%;
    grid-row-gap: 16px;

    a{
      display: block;
      padding: 13px 32px;
    }
  }
`

const Nav = styled.nav`
  ul{
    display: flex;
    justify-content: space-between;
    align-items: center;

    li{
      a{
        p{
          color: var(--navText);
          line-height: 180%;
          transition: all 0.1s linear; 
          &:hover {
            color: var(--navHover);
          }
          strong{
            font-weight: 400;
          }
        }
      }
    }
  }

  
  @media (max-width: 1024px) {
    ul{
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-row-gap: 8px;
    }
  }

  @media (max-width: 480px){
    ul{
      grid-template-columns: 1fr;
    }
  }
`

const SocialMedia = styled.ul`
  width: fit-content;
  margin: 32px auto 0;

  img{
    width: 24px;
    height: 24px;
  }
  
  li{
    display: inline;
    margin: 0 24px;
    opacity: 0.56;
    transition: .1s linear;

    &:hover{
      opacity: 1;
    }
  }

  @media (max-width: 1024px) {
    margin: 0;

    li{
      margin: 0 0 0 32px;
    }
  }

  @media (max-width: 480px){
    margin-bottom: 16px;
    
    li{
      margin: 0 32px 0 0;
    }
  }
`

const Copyright = styled.p`
  margin-top: 32px;
  text-align: center;
  color: var(--navText);
  
  @media (max-width: 1024px) {
    margin: 0;
  }

  @media (max-width: 480px){
    text-align: left;
  }
`

const CopyAndSocialWrapper = styled.div`
  display: grid;

  @media (max-width: 1024px) {
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    margin-top: 75px;
  }

  @media (max-width: 480px){
    margin-top: 56px;
    flex-direction: column;
  }
`

// {
//   data.allDatoCmsFooter.nodes
//     .filter(el => el.locale === currentLanguage)
//     .map(el =>
//       el.navigation.map(el => (
//         <Fragment key={el.id}>

//         </Fragment>
//       ))
//     )
// }