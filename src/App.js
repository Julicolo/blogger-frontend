import React from 'react';
import styled from 'styled-components';
import {GlobalStyle} from './utils';
import Header from './components/header';
import Posts from './components/posts';
import Footer from './components/footer';

export default class App extends React.Component {
    constructor() {
        super();

        this.state = {
            isUserLoggedIn: null
        };
    }

    render() {
        const {isUserLoggedIn} = this.state;

        return (
            <Container>
                <GlobalStyle />
                <Header props={isUserLoggedIn} />
                <Posts />
                <Footer />
            </Container>
        );
    }
}

export const Container = styled.div`
    font-family: sans-serif;
    display: flex;
    flex-flow: column wrap;
    min-height: 100vh;
`;
