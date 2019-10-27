import React from 'react';
import styled from 'styled-components';
import {branch} from 'baobab-react/higher-order';
import {Redirect} from 'react-router';
import {colors} from '../utils.js';

class Login extends React.Component {
    state = {username: 'admin', password: 'admin', correctPassword: null};

    handleClick() {
        const {username, password} = this.state,
            url = 'http://localhost/mysql/les4/blog-backend/login.php';

        if (username !== '' && password !== '') {
            fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    username,
                    password
                })
            })
                .then(response => response.json())
                .then(result => {
                    if (result === null) {
                        this.setState({
                            username: '',
                            password: '',
                            correctPassword: false
                        });
                    } else {
                        this.setState({correctPassword: true});
                        this.props.dispatch(state => {
                            state.set({
                                username: result[0].username,
                                isAdmin: result[0].admin ? true : false
                            });
                        });
                    }
                });
        }
    }

    render() {
        const {username, password, correctPassword} = this.state;

        if (correctPassword) return <Redirect to="/" />;

        return (
            <StyledForm>
                <h2>{correctPassword && "We couldn't find an username with that password!"}</h2>
                <div className="input-wrapper">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={username || ''}
                        onChange={e => this.setState({username: e.target.value})}
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password || ''}
                        onChange={e => this.setState({password: e.target.value})}
                    />
                </div>
                <button
                    className={username === '' || password === '' ? 'deactive' : ''}
                    onClick={() => this.handleClick()}
                >
                    Login
                </button>
            </StyledForm>
        );
    }
}

export default branch(
    {
        username: 'username',
        isAdmin: 'isAdmin'
    },
    Login
);

const StyledForm = styled.div`
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    margin: auto;

    button {
        width: 10rem;
        height: 3rem;
        margin: 3rem;
        border-radius: 0.2rem;
        outline: none;
        border: none;
        background: ${colors.main};
        font-size: 1.5rem;
        color: white;
        &.deactive {
            background: ${colors.deactive};
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
            width: 20rem;
            font-size: 2rem;
        }
    }
`;
