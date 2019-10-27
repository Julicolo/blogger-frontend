import React from 'react';
import ReactDOM from 'react-dom';
import {useRoot} from 'baobab-react/hooks';
import state from './state';
import Main from './main.jsx';
import {BrowserRouter as Router} from 'react-router-dom';

const App = function({store}) {
    const Root = useRoot(store);

    return (
        <Root>
            <Router>
                <Main />
            </Router>
        </Root>
    );
};

ReactDOM.render(<App store={state} />, document.querySelector('.root'));
