import React from 'react';
import styled from 'styled-components';
import {branch} from 'baobab-react/higher-order';
import {colors} from '../../css-utils.js';

const Header = function(props) {
    const {username} = props;

    return (
        <React.Fragment>
            <TopBar>
                <h1>Blogger</h1>
                <div className="user-options">
                    <span>{username && 'Welcome, ' + username}</span>
                    {!username ? (
                        <button
                            onClick={() => {
                                props.dispatch(state => state.set('isLoginButtonClicked', true));
                            }}
                        >
                            Login
                        </button>
                    ) : (
                        <button
                            onClick={() => {
                                props.dispatch(state => {
                                    state.set({
                                        isLoginButtonClicked: false,
                                        username: false
                                    });
                                });
                            }}
                        >
                            Logout
                        </button>
                    )}
                </div>
            </TopBar>
            <StyledHeader>
                <nav>
                    <ul>
                        <li>Home</li>
                        <li>Random post</li>
                    </ul>
                </nav>
            </StyledHeader>
        </React.Fragment>
    );
};

export default branch(
    {
        isLoginButtonClicked: 'isLoginButtonClicked',
        username: 'username'
    },
    Header
);

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
