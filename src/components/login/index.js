import React from 'react';
import styled from 'styled-components';
import {branch} from 'baobab-react/higher-order';
import {colors} from '../../css-utils.js';

class Login extends React.Component {
    state = {usernameField: undefined, passwordField: undefined, wrongPassword: null};

    handleClick() {
        const {usernameField, passwordField} = this.state;
        const url = 'http://localhost/mysql/les4/blog-backend/login.php';

        if (usernameField !== undefined && passwordField !== undefined) {
            fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    username: usernameField,
                    password: passwordField
                })
            })
                .then(response => response.json())
                .then(result => {
                    if (result == null) {
                        this.setState({wrongPassword: true});
                    } else {
                        this.props.dispatch(state => state.set('username', result[0].username));
                    }
                    this.setState({usernameField: undefined, passwordField: undefined});
                });
        }
    }

    render() {
        const {usernameField, passwordField, wrongPassword} = this.state;

        console.log(this.state);

        return (
            <LoginForm>
                <h2>{wrongPassword && "We couldn't find an username with that password!"}</h2>
                <div className="input-wrapper">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={usernameField || ''}
                        onChange={e => this.setState({usernameField: e.target.value})}
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={passwordField || ''}
                        onChange={e => this.setState({passwordField: e.target.value})}
                    />
                </div>
                <button onClick={() => this.handleClick()}>Login</button>
            </LoginForm>
        );
    }
}

export default branch(
    {
        username: 'username'
    },
    Login
);

const LoginForm = styled.div`
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    margin: auto;

    button {
        width: 7.5rem;
        height: 2.5rem;
        border-radius: 0.2rem;
        border: 1px solid ${colors.main};
        outline: none;
        color: ${colors.main};
    }

    .input-wrapper {
        display: flex;
        flex-flow: column wrap;
        align-items: center;
        margin-bottom: 2rem;

        label {
            margin-bottom: 1rem;
            color: ${colors.main};
        }

        input {
            width: 10rem;
        }
    }
`;
