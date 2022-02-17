import React from "react"
import styled from "styled-components"

const Waves = () => {
    return (
        <Wrapper>
            <svg width="1440" height="306" viewBox="0 0 1440 306" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.5" d="M29.2847 0C-135.824 0 -156.187 106.625 -145.73 159.937V288H1802V0H1482.79C1276.95 0 1029.29 90.7826 699.626 101.312C369.959 111.842 235.67 0 29.2847 0Z" fill="#51B8EB" />
                <path d="M29.2847 18C-135.824 18 -156.187 124.625 -145.73 177.937V306H1802V18H1482.79C1276.95 18 1029.29 108.783 699.626 119.312C369.959 129.842 235.67 18 29.2847 18Z" fill="#1B355E" />
            </svg>

        </Wrapper>
    )
}

export default Waves

const Wrapper = styled.div`
    background-color: #1B355E;
    position: absolute;
    bottom: 45%;
    height: 50%;
    left: 50%;
    min-width: 1440px;
    max-width: 1920px;
    width: 100%;
    transform: translateX(-50%) translateY(100%) ;
    z-index: -1;
    
    @media (min-width: 1440px) {
    }

    svg{
        width: 100%;
        transform: scale(1.2)translateY(-50%);
        position: absolute;
        top: 0;

        path{
        }
    }
`