import React, {useState} from 'react';
import styled from 'styled-components';
import {colors} from '../utils.js';

export default function Comment(props) {
    const [comment, setComment] = useState(''),
        {username} = props;

    function handleClick() {
        const url = 'http://localhost/mysql/les4/blog-backend/login.php';

        if (comment !== '') {
            fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    comment
                })
            });
            // .then(response => response.json())
            // .then(result => {
            //     if (result === null) {
            //         setUsername('');
            //         setPassword('');
            //         passwordCorrect(false);
            //     } else {
            //         props.setUserDetails(result[0].username, result[0].admin);
            //         props.closeAllPages();
            //     }
            // });
        }
    }

    return (
        <CommentSection>
            <span>
                Comment as <strong>{username || 'guest'}</strong>
            </span>
            <textarea
                type="big"
                name="postContent"
                placeholder="Feel like sharing your thoughts?"
                cols="35"
                rows="3"
                onChange={e => setComment(e.target.value)}
            />
            <button className={comment === '' ? 'deactive' : undefined} onClick={handleClick}>
                Comment
            </button>
        </CommentSection>
    );
}

const CommentSection = styled.div`
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    margin: auto;

    button {
        width: 10rem;
        height: 3rem;
        border-radius: 0.2rem;
        outline: none;
        border: none;
        background: ${colors.main};
        font-size: 1.5rem;
        color: white;
        cursor: pointer;
        &.deactive {
            background: #999;
            cursor: not-allowed;
        }
    }

    textarea {
        font-size: 1.5rem;
        padding: 0.5rem;
        margin: 2rem 0;
    }
`;
