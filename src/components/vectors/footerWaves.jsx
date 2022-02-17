import React from "react"
import styled from "styled-components"

const Waves = () => {
    return (
        <Wrapper>
            <svg viewBox="0 0 1440 431" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.5" d="M-77.7153 0C-242.824 0 -263.187 106.625 -252.73 159.937V288H1695V0H1375.79C1169.95 0 922.292 90.7826 592.626 101.312C262.959 111.842 128.67 0 -77.7153 0Z" fill="#8DD2EB" />
                <path opacity="0.5" d="M1505.72 0C1670.82 0 1691.19 106.625 1680.73 159.937V288H-267V0H52.2098C258.045 0 505.708 90.7826 835.374 101.312C1165.04 111.842 1299.33 0 1505.72 0Z" fill="#8DD2EB" />
                <path d="M1449 80L1449 220.471V453H-2V92.4854C30 82.6011 86.5 82.6011 86.5 82.6011C352.5 76.3584 374.45 107.544 703 138.785C1080.5 174.681 1242.54 80 1449 80Z" fill="#142033" />
            </svg>
        </Wrapper>
    )
}

export default Waves

const Wrapper = styled.div`
    position: absolute;
    bottom: 0;
    left: 50%;
    min-width: 1440px;
    max-width: 1920px;
    width: 100%;
    transform: translateX(-50%);
    
    @media (min-width: 1440px) {
        transform: translateX(-50%) translateY(2vw);
    }

    svg{
        position: absolute;
        bottom: 0;
        width: 100%;

        path{
            width: 100%;
        }
    }
`