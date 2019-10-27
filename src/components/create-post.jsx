import React from 'react';
import styled from 'styled-components';
import {branch} from 'baobab-react/higher-order';
import {colors} from '../utils.js';

class CreatePosts extends React.Component {
    state = {
        title: '',
        author: this.props.username,
        postContent: '',
        submitted: false
    };

    handleClick() {
        const {title, author, postContent} = this.state,
            url = 'http://localhost/mysql/les4/blog-backend/create-post.php';

        if (title !== '' && postContent !== '') {
            fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    title,
                    author,
                    postContent
                })
            })
                .then(response => response.json())
                .then(result => {
                    this.setState({
                        title: '',
                        postContent: '',
                        submitted: result === null ? false : true
                    });
                });
        }
    }

    render() {
        const {submitted, title, postContent} = this.state;

        return (
            <StyledForm>
                {submitted && <h2>Successfully submitted your blog post!</h2>}
                <div className="input-wrapper">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" onChange={e => this.setState({title: e.target.value})} />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="postContent">Post Content</label>
                    <textarea
                        type="big"
                        name="postContent"
                        cols="60"
                        rows="15"
                        onChange={e => this.setState({postContent: e.target.value})}
                    />
                </div>
                <button
                    className={title === '' || postContent === '' ? 'deactive' : ''}
                    onClick={() => this.handleClick()}
                >
                    Submit blog post!
                </button>
            </StyledForm>
        );
    }
}

export default branch(
    {
        username: 'username',
        isAdmin: 'isAdmin',
        posts: ['posts'],
        ip: ''
    },
    CreatePosts
);

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
