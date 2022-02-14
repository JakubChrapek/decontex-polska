import React, { useContext } from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import styled from 'styled-components';
import { useLocation } from '@reach/router';
import { LangContext } from '../../context/langProvider';
import LanguageSwitcher from '../langHelpers/languageSwitcher';
import useLanguages from '../../hooks/useLanguages';
import Navigator from '../langHelpers/navigator';
import MobileMenu from './mobileMenu';
import { Divider } from './sectionStyles';
import HeaderWaves from '../vectors/bgWaves';

// Scoped styles

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 88px;
  position: fixed;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1220px;
  padding: 0 30px;
  width: 100%;
  align-items: center;
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
  column-gap: 48px;
  & li a {
    color: var(--headingsColor);
    transition: color 0.1s linear;
    font-weight: 600;
    &:hover {
      color: var(--primaryColor);
    }
  }

  &.right{
    li a {
      padding: 0 24px;
      background: #51B8EB;
      border-radius: 6px;
      display: block;
      height: 40px;
      line-height: 40px;
      color: var(--primaryLight);

      &:hover{
        color: var(--headingsColor);
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

const VerticalDivider = styled.span`
  height: 100%;
  width: 1px;
  display: none;
  background: var(--dividerColor);
  @media screen and (max-width: 768px) {
    display: block;
  }
`;

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
              name
              ariaLabel
              locale
              originalId
            }
            linksRight {
              id: originalId
              slug
              originalId
              name
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

  const {allDatoCmsWebsiteSetting: { edges: settingsEdges }, allDatoCmsMenu: { edges: menuEdges }} = data

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
                      {name}
                    </Link>
                  </li>
                ))
              )}
          </NavList>
        </Nav>
        <HeaderRight>
          {/* <LanguageSwitcher /> */}

          <Nav>
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
                        {name}
                      </Link>
                    </li>
                  ))
                )}
            </NavList>
          </Nav>
          <VerticalDivider />
          <MobileMenu />
        </HeaderRight>
        <Divider bottom />
      </HeaderContainer>

    </HeaderWrapper>
  );
};

export default Header;
