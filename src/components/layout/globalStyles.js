import { createGlobalStyle } from 'styled-components';



const GlobalStyles = createGlobalStyle`

    :root {
        
        /* Colors */
        --superDarkText: #0A101A;
        --mainDarkText: rgba(20, 32, 51, 1);
        --subDarkText: rgba(18, 17, 39, 0.72);
        --formDarkText: rgba(18, 17, 39, 0.4);
        --mainLightText: rgba(255, 255, 255, 1);
        --subLightText: rgba(255, 255, 255, 0.72);

        --backgroundDark: #142033;
        --backgroundMedium: #1B355E;
        --backgroundLight: #335180; 
        --backgroundBlue: #D5EBF4;
        --backgroundGrey: #F4F6FB;
        
        --buttonText: rgba(51, 81, 128, 1);
        --navText: rgba(255, 255, 255, 0.72);
        --navHover: rgba(255, 255, 255, 1);

        --blackButtonBackground: #0A101A;

        --active: rgba(81, 184, 235, 1);
        --divider: rgba(18, 17, 39, 0.16);
    }

    h1{
        font-weight: bold;
        font-size: 72px;
        line-height: 75px;
        color: var(--mainLightText);
    }

    h2{
        font-weight: bold;
        font-size: 48px;
        line-height: 130%;
        letter-spacing: -1px;
        color: var(--mainDarkText);
    }

    h3{

    }

    h4{

    }

    h5{

    }

    h6{

    }

    p{
        color: var(--subDarkText);

    }

    *, *::before, *::after {
        box-sizing: border-box;
        font-family: 'DM Sans';
    }

    html {
        font-size: 16px;
        margin: 0;
        padding: 0;
    }

    body {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-weight: 500;
        margin: 0;
        padding: 0;
        min-height: 100vh;
    }

    h1, h2, h3, p {
        margin: 0;
        padding: 0;
    }

    ul, ol {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }

    button {
        cursor: pointer;
        margin: 0;
        padding: 0;
        appearance: none;
        border: none;
        background: none;
    }

    button,
    input,
    select,
    textarea {
        font-family: inherit; /* 1 */
        font-size: 100%; /* 1 */
        line-height: 1.15; /* 1 */
        margin: 0; /* 2 */
    }

    a { 
        text-decoration: none;
        background-color: transparent;
    }

    b, strong {
        font-weight: 700;
    }

    address, time {
        font-style: normal;
    }

    .container{
        max-width: 1220px;
        padding: 0 35px;
        margin: 0 auto;
    }
    `;

export default GlobalStyles;
