import React from 'react';
import styled from 'styled-components';
import Header from './components/header.jsx';
import Posts from './components/posts.jsx';
import Footer from './components/footer.jsx';
import Login from './components/login.jsx';
import CreatePost from './components/create-post.jsx';
// import Post from './components/post.jsx';

export default class Main extends React.Component {
    state = {
        username: undefined,
        isAdmin: false,
        isLoginPageOpen: false,
        isCreatePostPageOpen: false
    };

    backToHome = () => this.setState({isLoginPageOpen: false, isCreatePostPageOpen: false});
    openLoginPage = () => this.setState({isLoginPageOpen: true});
    openCreatePostPage = () => this.setState({isCreatePostPageOpen: true});

    setUserDetails = (username, isAdmin) => this.setState({username: username, isAdmin: isAdmin});

    render() {
        const {username, isAdmin, isLoginPageOpen, isCreatePostPageOpen} = this.state;

        return (
            <Container>
                <Header
                    username={username}
                    isAdmin={isAdmin}
                    isLoginPageOpen={isLoginPageOpen}
                    backToHome={this.backToHome}
                    openLoginPage={this.openLoginPage}
                    openCreatePostPage={this.openCreatePostPage}
                    setUserDetails={this.setUserDetails}
                />
                <Content>
                    {isLoginPageOpen && (
                        <Login setUserDetails={this.setUserDetails} backToHome={this.backToHome} />
                    )}
                    {isCreatePostPageOpen && <CreatePost username={username} />}
                    {!isLoginPageOpen && !isCreatePostPageOpen && (
                        <Posts username={username} isAdmin={isAdmin} />
                    )}
                </Content>
                <Footer />
            </Container>
        );
    }
}

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
