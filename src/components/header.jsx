import React, {useState} from 'react';
import styled from 'styled-components';
import Search from './search.jsx';
import {colors} from '../utils';
import burger from '../resources/burger.svg';

export default function Header({
    username,
    authLevel,
    setUserDetails,
    openCreatePostPage,
    openLoginPage,
    openBlackListPage,
    openUserManagementPage,
    closeAllPages,
    setSearchInput
}) {
    const [isMenuOpen, setMenuState] = useState(false),
        menuButtons = [
            {
                authLevelNeeded: 0,
                text: 'Logout',
                fn: () => {
                    setUserDetails(undefined, 0);
                    closeAllPages();
                }
            },
            {
                authLevelNeeded: 1,
                text: 'Create Post',
                fn: () => {
                    setMenuState(false);
                    openCreatePostPage(true);
                }
            },
            {
                authLevelNeeded: 2,
                text: 'Blacklist',
                fn: () => {
                    setMenuState(false);
                    openBlackListPage(true);
                }
            },
            {
                authLevelNeeded: 3,
                text: 'User Management',
                fn: () => {
                    setMenuState(false);
                    openUserManagementPage(true);
                }
            }
        ];

    return (
        <TopBar>
            <h1 onClick={closeAllPages}>Blogger</h1>
            <Search setSearchInput={setSearchInput} />
            {username ? (
                <div className="menu">
                    <img src={burger} alt="burger menu" onClick={() => setMenuState(!isMenuOpen)} />
                    {isMenuOpen && (
                        <div className="menu-items">
                            {menuButtons
                                .filter(({authLevelNeeded}) => authLevelNeeded <= authLevel)
                                .map(btn => (
                                    <button key={btn.text} onClick={btn.fn}>
                                        {btn.text}
                                    </button>
                                ))}
                        </div>
                    )}
                </div>
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
        width: 10rem;
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
        margin-right: 6rem;
        min-width: 3rem;

        img {
            width: 3rem;
        }

        .menu-items {
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: 4.5rem;
            right: 0;
            background: ${colors.main};
            padding: 1rem;
            width: 15rem;
            border-bottom-right-radius: 1rem;
            border-bottom-left-radius: 1rem;

            button {
                margin-left: 1.5rem;

                &:not(:last-child) {
                    margin-bottom: 1.5rem;
                }

                &:last-child {
                    margin-bottom: 0.5rem;
                }
            }
        }
    }
`;
