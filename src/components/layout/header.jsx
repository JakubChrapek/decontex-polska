import React, { useState } from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import styled from 'styled-components';
import { useLocation } from '@reach/router';
import useLanguages from '../../hooks/useLanguages';
import Navigator from '../langHelpers/navigator';
import { StructuredText } from 'react-datocms';
import { GatsbyImage } from 'gatsby-plugin-image';

// Scoped styles

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 88px;
  position: absolute;
  z-index: 110;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1220px;
  padding: 0 35px;
  width: 100%;

  @media (max-width: 1024px) {
    display: none;
  }

  @media (max-width: 480px) {
    padding: 0 16px;
    
  }
`;

const Nav = styled.nav`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const LogoImage = styled(GatsbyImage)`
  width: ${158 / 16}rem;
  max-width: ${158 / 16}rem;

  &.light{
    filter: brightness(0) invert(1);
  }
  && [data-placeholder-image] {
    position: absolute;
  }
`;

const NavList = styled.ul`
  display: grid;
  grid-auto-flow: column;
  column-gap: clamp(4px, 1vw, 16px);
  .other {
    a p {
      color: var(--subDarkText);
      &:hover {
        color: var(--mainDarkText);
        background-color: var(--mainLightText);
      }
    }
    .activeClassLink p {
      color: var(--mainDarkText);
      background-color: var(--mainLightText);
    }
  }
  .other-grey{
    a p {
      color: var(--subDarkText);
      &:hover {
        color: var(--mainDarkText);
        background-color: var(--backgroundGrey);
      }
    }
    .activeClassLink p {
      color: var(--mainDarkText);
      background-color: var(--backgroundGrey);
    }
  }
  & li a{
    display: block;
    border-radius: 50px;
  }
  & li a p {
    color: var(--navText);
    transition: color 0.1s linear, background-color 0.1s linear;
    padding: 8px clamp(4px, 1vw, 16px);
    border-radius: 50px;

    &:hover {
      color: var(--navHover);
      background-color: var(--backgroundMedium);
    }
    & li .activeClassLink p {
      color: var(--navHover);
      background-color: var(--backgroundMedium);
    }
  }

  &.right{
    li a {
      border-radius: 6px;
    }
    li a p {
      padding: 10px 24px;
      background: #51B8EB;
      border-radius: 6px;
      display: block;
      line-height: 1;
      color: var(--navHover);
      border: 1px solid var(--active);

      &:hover {
        border: 1px solid var(--backgroundLight);
        background-color: var(--backgroundLight);
      }
    }
  }
`;

const HeaderRight = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  column-gap: var(--gapRegular);
  @media screen and (max-width: 768px) {
    grid-template-columns: auto auto auto;
  }
`;

const MobileContainer = styled.div`
  @media (min-width: 1025px) {
    display: none;
  }
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 35px;
    width: 100%;

    .gatsby-image-wrapper{
      div{
        display: none !important;
      }
    }

    img{
      position: relative;
      z-index: 2;
    }
  
  @media (max-width: 480px) {
    padding: 0 16px;
    
  }
`

const MobileButton = styled.button`
  width: 20px;
  height: 20px;
  z-index: 2;
  position: relative;
  overflow: hidden;

  span{
    position: absolute;
    left: 0;
    width: 20px;
    height: 2px;
    background-color: ${props => props.isWhite ? props.isMenuOpened ? '#000' : '#FFF' : '#000'};
    border-radius: 2px;
    transition: background-color .2s linear, opacity .2s linear, transform .2s linear;
    transform: ${props => props.isMenuOpened ? 'translateX(100%)' : null};
    opacity: ${props => props.isMenuOpened ? '0' : '1'};
    
  }

  &::after{
    content: "";
    position: absolute;
    left: 0;
    width: 20px;
    height: 2px;
    background-color: ${props => props.isWhite ? props.isMenuOpened ? '#000' : '#FFF' : '#000'};
    transform: ${props => props.isMenuOpened ? 'rotateZ(-45deg)' : 'translateY(6px)'};;
    border-radius: 2px;
    transition: background-color .2s linear, transform .2s linear;

  }

  &::before{
    content: "";
    position: absolute;
    left: 0;
    width: 20px;
    height: 2px;
    background-color: ${props => props.isWhite ? props.isMenuOpened ? '#000' : '#FFF' : '#000'};
    transform: ${props => props.isMenuOpened ? 'rotateZ(45deg)' : 'translateY(-6px)'};;
    border-radius: 2px;
    transition: background-color .2s linear, transform .2s linear;
  }
`

const MobileNav = styled.div`
  position: fixed;
  background-color: #fff;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  padding: 0 35px;
  transition: opacity .2s linear, transform .2s linear;
  opacity: ${props => props.isMenuOpened ? '1' : '.4'};
  transform: ${props => props.isMenuOpened ? 'unset' : 'translateX(100%)'};

  div{
    padding-top: 102px;
  }
  ul{
    list-style: none;
    display: grid;
    grid-row-gap: 24px;
    margin-top: 100px;

    p{
      font-weight: 500;
      font-size: 16px;
      line-height: 21px;
    }

    .right{
      padding: 9.5px 24px;
      background: #51B8EB;
      border-radius: 6px;
      display: block;
      max-width: 332px;

      p{
        color: var(--mainLightText);
        text-align: center;
      }
    }
  }
  
  @media (max-width: 480px) {
    padding: 0 16px;
    
  }
`

const Logo = styled.img`
  max-width: 158px;
