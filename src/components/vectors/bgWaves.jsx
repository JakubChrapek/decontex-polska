import React from 'react';
import styled from 'styled-components';

const BlueWaves = styled.svg`
  width: 100%;
  position: relative;
  left: 0;
  margin-top: -2rem;
`;
const HeaderWaves = () => (
  <BlueWaves
    width="100%"
    height="auto"
    viewBox="0 0 1440 306"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      opacity="0.5"
      d="M29.2847 0C-135.824 0 -156.187 106.625 -145.73 159.937V288H1802V0H1482.79C1276.95 0 1029.29 90.7826 699.626 101.312C369.959 111.842 235.67 0 29.2847 0Z"
      fill="#51B8EB"
    />
    <path
      d="M29.2847 18C-135.824 18 -156.187 124.625 -145.73 177.937V306H1802V18H1482.79C1276.95 18 1029.29 108.783 699.626 119.312C369.959 129.842 235.67 18 29.2847 18Z"
      fill="#1B355E"
    />
  </BlueWaves>
);

export default HeaderWaves