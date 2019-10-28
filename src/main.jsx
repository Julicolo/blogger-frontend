import React from 'react';
import styled from 'styled-components';
import Header from './components/header.jsx';
import Posts from './components/posts.jsx';
import Footer from './components/footer.jsx';
import Login from './components/login.jsx';
import CreatePost from './components/create-post.jsx';
import Post from './components/post.jsx';

export default class Main extends React.Component {
    state = {
        username: undefined,
        isAdmin: false,
        isLoginPageOpen: false,
        isCreatePostPageOpen: false,
        blogPostId: undefined
    };

    closeAllPages = () => {
        this.setState({isLoginPageOpen: false, isCreatePostPageOpen: false, blogPostId: undefined});
    };

    openLoginPage = () => {
        this.closeAllPages();
        this.setState({isLoginPageOpen: true});
    };

    openCreatePostPage = () => {
        this.closeAllPages();
        this.setState({isCreatePostPageOpen: true});
    };

    setUserDetails = (username, isAdmin) => this.setState({username: username, isAdmin: isAdmin});

    setBlogPostId = id => this.setState({blogPostId: id});

    render() {
        const {username, isAdmin, isLoginPageOpen, isCreatePostPageOpen, blogPostId} = this.state;

        console.log(this.state);

        return (
            <Container>
                <Header
                    username={username}
                    isAdmin={isAdmin}
                    isLoginPageOpen={isLoginPageOpen}
                    closeAllPages={this.closeAllPages}
                    openLoginPage={this.openLoginPage}
                    openCreatePostPage={this.openCreatePostPage}
                    setUserDetails={this.setUserDetails}
                />
                <Content>
                    {isLoginPageOpen && (
                        <Login setUserDetails={this.setUserDetails} closeAllPages={this.closeAllPages} />
                    )}
                    {isCreatePostPageOpen && <CreatePost username={username} />}
                    {blogPostId !== undefined ? (
                        <Post blogPostId={blogPostId} />
                    ) : (
                        !isLoginPageOpen &&
                        !isCreatePostPageOpen && (
                            <Posts username={username} isAdmin={isAdmin} setBlogPostId={this.setBlogPostId} />
                        )
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
