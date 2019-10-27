import React from 'react';
import styled from 'styled-components';
import {branch} from 'baobab-react/higher-order';
import {Switch, Route} from 'react-router-dom';
import {GlobalStyle} from './utils';
import Header from './components/header.jsx';
import Posts from './components/posts.jsx';
import Footer from './components/footer.jsx';
import Login from './components/login.jsx';
import CreatePost from './components/create-post.jsx';
import Error404 from './components/error404.jsx';
import Post from './components/post.jsx';

class Main extends React.Component {
    render() {
        const {username, isAdmin, blogOpen, dispatch} = this.props;

        blogOpen ? document.body.classList.add('no-scroll') : document.body.classList.remove('no-scroll');

        return (
            <Container>
                <GlobalStyle />
                <Header username={username} />
                {blogOpen && <Post data={{post: blogOpen, admin: isAdmin, dispatch: dispatch}} />}
                <Content>
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/create-post" component={isAdmin ? CreatePost : Login} />
                        <Route exact path="/" component={Posts} props={(username, isAdmin)} />
                        <Route component={Error404} />
                    </Switch>
                </Content>
                <Footer />
            </Container>
        );
    }
}

export default branch(
    {
        username: 'username',
        blogOpen: 'blogOpen',
        isAdmin: 'isAdmin',
        posts: ['posts'],
        ip: ''
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
    flex: 1;
    margin: 3rem;
`;
