import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {colors} from '../utils.js';

export default function Posts({...props}) {
    const url = 'http://localhost/mysql/les4/blog-backend/posts.php',
        [blogPosts, setBlogPosts] = useState([]),
        [isBlogOpen, setBlogOpen] = useState(false),
        [isEndReached, setEndReached] = useState(false),
        [start, setNewStart] = useState(0),
        {username, isAdmin} = props;

    useEffect(() => {
        function fetchData() {
            return fetch(url, {
                method: 'POST',
                body: JSON.stringify({start: start})
            })
                .then(res => res.json())
                .then(result => {
                    if (result === null) {
                        setEndReached(true);
                        return;
                    }

                    setBlogPosts(posts => [...posts, ...result]);
                });
        }
        fetchData();
    }, [start]);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            const height = document.documentElement.offsetHeight,
                scrolled = window.scrollY + window.innerHeight;

            if (height * 0.85 <= scrolled) {
                setNewStart(start => start + 10);
            }
        });
    }, []);

    return (
        <React.Fragment>
            {username && <Greeting>{'Welcome back, ' + username + ' :)'}</Greeting>}
            {blogPosts.map(post => (
                <React.Fragment key={post.id}>
                    <PostPreview onClick={() => setBlogOpen(post.id)}>
                        {isAdmin && <h2>Post ID: {post.id}</h2>}
                        <h2>{post.title.replace(/\w/, c => c.toUpperCase())}</h2>
                        <p>{post.post_content.slice(0, 600).replace(/\w/, c => c.toUpperCase()) + '...'}</p>
                        <h3>By: {post.author_name.replace(/\w/, c => c.toUpperCase())}</h3>
                    </PostPreview>
                </React.Fragment>
            ))}
            {isEndReached && (
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
