import React from 'react';
import styled from 'styled-components';
import Search from './search.jsx';
import {colors} from '../utils.js';
import burger from '../resources/burger.svg';

export default function Header(props) {
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
            text: 'Blacklist',
            fn: () => openBlackListPage(true)
        },
        {
            text: 'Create Post',
            fn: () => openCreatePostPage(true)
        }
    ];

    return (
        <TopBar>
            <h1 onClick={closeAllPages}>Blogger</h1>
            <div className="menu" onClick={e => e.currentTarget.children[1].classList.toggle('visible')}>
                {isAdmin && (
                    <React.Fragment>
                        <img src={burger} alt="burger icon" />
                        <div className="menu-items">
                            {adminButtons.map((btn, index) => (
                                <button key={index} onClick={btn.fn}>
                                    {btn.text}
                                </button>
                            ))}
                        </div>
                    </React.Fragment>
                )}
            </div>
            <Search />
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
        </TopBar>
    );
}

const TopBar = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    background-color: ${colors.main};
    position: sticky;
    top: 0;
    height: 4.5rem;

    h1 {
        margin-left: 3rem;
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
        margin-right: 3rem;
        cursor: pointer;
    }

    .menu {
        display: flex;
        flex-flow: column wrap;
        padding: 0.75rem 0;
        min-width: 3rem;

        img {
            width: 3rem;
        }

        .menu-items {
            display: none;
            flex-flow: row wrap;
            justify-content: space-around;
            position: absolute;
            top: 4.5rem;
            left: 0;
            background: ${colors.main};
            padding-bottom: 1rem;
            width: 22rem;
            border-bottom-right-radius: 1rem;
            border-bottom-left-radius: 1rem;

            button {
                margin-right: 0.25rem;
            }

            :hover {
                display: flex;
            }

            &.visible {
                display: flex;
            }
        }

        :hover {
            .menu-items {
                display: flex;
            }
        }
    }
`;