`

// Main Component

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      allDatoCmsWebsiteSetting {
        edges {
          node {
            locale
            logo {
              alt
              title
              url
              gatsbyImageData(width: 280)
            }
            logoWhite {
              url
              title
              alt
              gatsbyImageData(width: 280)
            }
          }
        }
      }
      allDatoCmsMenu {
        edges {
          node {
            locale
            links {
              id: originalId
              slug
              name {
                value
              }
              ariaLabel
              locale
              originalId
            }
            linksRight {
              id: originalId
              slug
              originalId
              name {
                value
              }
              locale
            }
          }
        }
      }
    }
  `)

  // const { currentLanguage } = useContext(LangContext)
  const currentLanguage = 'pl'
  const { defaultLanguage } = useLanguages()
  const { pathname } = useLocation()

  const { allDatoCmsWebsiteSetting: { edges: settingsEdges }, allDatoCmsMenu: { edges: menuEdges } } = data

  const [isMenuOpened, changeIsMenuOpened] = useState(false)

  let a = data
  // debugger
  return (
    <HeaderWrapper>
      <HeaderContainer>
        {settingsEdges
          .filter(({ node: { locale } }) => locale === currentLanguage)
          .map(
            ({
              node: {
                logo, logoWhite
              },
            }) => {
              let logoVariant = logo;
              // TODO: get all locale root pathnames from DatoCMS and check if it is homepage

              return (
                <Navigator
                  home
                  ariaLabel={logoVariant.title}
                  key={logoVariant.title}
                >
                  <LogoImage image={logoVariant.gatsbyImageData}
                    alt={logoVariant.alt}
                    title={logoVariant.title}
                    className={pathname === '/' ? 'light' : ''}
                  />
                </Navigator>
              );
            }
          )}
        <Nav>
          <NavList>
            {menuEdges
              .filter(({ node: { locale } }) => locale === currentLanguage)
              .map(({ node: { links } }) =>
                links.map(({ id, slug, locale, ariaLabel, name }) =>
                  <li key={id} className={(pathname === '/' || pathname === '/en') ? '' : (pathname === '/blog/' || pathname === '/partnerzy/') ? 'other-grey' : 'other'}>
                    <Link
                      activeClassName="activeClassLink"
                      to={
                        locale === defaultLanguage
                          ? `/${slug}/`
                          : `/${locale}/${slug}/`
                      }
                      aria-label={ariaLabel}
                    >
                      <StructuredText data={name} />
                    </Link>
                  </li>
                )
              )
            }
          </NavList>
        </Nav>
        <HeaderRight>
          {/* <LanguageSwitcher /> */}

          <Nav as='div'>
            <NavList className='right'>
              {menuEdges
                .filter(({ node: { locale } }) => locale === currentLanguage)
                .map(({ node: { linksRight } }) =>
                  linksRight.map(({ id, slug, locale, ariaLabel, name }) => (
                    <li key={id}>
                      <Link
                        activeClassName="activeClassLink"
                        to={
                          locale === defaultLanguage
                            ? `/${slug}/`
                            : `/${locale}/${slug}/`
                        }
                        aria-label={ariaLabel}
                      >
                        <StructuredText data={name} />
                      </Link>
                    </li>
                  ))
                )}
            </NavList>
          </Nav>
        </HeaderRight>
      </HeaderContainer>
      <MobileContainer>
        {settingsEdges
          .filter(({ node: { locale } }) => locale === currentLanguage)
          .map(
            ({
              node: {
                logo, logoWhite
              },
            }) => {
              let logoVariant = logo;
              return (
                <Navigator
                  home
                  ariaLabel={logoVariant.title}
                  key={logoVariant.title}
                >
                  <LogoImage image={logoVariant.gatsbyImageData}
                    alt={logoVariant.alt}
                    title={logoVariant.title}
                    className={pathname === '/' && !isMenuOpened ? 'light' : ''}
                  />
                </Navigator>
              );
            }
          )}
        <MobileButton onClick={() => { changeIsMenuOpened(!isMenuOpened) }} isMenuOpened={isMenuOpened} isWhite={pathname === '/' || pathname === '/en'}><span /></MobileButton>
        <MobileNav isMenuOpened={isMenuOpened}>
          <ul>
            {menuEdges
              .filter(({ node: { locale } }) => locale === currentLanguage)
              .map(({ node: { links } }) =>
                links.map(({ id, slug, locale, ariaLabel, name }) => (
                  <li key={id} className={pathname === '/' || pathname === '/en' ? '' : 'other'}>
                    <Link
                      activeClassName="activeClassLink"
                      to={
                        locale === defaultLanguage
                          ? `/${slug}/`
                          : `/${locale}/${slug}/`
                      }
                      aria-label={ariaLabel}
                    >
                      <StructuredText data={name} />
                    </Link>
                  </li>
                ))
              )}
            {menuEdges
              .filter(({ node: { locale } }) => locale === currentLanguage)
              .map(({ node: { linksRight } }) =>
                linksRight.map(({ id, slug, locale, ariaLabel, name }) => (
                  <li className='right' key={id}>
                    <Link
                      activeClassName="activeClassLink"
                      to={
                        locale === defaultLanguage
                          ? `/${slug}/`
                          : `/${locale}/${slug}/`
                      }
                      aria-label={ariaLabel}
                    >
                      <StructuredText data={name} />
                    </Link>
                  </li>
                ))
              )}
          </ul>
        </MobileNav>
      </MobileContainer>
    </HeaderWrapper>
  );
};

export default Header;
