import React from 'react'
import { StructuredText } from 'react-datocms'
import styled from 'styled-components'
import { GatsbyImage } from 'gatsby-plugin-image';
import { DOTS_IMAGES } from '../img/dots';

const LinksToPrice = ({ data }) => {
  return (
    <Wrapper>
      <Container className="container">
        <Flex
          isImgRight={data.imageWithButton[0].isImgRight}
          isImgBackground={data.imageWithButton[0].isImgBackground}
          backgroundColor={data.imageWithButton[0].backgroundColor.hex}
        >
          <div className="imageWrapper">
            <img
              className="dots"
              src={
                data.imageWithButton[0].isImgRight
                  ? DOTS_IMAGES.RIGHT_BOTTOM
                  : DOTS_IMAGES.LEFT_BOTTOM_BIGGER
              }
              alt=""
            />
            <GatsbyImage
              className="mainImage"
              image={data.imageWithButton[0].img.gatsbyImageData}
              alt={data.imageWithButton[0].img.alt}
              title={data.imageWithButton[0].img.title}
            />
          </div>
          <div className="textPart">
            <StructuredText data={data.imageWithButton[0].title} />
            <p>{data.imageWithButton[0].text}</p>
            {data.imageWithButton[0].button.map((el) => (
              <a href='#price' aria-label={el.ariaLabel}>
                <StructuredText data={el.name} />
              </a>
            ))}
          </div>
        </Flex>
        <Grid>
          {data.grid.map((el) => (
            <li>
              <GatsbyImage image={el.img.gatsbyImageData} alt={el.img.alt} />
              <p>{el.text}</p>
            </li>
          ))}
        </Grid>
      </Container>
    </Wrapper>
  );
}

export default LinksToPrice

const Wrapper = styled.section`
  padding-top: clamp(110px, 11.11vw, 160px);
  max-width: 1920px;
  margin: 0 auto;
`;

const Container = styled.div`

    

`

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: ${(props) => (props.isImgRight ? 'row-reverse' : 'row')};

  .imageWrapper {
    position: relative;
    height: fit-content;
    width: fit-content;
    margin: ${(props) => (props.isImgRight ? '0 0 0 auto' : '0 auto 0 0')};
    padding-left: ${(props) =>
      props.isImgRight ? '0' : 'clamp(24px, 3.88vw, 56px)'};
    padding-right: ${(props) =>
      props.isImgRight ? 'clamp(24px, 3.88vw, 56px)' : '24px'};

    .dots {
      display: ${(props) => (props.isImgBackground ? null : 'none')};
      position: absolute;
      width: clamp(142px, 40%, 172px);
      bottom: -20%;
      left: ${(props) => (props.isImgRight ? 'unset' : '0')};
      right: ${(props) => (props.isImgRight ? '0' : 'unset')};
      z-index: 10;
    }

    .mainImage {
      border-radius: 16px;
      position: relative;
      overflow: visible;
      max-width: 400px;
      img {
        border-radius: 16px;
      }
      &:before {
        content: '';
        position: absolute;
        left: ${(props) => (props.isImgRight ? '28px' : '-28px')};
        bottom: ${(props) => (props.isImgRight ? '-28px' : '-28px')};
        width: 100%;
        height: 100%;
        background-color: ${(props) => props.backgroundColor};
        z-index: -1;
        border-radius: 16px;
      }
    }
  }

  .textPart {
    max-width: 552px;
    width: 100%;
    h2 {
      padding-bottom: 20px;
      font-weight: bold;
      font-size: 40px;
      line-height: 1.3;

      mark {
        background: inherit;
        color: red;
      }
    }

    p {
      font-size: 18px;
      line-height: 180%;
    }

    a {
      display: block;
      margin-top: 20px;
      width: fit-content;
      border-radius: 8px;

      p {
        width: fit-content;
        padding: 0 24px;
        background: #51b8eb;
        border-radius: 8px;
        display: block;
        height: 49px;
        line-height: 49px;
        color: var(--mainDarkText);
        border: 1px solid var(--active);
        position: relative;
        transition: color 0.2s linear, background-color 0.2s linear,
          border 0.2s linear;
        text-align: center;
      }

      &:hover {
        p {
          border: 1px solid var(--backgroundLight);
          background-color: var(--backgroundLight);
          color: var(--mainLightText);
        }
      }
    }
  }

  @media (max-width: 1024px) {
    flex-direction: column-reverse;
    max-width: 767px;
    justify-content: flex-end;
    margin: 0 auto;

    .imageWrapper {
      width: 100%;
      margin: ${(props) =>
        props.isImgRight ? '72px auto 0 0' : '72px 0 0 auto'};
      padding-left: 0;
      padding-right: 0;

      .dots {
        width: clamp(130px, 30%, 261px);
        bottom: -18.5%;
        left: ${(props) => (props.isImgRight ? 'unset' : '2.5%')};
        right: ${(props) => (props.isImgRight ? '2.5%' : 'unset')};
      }

      .mainImage {
        max-width: 605px;
        width: 87%;
        margin: ${({ isImgRight }) =>
          isImgRight ? '0 auto 0 0' : '0 0 0 auto'};
        display: block;
      }
    }

    .textPart {
      max-width: 700px;
      margin: 0 auto;
      padding-left: 0;

      h2 {
        font-size: 32px;
      }
    }
  }

  @media (max-width: 767px) {
    .imageWrapper {
      .dots {
        bottom: -44px;
        left: ${({ isImgRight }) => (isImgRight ? 'unset' : '-2.5%')};
        right: ${({ isImgRight }) => (isImgRight ? '-2.5%' : 'unset')};
      }
      .mainImage {
        width: 90%;
        &:before {
          content: '';
          position: absolute;
          left: ${(props) => (props.isImgRight ? '22px' : '-22px')};
          bottom: ${(props) => (props.isImgRight ? '-22px' : '-22px')};
        }
      }
    }
  }
`;

const Grid = styled.ul`
  margin-top: 160px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 36px;
  grid-row-gap: 36px;

  li {
    box-shadow: 0px 20px 50px rgba(18, 17, 39, 0.08);
    border-radius: 15px;
    max-width: 360px;

    .gatsby-image-wrapper {
      border-radius: 16px 16px 0 0;
      max-width: 100%;
      width: 100%;
      img {
        border-radius: 16px 16px 0 0;
      }
    }
    img {
      width: 100%;
      max-width: 360px;
    }

    p {
      text-align: center;
      padding: 24px 0 30px;
      @media (max-width: 1024px) {
        padding: 24px 0;
      }
      @media (max-width: 640px) {
        padding: 20px 0 18px;
      }
      font-weight: bold;
      font-size: 24px;
      line-height: 1.3;
      text-align: center;
      color: var(--superDarkText);
    }
  }

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    justify-items: center;
    margin-top: clamp(150px, 10.4vw, 180px);
  }

  @media (max-width: 540px) {
    grid-template-columns: 1fr;
    margin-top: clamp(110px, 10.4vw, 160px);
  }
`;