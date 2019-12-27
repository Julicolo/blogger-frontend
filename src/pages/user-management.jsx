import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {StyledTable, UserOptions} from './blacklist.jsx';
import {colors} from '../utils';

export default function UserManagement() {
    const url = 'http://localhost/blog-backend/user-management/',
        [users, setUsers] = useState([]);

    function removeUser(id) {}

    useEffect(() => {
        fetch(url + 'index.php')
            .then(res => res.json())
            .then(setUsers);
    }, []);

    return (
        <React.Fragment>
            <UserOptions>
                <label htmlFor="ip-adress">IP adress</label>
            </UserOptions>
            <StyledTable>
                <div className="row heading">
                    <span>Name</span>
                    <span>Edit</span>
                    <span>Delete</span>
                </div>
                {users.map(userObj => (
                    <div className="row" key={userObj.id}>
                        <span>{userObj.username}</span>
                        <span role="img" aria-label="cross-emoticon" onClick={() => removeUser(userObj.id)}>
                            ❌
                        </span>
                    </div>
                ))}
            </StyledTable>
        </React.Fragment>
    );
}
