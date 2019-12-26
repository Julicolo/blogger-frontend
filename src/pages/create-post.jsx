import React, {useState} from 'react';
import styled from 'styled-components';
import {colors} from '../utils.js';

export default function CreatePost({username}) {
    const [title, setTitle] = useState(''),
        [postContent, setPostContent] = useState(''),
        [isPostSubmitted, submitPost] = useState(false);

    function handleClick() {
        const url = 'http://localhost/blog-backend/post/actions/add.php';

        if (title !== '' && postContent !== '') {
            fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    title,
                    postContent,
                    author: username
                })
            })
                .then(res => res.json())
                .then(() => {
                    setTitle('');
                    setPostContent('');
                    submitPost(true);
                });
        }
    }

    return (
        <StyledForm>
            {isPostSubmitted && <h2>Successfully submitted your blog post!</h2>}
            <div className="input-wrapper">
                <label htmlFor="title">Title</label>
                <input type="text" name="title" onChange={e => setTitle(e.target.value)} />
            </div>
            <div className="input-wrapper">
                <label htmlFor="postContent">Post Content</label>
                <textarea
                    type="big"
                    name="postContent"
                    cols="60"
                    rows="15"
                    onChange={e => setPostContent(e.target.value)}
                />
            </div>
            <button className={title === '' || postContent === '' ? 'inactive' : ''} onClick={handleClick}>
                Submit blog post!
            </button>
        </StyledForm>
    );
}

const StyledForm = styled.div`
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    margin: auto;

    button {
        width: 15rem;
        height: 4rem;
        margin: 3rem;
        border-radius: 0.2rem;
        outline: none;
        border: none;
        background: ${colors.main};
        font-size: 1.5rem;
        color: white;
        cursor: pointer;
        &.inactive {
            background: #999;
            cursor: not-allowed;
        }
    }

    .input-wrapper {
        display: flex;
        flex-flow: column wrap;
        align-items: center;
        margin-bottom: 2rem;

        label {
            margin-bottom: 2rem;
            color: ${colors.main};
            font-size: 3rem;
        }

        input {
            width: 60rem;
            font-size: 2rem;
            padding: 0.3rem;
        }

        textarea {
            font-size: 2rem;
        }
    }
`;
