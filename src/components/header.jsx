import React from 'react';
import styled from 'styled-components';
import {colors} from '../utils.js';

export default function Header({...props}) {
    const {
        username,
        isAdmin,
        setUserDetails,
        openCreatePostPage,
        openLoginPage,
        openBlackListPage,
        closeAllPages
    } = props;

    const adminButtons = [
        {
            text: 'Create Post',
            fn: () => openCreatePostPage(true)
        },
        {
            text: 'Blacklist',
            fn: () => openBlackListPage(true)
        }
    ];

    return (
        <TopBar>
            <h1 onClick={closeAllPages}>Blogger</h1>
            <div className="options">
                {isAdmin &&
                    adminButtons.map((btn, index) => (
                        <button key={index} onClick={btn.fn}>
                            {btn.text}
                        </button>
                    ))}
                {username ? (
                    <button
                        onClick={() => {
                            setUserDetails(undefined, false);
                            closeAllPages();
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
        cursor: pointer;
    }

    button {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 2.2rem;
        width: 9rem;
        color: ${colors.main};
        border: 1px solid ${colors.main};
        border-radius: 1rem;
        outline: none;
        font-size: 1rem;
        margin: 0 1rem;
        cursor: pointer;
    }

    .options {
        display: flex;
        flex-flow: row wrap;
        align-items: center;
    }
`;
