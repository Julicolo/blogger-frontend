import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Comment from '../components/comment.jsx';
import {capitalizeFirstLetter, submitRatingHandler} from '../utils.js';

export default function Post({username, blogPostId, isAdmin, isBlacklisted}) {
    const url = 'http://localhost/mysql/les4/blog-backend/post/',
        [author, setAuthor] = useState(''),
        [title, setTitle] = useState(''),
        [rating, setRating] = useState(0),
        [postContent, setPostContent] = useState('');

    useEffect(() => {
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({id: blogPostId})
        })
            .then(res => res.json())
            .then(result => {
                setAuthor(result[0].author_name);
                setTitle(result[0].title);
                setRating(result[0].rating || 0);
                setPostContent(result[0].post_content);
            });
    }, [blogPostId]);

    return (
        <StyledPost>
            <div className="heading">
                <div className="text-wrapper">
                    <h2>{capitalizeFirstLetter(title)}</h2>
                    <h3>By: {capitalizeFirstLetter(author)}</h3>
                </div>
                <div className="rating">
                    <span
                        role="img"
                        aria-label="cross-emoticon"
                        onClick={submitRatingHandler({id: blogPostId, type: 'post', value: 1})}
                    >
                        🔼
                    </span>
                    {rating || 0}
                    <span
                        role="img"
                        aria-label="cross-emoticon"
                        onClick={submitRatingHandler({id: blogPostId, type: 'post', value: -1})}
                    >
                        🔽
                    </span>
                </div>
            </div>
            <p>{capitalizeFirstLetter(postContent)}</p>
            <Comment
                username={username || 'guest'}
                isAdmin={isAdmin}
                blogPostId={blogPostId}
                isBlacklisted={isBlacklisted}
            />
        </StyledPost>
    );
}

const StyledPost = styled.div`
    margin: 3rem;

    .heading {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
    }

    .text-wrapper {
        h2 {
            margin-top: 0;
        }
    }

    .rating {
        display: flex;
        flex-flow: column wrap;
        justify-content: center;
        align-items: center;
    }

    p {
        line-height: 1.5rem;
        margin-bottom: 3rem;
    }
`;
