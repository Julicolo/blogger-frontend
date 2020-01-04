import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {colors, submitRatingHandler} from '../utils';

export default function Comment({username, authLevel, blogPostId, isBlacklisted}) {
    const url = 'http://localhost/blog-backend/comments/',
        [comments, setComments] = useState([]),
        [newComment, setNewComment] = useState(''),
        [deleteReason, setDeleteReason] = useState(''),
        [editCommentId, toggleEditMenuId] = useState('');

    useEffect(fetchComments, []);

    function fetchComments() {
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({id: blogPostId})
        })
            .then(res => res.json())
            .then(result => {
                setComments(result);
            })
            .catch(console.error);
    }

    function submitComment() {
        if (newComment !== '' && !isBlacklisted) {
            fetch(url + 'actions/add', {
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
        fetch(url + 'actions/delete', {
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
            <button
                className={newComment === '' || isBlacklisted ? 'inactive' : undefined}
                onClick={submitComment}
            >
                Comment
            </button>
            <hr />
            {comments.map(({id, name, date, rating, comment}) =>
                editCommentId === id ? (
                    <div className="comment" key={id}>
                        <div className="comment-heading">
                            <span>{name}</span>
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
                    <div className="comment" key={id}>
                        <div className="comment-heading">
                            <div className="text-wrapper">
                                <span>{date}</span>
                                <span>{name}</span>
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
                            {authLevel > 1 && (
                                <span
                                    role="img"
                                    aria-label="cross-emoticon"
                                    onClick={() => toggleEditMenuId(id)}
                                >
                                    ❌
                                </span>
                            )}
                        </div>
                        <br />
                        <span>{comment}</span>
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

            .text-wrapper {
                display: flex;
                flex-flow: column wrap;

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
        }
    }
`;
