import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import {root} from 'baobab-react/higher-order';
import tree from './state';
import {GlobalStyle} from './css-utils';
import Header from './components/header';
import Posts from './components/posts';
import Footer from './components/footer';

class App extends React.Component {
    render() {
        return (
            <Container>
                <GlobalStyle />
                <Header />
                <Posts />
                <Footer />
            </Container>
        );
    }
}

const RootedApp = root(tree, App);
const Container = styled.div`
    font-family: sans-serif;
    display: flex;
    flex-flow: column wrap;
    min-height: 100vh;
`;

ReactDOM.render(<RootedApp />, document.querySelector('.root'));
