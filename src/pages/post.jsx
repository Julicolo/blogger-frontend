import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Comment from '../components/comment.jsx';
import {capitalizeFirstLetter} from '../utils.js';

export default function Post(props) {
    const {username, blogPostId, isAdmin} = props,
        [author, setAuthor] = useState(''),
        [title, setTitle] = useState(''),
        [postContent, setPostContent] = useState(''),
        url = 'http://localhost/mysql/les4/blog-backend/post.php';

    useEffect(() => {
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({id: blogPostId})
        })
            .then(res => res.json())
            .then(result => {
                setAuthor(result[0].author_name);
                setTitle(result[0].title);
                setPostContent(result[0].post_content);
            });
    }, [blogPostId]);

    return (
        <StyledPost>
            <h2>{capitalizeFirstLetter(title)}</h2>
            <h3>By: {capitalizeFirstLetter(author)}</h3>
            <p>{capitalizeFirstLetter(postContent)}</p>
            <Comment username={username || 'guest'} isAdmin={isAdmin} blogPostId={blogPostId} />
        </StyledPost>
    );
}

const StyledPost = styled.div`
    margin: 3rem;

    h2 {
        margin-top: 0;
    }

    p {
        line-height: 1.5rem;
        margin-bottom: 3rem;
    }
`;
