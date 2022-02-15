import { createGlobalStyle } from 'styled-components';
import colors from '../../static/colors.json';

const {
  primaryColor,
  primaryDark,
  primaryLight,
  headingsColor,
  baseTextColor,
  baseTextColorDark,
  disabledColor,
  dividerColor,
  markColor,
} = colors;

const GlobalStyles = createGlobalStyle`

    :root {
        
        /* Colors */
        --primaryColor: ${primaryColor};
        --primaryDark: ${primaryDark};
        --primaryLight: ${primaryLight};
        --headingsColor: ${headingsColor};
        --baseTextColor: ${baseTextColor};
        --baseTextColorDark: ${baseTextColorDark};
        --disabledColor: ${disabledColor};
        --dividerColor: ${dividerColor};
        --markColor: ${markColor};
        

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
        max-width: 1200px;
        padding: 0 20px;
        margin: 0 auto;
    }
    `;

export default GlobalStyles;
