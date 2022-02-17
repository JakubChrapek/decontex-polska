import React, { Fragment, useContext } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import { StructuredText } from 'react-datocms';
import { LangContext } from '../../context/langProvider';
import Waves from '../vectors/footerWaves';

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

  const { currentLanguage } = useContext(LangContext);

  return (
    <Wrapper>
      <Container className='container'>
        {data.allDatoCmsFooter.nodes
          .filter(el => el.locale === currentLanguage)
          .map(el =>
            <StructuredText data={el.title} />
          )}
        <Flex>
          {data.allDatoCmsFooter.nodes
            .filter(el => el.locale === currentLanguage)
            .map(el =>
              el.buttons.map((innerEl, index) => (
                <a className={`c` + index} aria-label={innerEl.ariaLabel} href={innerEl.slug} key={el.id}>
                  <StructuredText data={innerEl.name} />
                </a>
              ))
            )}
        </Flex>
        <Nav>
          <ul>
            {data.allDatoCmsFooter.nodes
              .filter(el => el.locale === currentLanguage)
              .map(el =>
                el.navigation.map((innerEl, index) => (
                  <li>
                    <a className={`c` + index} aria-label={innerEl.ariaLabel} href={innerEl.slug} key={el.id}>
                      <StructuredText data={innerEl.name} />
                    </a>
                  </li>
                ))
              )}
          </ul>
        </Nav>
        <SocialMedia>
          {data.allDatoCmsFooter.nodes
            .filter(el => el.locale === currentLanguage)
            .map(el =>
              el.socialMedia.map((innerEl, index) => (
                <li>
                  <a className={`c` + index} aria-label={innerEl.ariaLabel} href={innerEl.slug} key={el.id}>
                    <img src={innerEl.icon.url} />
                  </a>
                </li>
              ))
            )}
        </SocialMedia>
        <Copyright>
          {data.allDatoCmsFooter.nodes
            .filter(el => el.locale === currentLanguage)
            .map(el =>
              <>{el.copyright}</>
            )}
        </Copyright>
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
`

const Flex = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 240px;
  a{
    padding: 14px 32px;
    border-radius: 8px;
    margin-right: 16px;

    &.c0{
      background-color: var(--active);
      p{
        color: var(--mainLightText);
      }
    }

    &.c1{
      border: 1px solid var(--divider);
      p{
        color: var(--mainDarkText);
      }
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
          transition: all 0.1s linear; 
          &:hover {
            color: var(--navHover);
          }
        }
      }
    }
  }
`

const SocialMedia = styled.ul`
  width: fit-content;
  margin: 32px auto 0;
  li{
    display: inline;
    margin: 0 24px;
    opacity: 0.56;
    transition: .1s linear;

    &:hover{
      opacity: 1;
    }
  }
`

const Copyright = styled.p`
  margin-top: 32px;
  text-align: center;
  color: var(--navText);
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