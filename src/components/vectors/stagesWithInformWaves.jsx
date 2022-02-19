import React from "react"
import styled from "styled-components"

const Waves = () => {
    return (
        <Wrapper width="1440" height="306" viewBox="0 0 1440 306" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.5" d="M1339.72 0C1504.82 0 1525.19 106.625 1514.73 159.937V288H-433V0H-113.79C92.045 0 339.708 90.7826 669.374 101.312C999.041 111.842 1133.33 0 1339.72 0Z" fill="#335180" />
            <path d="M1339.72 18C1504.82 18 1525.19 124.625 1514.73 177.937V306H-433V18H-113.79C92.045 18 339.708 108.783 669.374 119.312C999.041 129.842 1133.33 18 1339.72 18Z" fill="#335180" />
        </Wrapper>
    )
}

export default Waves

const Wrapper = styled.svg`
    position: absolute;
    width: 100%;
    height: auto;
    left: 0;
    transform: translateY(-45%);
    top: 0;

`