import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import { StructuredText } from 'react-datocms';
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
                  to={`/${innerEl.slug}/`}
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
                      activeClassName="activeClassLink"
                      className={`c` + index}
                      aria-label={innerEl.ariaLabel}
                      to={`/${innerEl.slug}/`}
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
                      href={innerEl.link}
                    >
                      <img src={innerEl.icon.url} alt={innerEl.icon.alt} />
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
  h2 {
    text-align: center;
    max-width: 634px;
    margin: 0 auto;
    line-height: 1.3;
  }

  @media (max-width: 1024px) {
    h2 {
      font-size: clamp(24px, 5.2vw, 40px);
      max-width: clamp(400px, 72vw, 560px);
      line-height: 1.1;
    }
  }
  @media (max-width: 767px) {
    h2 {
      font-size: clamp(24px, 5.2vw, 40px);
      max-width: clamp(400px, 72vw, 560px);
    }
  }
`;

const Flex = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 240px;
  a{
    padding: 13px 32px;
    border-radius: 8px;
    margin: 0 8px;
    transition: background-color .2s linear, border .2s linear;

    &.c0{
      background-color: var(--active);
      border: 1px solid var(--active);
      p{
        color: var(--mainLightText);
        text-align: center;
      }

      &:hover{
        border: 1px solid var(--backgroundLight);
        background-color: var(--backgroundLight);

      }
    }

    &.c1{
      border: 1px solid var(--divider);
      p{
        color: var(--mainDarkText);
        text-align: center;
      }

      &:hover{
        background-color: var(--whiteButtonBackground);

      }
    }
  }

  @media (max-width: 1024px){
    a{
      padding: clamp(7px, 1.8vw, 14px) clamp(16px, 4.1vw, 32px);
    }
  }

  @media (max-width: 540px){
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

    li a {
      border-radius: 50px;
      display: block;
      width: fit-content;
    }

    li a p{
            color: var(--subLightText);
            line-height: 180%;
            transition: all 0.1s linear; 
            padding: 8px clamp(4px, 1vw, 16px);
            border-radius: 50px;
            width: fit-content;

            &:hover {
              color: var(--mainLightText);
              background-color: var(--backgroundMedium);
            }
            strong{
              font-weight: 400;
            }
    }
    li .activeClassLink p {
      color: var(--navHover);
      background-color: var(--backgroundMedium);
    }
}

  
  @media (max-width: 1024px) {
    ul{
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-row-gap: 8px;

      li a p {
          padding: 8px 16px;
      }
    }
  }

  @media (max-width: 540px){
    ul{
      grid-template-columns: 1fr;
      li a {
        width: fit-content;
      }
      li a p {
        padding: 0;

        &:hover{
          color: var(--mainLightText);
          background-color: unset;
        }
    
      }
      li .activeClassLink p {
          color: var(--mainLightText);
          background-color: unset;
    }
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
    display: inline-block;
    margin: 0 24px;
    opacity: 0.56;
    transition: opacity .1s linear;

    &:hover{
      opacity: 1;
    }
  }

  li a{
    display: flex;
    border-radius: 50px;
  }

  @media (max-width: 1024px) {
    margin: 0;

    li{
      margin: 0 0 0 32px;
    }
  }

  @media (max-width: 540px){
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

  @media (max-width: 540px){
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

  @media (max-width: 540px){
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