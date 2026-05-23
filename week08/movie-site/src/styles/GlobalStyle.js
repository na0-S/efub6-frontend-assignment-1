import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.isDarkMode ? '#141414' : '#ffffff'};
    color: ${props => props.isDarkMode ? '#ffffff' : '#141414'};
    transition: background-color 0.3s ease, color 0.3s ease;
    margin: 0;
    font-family: sans-serif;
  }
`;

export default GlobalStyle;