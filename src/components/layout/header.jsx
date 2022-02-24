import React, { useContext, useState } from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import styled from 'styled-components';
import { useLocation } from '@reach/router';
import { LangContext } from '../../context/langProvider';
import LanguageSwitcher from '../langHelpers/languageSwitcher';
import useLanguages from '../../hooks/useLanguages';
import Navigator from '../langHelpers/navigator';
import { StructuredText } from 'react-datocms';

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

const NavList = styled.ul`
  display: grid;
  grid-auto-flow: column;
  column-gap: clamp(24px, 3.3vw, 48px);
  .other{
    a p {
      color: var(--subDarkText);
      &:hover{
        color: var(--mainDarkText);
      }
    }
  }
  & li a p {
    color: var(--navText);
    transition: all 0.1s linear; 

    
    &:hover {
      color: var(--navHover);
    }
  }

  &.right{
    li a p {
      padding: 0 24px;
      background: #51B8EB;
      border-radius: 6px;
      display: block;
      height: 40px;
      line-height: 40px;
      color: var(--navHover);

      &:hover{
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
    transition: .2s linear;
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
    transition: .2s linear;

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
    transition: .2s linear;
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
  transition: all .2s linear;
  transform: ${props => props.isMenuOpened ? 'unset' : 'translateY(-100%)'};

  div{
    padding-top: 102px;
  }
  ul{
    list-style: none;
    display: grid;
    grid-row-gap: 24px;

    p{
      font-weight: 500;
      font-size: 16px;
      line-height: 21px;
    }

    .right{
      padding: 0 24px;
      background: #51B8EB;
      border-radius: 6px;
      display: block;
      height: 40px;
      max-width: 332px;

      p{
        color: var(--mainLightText);
        line-height: 40px;
        text-align: center;
      }
    }
  }
  
  @media (max-width: 480px) {
    padding: 0 16px;
    
  }
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
            }
            logoWhite {
              url
              title
              alt
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

  const { currentLanguage } = useContext(LangContext)
  const { defaultLanguage } = useLanguages()
  const { pathname } = useLocation()

  const { allDatoCmsWebsiteSetting: { edges: settingsEdges }, allDatoCmsMenu: { edges: menuEdges } } = data

  const [isMenuOpened, changeIsMenuOpened] = useState(false)

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
              if (pathname === '/' || pathname === '/en') {
                logoVariant = logoWhite;
              }
              return (
                <Navigator home ariaLabel={logoVariant.title} key={logoVariant.title}>
                  <img src={logoVariant.url} alt={logoVariant.alt} />
                </Navigator>
              )
            }
          )}
        <Nav>
          <NavList>
            {menuEdges
              .filter(({ node: { locale } }) => locale === currentLanguage)
              .map(({ node: { links } }) =>
                links.map(({ id, slug, locale, ariaLabel, name }) => (
                  <li key={id} className={pathname === '/' || pathname === '/en' ? '' : 'other'}>
                    <Link
                      activeClassName="activeClassLink"
                      to={
                        locale === defaultLanguage
                          ? `/${slug}`
                          : `/${locale}/${slug}`
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
                            ? `/${slug}`
                            : `/${locale}/${slug}`
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
              let logoVariant = logo
              // TODO: get all locale root pathnames from DatoCMS and check if it is homepage
              if (pathname === '/' || pathname === '/en') {
                logoVariant = logoWhite
              }
              if (isMenuOpened) {
                logoVariant = logo
              }
              return (
                <Navigator home ariaLabel={logoVariant.title} key={logoVariant.title}>
                  <img src={logoVariant.url} alt={logoVariant.alt} />
                </Navigator>
              )
            }
          )}
        <MobileButton onClick={() => { changeIsMenuOpened(!isMenuOpened) }} isMenuOpened={isMenuOpened} isWhite={pathname === '/' || pathname === '/en'}><span /></MobileButton>
        <MobileNav isMenuOpened={isMenuOpened}>
          <div></div>
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
                          ? `/${slug}`
                          : `/${locale}/${slug}`
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
                          ? `/${slug}`
                          : `/${locale}/${slug}`
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
