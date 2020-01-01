import React from 'react';
import styled from 'styled-components';
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import CreatePost from './pages/create-post.jsx';
import Blacklist from './pages/blacklist.jsx';
import UserManagement from './pages/user-management.jsx';
import Landing from './pages/landing.jsx';
import Login from './pages/login.jsx';
import Post from './pages/post.jsx';

export default class Main extends React.Component {
    state = {
        authLevel: 3,
        username: 'admin',
        // authLevel: 1,
        // username: undefined,
        blogPostId: undefined,
        isBlacklisted: undefined,
        isLoginPageOpen: false,
        isBlacklistPageOpen: false,
        isCreatePostPageOpen: false,
        isUserManagementPageOpen: false,
        searchInput: ''
    };

    componentDidMount() {
        fetch('http://localhost/blog-backend/blacklist/?me')
            .then(res => res.json())
            .then(result => this.setState({isBlacklisted: result[0].valid !== 0}));
    }

    closeAllPages = () => {
        this.setState({
            blogPostId: undefined,
            isLoginPageOpen: false,
            isBlacklistPageOpen: false,
            isCreatePostPageOpen: false,
            isUserManagementPageOpen: false
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

    openUserManagementPage = () => {
        this.closeAllPages();
        this.setState({isUserManagementPageOpen: true});
    };

    setBlogPostId = id => this.setState({blogPostId: id});

    setUserDetails = (username, authLevel) => this.setState({username, authLevel});

    setSearchInput = searchInput => this.setState({searchInput});

    render() {
        const {
            username,
            authLevel,
            isBlacklisted,
            blogPostId,
            isLoginPageOpen,
            isCreatePostPageOpen,
            isBlacklistPageOpen,
            isUserManagementPageOpen,
            searchInput
        } = this.state;

        return (
            <Container>
                <Header
                    username={username}
                    authLevel={authLevel}
                    isLoginPageOpen={isLoginPageOpen}
                    closeAllPages={this.closeAllPages}
                    openLoginPage={this.openLoginPage}
                    openCreatePostPage={this.openCreatePostPage}
                    openBlackListPage={this.openBlackListPage}
                    openUserManagementPage={this.openUserManagementPage}
                    setBlogPostId={this.setBlogPostId}
                    setUserDetails={this.setUserDetails}
                    setSearchInput={this.setSearchInput}
                />
                <Content>
                    {isLoginPageOpen && (
                        <Login setUserDetails={this.setUserDetails} closeAllPages={this.closeAllPages} />
                    )}

                    {isCreatePostPageOpen && <CreatePost username={username} />}

                    {isBlacklistPageOpen && <Blacklist />}

                    {isUserManagementPageOpen && <UserManagement />}

                    {blogPostId !== undefined ? (
                        <Post
                            blogPostId={blogPostId}
                            username={username}
                            authLevel={authLevel}
                            isBlacklisted={isBlacklisted}
                        />
                    ) : (
                        !isLoginPageOpen &&
                        !isBlacklistPageOpen &&
                        !isCreatePostPageOpen &&
                        !isUserManagementPageOpen && (
                            <Landing
                                username={username}
                                authLevel={authLevel}
                                setBlogPostId={this.setBlogPostId}
                                searchInput={searchInput}
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
