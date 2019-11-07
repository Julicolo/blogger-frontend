import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {colors} from '../utils.js';

export default function Comment({username, isAdmin, blogPostId}) {
    const url = 'http://localhost/mysql/les4/blog-backend/comments/',
        [comments, setComments] = useState([]),
        [newComment, setNewComment] = useState(''),
        [deleteReason, setDeleteReason] = useState(''),
        [editCommentId, toggleEditMenuId] = useState('');

    useEffect(() => {
        fetchComments();
    }, []); // eslint-disable-line

    function fetchComments() {
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify({id: blogPostId})
        })
            .then(res => res.json())
            .then(result => {
                setComments([...result]);
            });
    }

    function submitComment() {
        if (newComment !== '') {
            fetch(url + 'actions/add.php', {
                method: 'POST',
                body: JSON.stringify({
                    post_id: blogPostId,
                    name: username,
                    comment: newComment
                })
            }).then(fetchComments);
        }
    }

    function deleteComment() {
        fetch(url + 'actions/delete.php', {
            method: 'POST',
            body: JSON.stringify({
                id: editCommentId,
                reason: !deleteReason ? 'This comment has been removed' : deleteReason
            })
        }).then(() => {
            fetchComments();
            toggleEditMenuId('');
        });
    }

    return (
        <CommentSection>
            <span>
                Comment as <strong>{username}</strong>
            </span>
            <textarea
                type="big"
                name="postContent"
                placeholder="Feel like sharing your thoughts?"
                cols="35"
                rows="3"
                onChange={e => setNewComment(e.target.value)}
            />
            <button className={newComment === '' ? 'inactive' : undefined} onClick={submitComment}>
                Comment
            </button>
            <hr />
            {comments.map(comment =>
                editCommentId === comment.id ? (
                    <div className="comment" key={comment.id}>
                        <div className="comment-heading">
                            <span>{comment.name}</span>
                            <span role="img" aria-label="check-emoticon" onClick={deleteComment}>
                                ✅
                            </span>
                            <span role="img" aria-label="cross-emoticon" onClick={() => toggleEditMenuId('')}>
                                ❌
                            </span>
                        </div>
                        <textarea
                            onChange={e => setDeleteReason(e.target.value)}
                            placeholder="Optional: reason for deleting"
                        />
                    </div>
                ) : (
                    <div className="comment" key={comment.id}>
                        <div className="comment-heading">
                            <span>{comment.name}</span>
                            <span>{comment.date}</span>
                            {isAdmin && (
                                <span
                                    role="img"
                                    aria-label="cross-emoticon"
                                    onClick={() => toggleEditMenuId(comment.id)}
                                >
                                    ❌
                                </span>
                            )}
                        </div>
                        <br />
                        <span>{comment.comment}</span>
                    </div>
                )
            )}
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
        &.inactive {
            background: #999;
            cursor: not-allowed;
        }
    }

    textarea {
        font-size: 1.5rem;
        padding: 0.5rem;
        margin: 2rem 0;
    }

    .comment {
        width: 75%;
        border: 1px solid #999;
        padding: 1rem;
        margin: 1rem;

        textarea {
            width: 100%;
            margin-bottom: 0;
        }

        .comment-heading {
            display: flex;
            flex-flow: row wrap;
            justify-content: space-between;
            margin: 0.5rem 0;
        }
    }
`;
