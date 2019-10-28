import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

export default function Post({...props}) {
    const url = 'http://localhost/mysql/les4/blog-backend/post.php',
        [author, setAuthor] = useState(''),
        [title, setTitle] = useState(''),
        [postContent, setPostContent] = useState(''),
        {blogPostId} = props;

    useEffect(() => {
        function fetchData() {
            return fetch(url, {
                method: 'POST',
                body: JSON.stringify({id: blogPostId})
            })
                .then(res => res.json())
                .then(result => {
                    setAuthor(result[0].author_name);
                    setTitle(result[0].title);
                    setPostContent(result[0].post_content);
                });
        }

        fetchData();
    });

    return (
        <StyledPost>
            <h2>{title.replace(/\w/, c => c.toUpperCase())}</h2>
            <h3>By: {author.replace(/\w/, c => c.toUpperCase())}</h3>
            <p>{postContent.replace(/\w/, c => c.toUpperCase())}</p>
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
    }
`;
