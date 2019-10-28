import React from 'react';
import ReactDOM from 'react-dom';
import Main from './main.jsx';
import {GlobalStyle} from './utils';

function App() {
    return (
        <React.Fragment>
            <GlobalStyle />
            <Main />
        </React.Fragment>
    );
}

ReactDOM.render(<App />, document.querySelector('.root'));
