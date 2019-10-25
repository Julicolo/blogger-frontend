import React from 'react';
import ReactDOM from 'react-dom';
import {useRoot} from 'baobab-react/hooks';
import state from './state';
import Main from './main';

const App = function({store}) {
    const Root = useRoot(store);

    return (
        <Root>
            <Main />
        </Root>
    );
};

ReactDOM.render(<App store={state} />, document.querySelector('.root'));
