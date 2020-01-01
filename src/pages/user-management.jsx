import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {StyledTable, UserOptions} from './blacklist.jsx';
import {colors} from '../utils';

export default function UserManagement() {
    const url = 'http://localhost/blog-backend/user-management/',
        [inputUsername, setInputUsername] = useState(''),
        [inputPassword, setInputPassword] = useState(''),
        [inputAuthLevel, setInputAuthLevel] = useState(0),
        [error, setError] = useState(''),
        [users, setUsers] = useState([]),
        authLevelOptions = [
            {name: 'Author', level: 1},
            {name: 'Moderator', level: 2},
            {name: 'Administrator', level: 3}
        ];

    function removeUser(id) {
        return fetch(url + 'actions/delete', {
            method: 'POST',
            body: JSON.stringify({id})
        })
            .then(res => res.json())
            .then(result =>
                result
                    ? setUsers(users.filter(user => user.id !== id))
                    : setError("You can't delete this user because it has posts linked to it!")
            );
    }

    function changeAuthLevel(id, level) {
        const currentUserLevel = users.find(usr => usr.id === id).authLevel;

        return fetch(url + 'actions/change', {
            method: 'POST',
            body: JSON.stringify({id, level: level === currentUserLevel ? level - 1 : level})
        }).then(() =>
            fetch(url)
                .then(res => res.json())
                .then(setUsers)
        );
    }

    // function addUser(id) {
    //     return fetch(url + 'actions/add', {
    //         method: 'POST',
    //         body: JSON.stringify({id: id, username: inputUsername, })
    //     })
    //         .then(res => res.json())
    //         .then(result =>
    //             result
    //                 ? setUsers(users.filter(user => user.id !== id))
    //                 : setError("You can't delete this user because it has posts linked to it!")
    //         );
    // }

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(setUsers);
    }, []);

    return (
        <StlyedUserManagement>
            <h2>User Management Panel</h2>
            <UserOptions>
                <h2>Add a user</h2>
                <label htmlFor="username">Username</label>
                <input name="username" type="text" onChange={e => setInputUsername(e.target.value)} />
                <label htmlFor="password">Password</label>
                <input name="password" type="password" onChange={e => setInputPassword(e.target.value)} />
                <label htmlFor="auth-level">Auth Level</label>
                <select value={inputAuthLevel} onChange={e => setInputAuthLevel(parseInt(e.target.value))}>
                    <option value="0">Normal</option>
                    {authLevelOptions.map(opt => (
                        <option key={opt.name} value={opt.level}>
                            {opt.name}
                        </option>
                    ))}
                </select>
            </UserOptions>
            <div className="error-message">{error}</div>
            <StyledTable>
                <div className="row heading">
                    <span>Name</span>
                    {authLevelOptions.map(({name}) => (
                        <span key={name}>{name}</span>
                    ))}
                    <span>Delete</span>
                </div>
                {users.map(user => (
                    <div className="row" key={user.id}>
                        <span>{user.username}</span>
                        <span
                            role="img"
                            aria-label="cross-emoticon"
                            onClick={() => changeAuthLevel(user.id, 1)}
                        >
                            {user.authLevel > 0 ? '✅' : '❌'}
                        </span>
                        <span
                            role="img"
                            aria-label="cross-emoticon"
                            onClick={() => changeAuthLevel(user.id, 2)}
                        >
                            {user.authLevel > 1 ? '✅' : '❌'}
                        </span>
                        <span
                            role="img"
                            aria-label="cross-emoticon"
                            onClick={() => changeAuthLevel(user.id, 3)}
                        >
                            {user.authLevel > 2 ? '✅' : '❌'}
                        </span>
                        <span role="img" aria-label="cross-emoticon" onClick={() => removeUser(user.id)}>
                            ❓
                        </span>
                    </div>
                ))}
            </StyledTable>
        </StlyedUserManagement>
    );
}

const StlyedUserManagement = styled.div`
    h2 {
        text-align: center;
        color: ${colors.main};
    }

    div.error-message {
        min-height: 3rem;
        text-align: center;
    }

    ${StyledTable} {
        .row span {
            width: 20%;
        }
    }

    ${UserOptions} {
        label {
            margin-bottom: 0;
            font-size: 1.5rem;
        }

        input {
            width: 15rem;
            margin-bottom: 1rem;
            font-size: 1.5rem;
            margin-bottom: 2rem;
            text-align: center;
        }

        select {
            font-size: 1.3rem;
        }
    }
`;
