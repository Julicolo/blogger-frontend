import React from 'react';
import styled from 'styled-components';
import {colors} from '../utils.js';

export default function Header({...props}) {
    const {username, isAdmin, openCreatePostPage, openLoginPage, setUserDetails, backToHome} = props;

    return (
        <TopBar>
            <h1 onClick={backToHome}>Blogger</h1>
            <div className="options">
                {isAdmin && (
                    <button className="create-post-btn" onClick={() => openCreatePostPage(true)}>
                        Create post
                    </button>
                )}
                {username ? (
                    <button
                        onClick={() => {
                            setUserDetails(undefined, false);
                            backToHome();
                        }}
                    >
                        Logout
                    </button>
                ) : (
                    <button onClick={openLoginPage}>Login</button>
                )}
            </div>
        </TopBar>
    );
}

const TopBar = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    padding: 1rem 1.5rem;
    background-color: ${colors.main};
    position: sticky;
    top: 0;
    height: 4.5rem;

    h1 {
        margin: 0 1rem;
        color: white;
    }

    button {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 2.2rem;
        width: 5rem;
        color: ${colors.main};
        border: 1px solid ${colors.main};
        border-radius: 0.2rem;
        outline: none;
        font-size: 1rem;
        margin: 0 1rem;

        a {
            color: ${colors.main};
            text-decoration: none;
            font-size: 1rem;
        }
    }

    .create-post-btn {
        width: 9rem;
    }

    .options {
        display: flex;
        flex-flow: row wrap;
        align-items: center;

        span {
            margin: 0 1rem;
            color: white;
            font-size: 1.5rem;
        }
    }
`;
