import React, {useState} from 'react';
import styled from 'styled-components';
import {colors} from '../utils.js';

export default function CreatePost(props) {
    const [title, setTitle] = useState(''),
        [postContent, setPostContent] = useState(''),
        [isPostSubmitted, submitPost] = useState(false);

    function handleClick() {
        const url = 'http://localhost/mysql/les4/blog-backend/create-post.php';

        if (title !== '' && postContent !== '') {
            fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    title,
                    postContent,
                    author: props.username
                })
            }).then(() => {
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
            <button className={title === '' || postContent === '' ? 'deactive' : ''} onClick={handleClick}>
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
        &.deactive {
            background: #999;
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
        }

        textarea {
            font-size: 2rem;
        }
    }
`;
