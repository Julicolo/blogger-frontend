import {createGlobalStyle} from 'styled-components';

export const capitalizeFirstLetter = string => {
    return string.replace(/\w/, character => character.toUpperCase());
};

const submitRatingHandlers = {};

export function submitRatingHandler(params) {
    const url = 'http://localhost/mysql/les4/blog-backend/change-rating/',
        key = JSON.stringify(params);

    if (!submitRatingHandlers[key]) {
        submitRatingHandlers[key] = () =>
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(params)
            })
                .then(res => res.json())
                .then(result => {
                    console.log(result);
                });
    }

    return submitRatingHandlers[key];
}

export const colors = {
    main: '#3192e6',
    light: '#ddf1ff',
    inactive: '#999'
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
