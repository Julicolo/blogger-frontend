import React from 'react';
import styled from 'styled-components';
import {colors} from '../../utils.js';

export default class Header extends React.Component {
    state = {
        username: 'admin',
        password: 'admin',
        isLoggedIn: false,
        isButtonClicked: false
    };

    componentDidMount() {
        const {username, password} = this.state;
        const url = 'http://localhost/mysql/les4/blog-frontend/';

        fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
            .then(response => response.json())
            .then(result => {
                console.log(result);
            });
    }

    render() {
        const {username, isLoggedIn} = this.state;

        return (
            <React.Fragment>
                <TopBar>
                    <h1>Blogger</h1>
                    <div className="user-options">
                        <span>{isLoggedIn ? `Welcome, ${username}` : ''}</span>
                        {isLoggedIn ? (
                            <button onClick={() => this.setState({isLoggedIn: false})}>Logout</button>
                        ) : (
                            <button onClick={() => this.setState({isButtonClicked: true})}>Sign in</button>
                        )}
                    </div>
                </TopBar>
                <StyledHeader>
                    <nav>
                        <ul>
                            <li>Home</li>
                            <li>Categories</li>
                            <li>Random post</li>
                        </ul>
                    </nav>
                </StyledHeader>
            </React.Fragment>
        );
    }
}

export const TopBar = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    margin: 0.5rem 1rem;

    h1 {
        margin: 0;
        color: black;
    }

    .user-options {
        display: flex;
        flex-flow: row wrap;
        align-items: center;

        span {
            margin: 0 1rem;
        }

        button {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 2rem;
            width: 4rem;
            color: ${colors.main};
            border: 1px solid ${colors.main};
            border-radius: 0.2rem;
            outline: none;
        }
    }
`;

export const StyledHeader = styled.header`
    display: flex;
    flex-flow: row wrap;
    background-color: ${colors.main};

    nav {
        display: flex;
        align-items: center;
        width: 100%;

        ul {
            display: flex;
            flex-flow: row wrap;
            justify-content: space-evenly;
            width: 100%;
            margin: 0;
            padding: 0.5rem 0;
            list-style: none;
            color: ${colors.white};
        }
    }
`;
