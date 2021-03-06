import React from "react"
import { StructuredText } from "react-datocms"
import styled from "styled-components"
import { FaqArrow } from './../vectors/arrows'

const Faq = ({ data }) => {
    return (
        <Wrapper>
            <Container>
                <StructuredText data={data.title} />
                <Questions>
                    {data.questions.map((el, index) => (
                        <>
                            {index
                                ? <details>
                                    <summary itemProp="mainEntity" itemType="https://schema.org/Question">
                                        <span itemProp="name">
                                            <StructuredText data={el.question} /><FaqArrow />
                                        </span>
                                    </summary>
                                    <p itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                                        <span itemProp="text">
                                            <StructuredText data={el.answer} />
                                        </span>
                                    </p>
                                </details>
                                : <details open>
                                    <summary itemProp="mainEntity" itemType="https://schema.org/Question">
                                        <span itemProp="name">
                                            <StructuredText data={el.question} /><FaqArrow />
                                        </span>
                                    </summary>
                                    <p itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                                        <span itemProp="text">
                                            <StructuredText data={el.answer} />
                                        </span>
                                    </p>
                                </details>
                            }

                        </>
                    ))}
                </Questions>
            </Container>
        </Wrapper>
    )
}

export default Faq

const Wrapper = styled.section`
    padding: 100px 0 130px;

    @media (max-width: 1024px) {
        padding-bottom: clamp(65px, 13.9vw, 130px);
    }
`

const Container = styled.div`
  max-width: 1030px;
  padding: 0 45px;
  margin: 0 auto;

  h2 {
    font-weight: bold;
    font-size: 48px;
    line-height: 130%;
    text-align: center;
    letter-spacing: -1px;
  }

  @media (max-width: 1024px) {
    padding: 0 37px;
    h2 {
      font-size: clamp(24px, 5.2vw, 40px);
      text-align: left;
    }
  }
  @media (max-width: 640px) {
    padding: 0 18px;
    h2 {
      text-align: center;
    }
  }
`;

const Questions = styled.div`
  margin-top: 48px;
  @media (max-width: 1024px) {
    margin-top: 64px;
  }
  @media (max-width: 767px) {
    margin-top: 56px;
  }
  details {
    list-style: none;
    list-style-type: none;
    margin-top: 32px;
    padding-bottom: 16px;
    position: relative;

    &::after {
      content: '';
      bottom: 0;
      left: 0;
      right: 0;
      height: 1px;
      position: absolute;
      background-color: var(--divider);
    }
  }
  @media (max-width: 767px) {
    margin-top: 58px;
  }

  details svg {
    transform: rotateX(0deg);
  }

  details[open] svg {
    transform: rotateX(180deg);
  }

  summary {
    list-style: none;
    list-style-type: none;
    cursor: pointer;

    &::-webkit-details-marker {
      display: none;
    }

    &::marker {
      display: none;
    }

    svg {
      height: 18px;
      width: 14px;
      position: absolute;
      right: 0;
      transition: transform 0.2s linear;
      margin: 2px 8px 0 0;
    }

    span {
      font-weight: bold;
      font-size: 18px;
      line-height: 130%;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 16px;

      p {
        color: var(--mainDarkText);
        padding-right: 30px;
      }
    }
  }

  p {
    span {
      font-size: 14px;
      line-height: 180%;

      p {
        margin-bottom: 16px;
        color: var(--subDarkText);
      }
    }
  }
`;