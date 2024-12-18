// src/GlobalStyles.jsx
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background-color: #1A1A2E;
    color: #EAEAEA;
    font-family: 'Poppins', sans-serif;
    overflow-x: hidden;
  }

  a {
    color: #6C63FF;
    text-decoration: none;
    transition: color 0.3s;

    &:hover {
      color: #FF6584;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
  }
`;

export default GlobalStyles;
