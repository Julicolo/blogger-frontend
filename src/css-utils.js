import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body {
    min-height: 100vh;
  }

  body {  
    padding: 0;
    margin: 0;
  }

`;

export const colors = {
  main: '#42C663',
  white: 'white'
};
