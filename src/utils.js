import {createGlobalStyle} from 'styled-components';

export const capitalizeFirstLetter = string => {
    return string.replace(/\w/, character => character.toUpperCase());
};

export const colors = {
    main: '#3192e6',
    light: '#ddf1ff',
    deactive: '#999'
};

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
      overflow: overlay;
      
      &.no-scroll {
        overflow: hidden;
      }
    }
`;
