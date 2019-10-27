import React from 'react';
import styled from 'styled-components';
import {branch} from 'baobab-react/higher-order';
import {colors} from '../utils.js';

class Posts extends React.Component {
    state = {
        blogPosts: [],
        blogOpen: undefined,
        loading: false,
        endReached: false,
        start: 0
    };

    componentDidMount() {
        const url = 'http://localhost/mysql/les4/blog-backend/posts.php',
            fetchData = () => {
                this.setState({loading: true});

                return fetch(url, {
                    method: 'POST',
                    body: JSON.stringify({start: this.state.start})
                })
                    .then(res => res.json())
                    .then(result => {
                        if (result === null) {
                            this.setState({endReached: true});
                            return;
                        }

                        this.setState(state => ({
                            blogPosts: [...state.blogPosts, ...result]
                        }));
                    })
                    .then(() => this.setState({loading: false}));
            };

        window.addEventListener('scroll', event => {
            if (this.state.loading) return;

            const height = document.documentElement.offsetHeight,
                scrolled = window.scrollY + window.innerHeight;

            if (height * 0.85 <= scrolled) {
                this.setState(state => ({start: state.start + 10}));
                fetchData();
            }
        });

        fetchData();
    }

    render() {
        const {blogPosts, endReached} = this.state,
            {username, isAdmin, dispatch} = this.props;

        return (
            <React.Fragment>
                {username && <Greeting>{'Welcome back, ' + username + ' :)'}</Greeting>}
                {blogPosts.map(post => (
                    <PostPreview key={post.id} onClick={() => dispatch(state => state.set({blogOpen: post}))}>
                        {isAdmin && <h2>Post ID: {post.id}</h2>}
                        <h2>{post.title.replace(/\w/, c => c.toUpperCase())}</h2>
                        <p>{post.post_content.slice(0, 600).replace(/\w/, c => c.toUpperCase()) + '...'}</p>
                        <h3>By: {post.author_name.replace(/\w/, c => c.toUpperCase())}</h3>
                    </PostPreview>
                ))}
                {endReached && (
                    <End>
                        <h3>
                            Wow I didn't expect to find <em>you</em> here...
                        </h3>
                        <span>This appears to be end, unfortunately.. Please check again later :)</span>
                    </End>
                )}
            </React.Fragment>
        );
    }
}

export default branch(
    {
        username: 'username',
        isAdmin: 'isAdmin',
        posts: ['posts'],
        ip: ''
    },
    Posts
);

const Greeting = styled.h2`
    margin: 0 0 3rem;
    color: ${colors.main};
`;

const PostPreview = styled.div`
    background: ${colors.light};
    padding: 1rem 2rem;
    margin-bottom: 3rem;

    h3 {
        float: right;
        margin: 0 0 1rem;
    }
`;

const End = styled.div`
    text-align: center;

    h3 {
        margin: 0 0 0.5rem;
    }
`;
