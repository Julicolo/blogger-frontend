import React from 'react';
import styled from 'styled-components';
import {branch} from 'baobab-react/higher-order';
import {GlobalStyle} from './css-utils';
import Header from './components/header';
import Posts from './components/posts';
import Footer from './components/footer';
import Login from './components/login';

class Main extends React.Component {
    render() {
        const {username, isLoginButtonClicked} = this.props;
        console.log(this.props);
        return (
            <Container>
                <GlobalStyle />
                <Header username={username} />
                <Content>{isLoginButtonClicked ? <Login /> : <Posts />}</Content>
                <Footer />
            </Container>
        );
    }
}

export default branch(
    {
        username: 'username',
        isLoginButtonClicked: 'isLoginButtonClicked'
    },
    Main
);

const Container = styled.div`
    font-family: sans-serif;
    display: flex;
    flex-flow: column wrap;
    min-height: 100vh;
`;

const Content = styled.main`
    display: flex;
    flex-flow: column wrap;
    // justify-content: space-between;
    flex: 1;
    margin: 1rem;
`;
