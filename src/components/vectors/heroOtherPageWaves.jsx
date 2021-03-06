import React from "react"
import styled from "styled-components"

const Waves = () => {
    return (
        <Wrapper className="wrapper">
            <svg className="svg" viewBox="0 0 1440 104" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M-4.00012 104V0L1068.35 96.2C1231.73 110.912 1391.88 76.94 1532 0V104H-4.00012Z" fill="white" />
            </svg>
        </Wrapper>
    )
}

export default Waves

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;

  > svg {
    width: 100%;
    position: absolute;
    bottom: -1px;
    transform: scaleX(-1);
  }

  @media (max-width: 1024px) {
    top: unset;
    bottom: 0;
    height: 30%;
    background-color: #fff;

    svg {
      bottom: unset;
      top: 0;
      transform: translateY(-100%);
    }
  }
`;