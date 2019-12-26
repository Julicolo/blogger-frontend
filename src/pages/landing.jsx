import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {colors, capitalizeFirstLetter} from '../utils.js';

export default function Landing({username, isAdmin, setBlogPostId, searchInput}) {
    const url = 'http://localhost/blog-backend/',
        [blogPosts, setBlogPosts] = useState([]),
        [isEndReached, setEndReached] = useState(false),
        [start, setNewStart] = useState(0);

    useEffect(() => {
        fetch(url, {
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
    }, [start]);

    useEffect(() => {
        function loadMorePosts() {
            const height = document.documentElement.offsetHeight,
                scrolled = window.scrollY + window.innerHeight;

            if (height * 0.85 <= scrolled) {
                return setNewStart(start => start + 10);
            }
        }

        window.addEventListener('scroll', loadMorePosts);

        return () => window.removeEventListener('scroll', loadMorePosts);
    }, []);

    function keepPost(post) {
        return (
            post.id.toString().includes(searchInput) ||
            post.title.includes(searchInput) ||
            post.post_content.includes(searchInput) ||
            post.author_name.includes(searchInput)
        );
    }

    return (
        <React.Fragment>
            {username && <Greeting>{'Welcome back, ' + username + ' :)'}</Greeting>}
            {blogPosts.filter(keepPost).map(post => (
                <PostPreview key={post.id} onClick={() => setBlogPostId(post.id)}>
                    {isAdmin && <h2>Post ID: {post.id}</h2>}
                    <h2>{capitalizeFirstLetter(post.title)}</h2>
                    <p>{capitalizeFirstLetter(post.post_content.slice(0, 600)) + '...'}</p>
                    <h3>By: {capitalizeFirstLetter(post.author_name)}</h3>
                </PostPreview>
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
    cursor: pointer;
    border-radius: 1rem;

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
