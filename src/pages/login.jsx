import React, {useState} from 'react';
import styled from 'styled-components';
import {colors} from '../utils.js';

export default function Login(props) {
    const [username, setUsername] = useState('admin'),
        [password, setPassword] = useState('admin'),
        [isPasswordCorrect, passwordCorrect] = useState(true);

    function handleClick() {
        const url = 'http://localhost/mysql/les4/blog-backend/login.php';

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
                        setUsername('');
                        setPassword('');
                        passwordCorrect(false);
                    } else {
                        props.setUserDetails(result[0].username, result[0].admin);
                        props.closeAllPages();
                    }
                });
        }
    }

    return (
        <StyledForm>
            <h2>{!isPasswordCorrect && "We couldn't find an username with that password!"}</h2>
            <div className="input-wrapper">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
            </div>
            <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <button
                className={username === '' || password === '' ? 'inactive' : undefined}
                onClick={handleClick}
            >
                Login
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
        width: 10rem;
        height: 3rem;
        margin: 3rem;
        border-radius: 0.2rem;
        outline: none;
        border: none;
        background: ${colors.main};
        font-size: 1.5rem;
        color: white;
        cursor: pointer;
        &.inactive {
            background: ${colors.inactive};
            cursor: blocked;
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
            padding: 0.3rem;
        }
    }
`;
