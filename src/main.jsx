import React from 'react';
import styled from 'styled-components';
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import CreatePost from './pages/create-post.jsx';
import Blacklist from './pages/blacklist.jsx';
import Landing from './pages/landing.jsx';
import Login from './pages/login.jsx';
import Post from './pages/post.jsx';

export default class Main extends React.Component {
    state = {
        isAdmin: false,
        username: undefined,
        blogPostId: undefined,
        isLoginPageOpen: false,
        isBlacklistPageOpen: false,
        isCreatePostPageOpen: false
    };

    closeAllPages = () => {
        this.setState({
            blogPostId: undefined,
            isLoginPageOpen: false,
            isBlacklistPageOpen: false,
            isCreatePostPageOpen: false
        });
    };

    openLoginPage = () => {
        this.closeAllPages();
        this.setState({isLoginPageOpen: true});
    };

    openCreatePostPage = () => {
        this.closeAllPages();
        this.setState({isCreatePostPageOpen: true});
    };

    openBlackListPage = () => {
        this.closeAllPages();
        this.setState({isBlacklistPageOpen: true});
    };

    setBlogPostId = id => this.setState({blogPostId: id});

    setUserDetails = (username, isAdmin) => this.setState({username: username, isAdmin: isAdmin});

    render() {
        const {
            username,
            isAdmin,
            blogPostId,
            isLoginPageOpen,
            isCreatePostPageOpen,
            isBlacklistPageOpen
        } = this.state;

        return (
            <Container>
                <Header
                    username={username}
                    isAdmin={isAdmin}
                    isLoginPageOpen={isLoginPageOpen}
                    closeAllPages={this.closeAllPages}
                    openLoginPage={this.openLoginPage}
                    openCreatePostPage={this.openCreatePostPage}
                    openBlackListPage={this.openBlackListPage}
                    setBlogPostId={this.setBlogPostId}
                    setUserDetails={this.setUserDetails}
                />
                <Content>
                    {isLoginPageOpen && (
                        <Login setUserDetails={this.setUserDetails} closeAllPages={this.closeAllPages} />
                    )}

                    {isCreatePostPageOpen && <CreatePost username={username} />}

                    {isBlacklistPageOpen && <Blacklist />}

                    {blogPostId !== undefined ? (
                        <Post blogPostId={blogPostId} username={username} />
                    ) : (
                        !isLoginPageOpen &&
                        !isBlacklistPageOpen &&
                        !isCreatePostPageOpen && (
                            <Landing
                                username={username}
                                isAdmin={isAdmin}
                                setBlogPostId={this.setBlogPostId}
                            />
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
