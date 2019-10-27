import React from 'react';
import styled from 'styled-components';

export default function Post(props) {
    const {post, admin, dispatch} = props.data;

    // TODO: make window close with a button instead of the whole post!

    return (
        <StyledPost onClick={() => dispatch(state => state.set({blogOpen: false}))}>
            {admin && <h2>Post ID: {post.id}</h2>}
            <h2>{post.title.replace(/\w/, c => c.toUpperCase())}</h2>
            <p>{post.post_content.replace(/\w/, c => c.toUpperCase())}</p>
            <h3>By: {post.author_name.replace(/\w/, c => c.toUpperCase())}</h3>
        </StyledPost>
    );
}

const StyledPost = styled.div`
    background: white;
    position: fixed;
    top: 4.5rem;
    width: 100vw;
    height: 100%;
    padding: 3rem;
    overflow: auto;

    h2 {
        margin-top: 0;
    }

    p {
        line-height: 1.5rem;
    }
`;
