import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {colors} from '../utils.js';

export default function Blacklist(props) {
    const url = 'http://localhost/mysql/les4/blog-backend/blacklist.php',
        [ipAdresses, setIpAdressses] = useState([]),
        [addId, setAddId] = useState(''),
        [deleteId, setDeleteId] = useState(undefined);

    useEffect(() => {
        function fetchData() {
            return fetch(url)
                .then(res => res.json())
                .then(result => {
                    setIpAdressses([...result]);
                });
        }

        fetchData();
    }, []);

    function addIpAdress() {
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                add: addId
            })
        }).then(() => setAddId(true));
    }

    function removeIpAdress(id) {
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                delete: id
            })
        }).then(() => setDeleteId(undefined));
    }

    return (
        <React.Fragment>
            <UserOptions>
                <label htmlFor="ip-adress">IP adress</label>
                <input type="text" name="ip-adress" onChange={e => setAddId(e.target.value)} />
                <button className={addId === '' ? 'deactive' : undefined} onClick={() => addIpAdress()}>
                    Block!
                </button>
            </UserOptions>
            <StyledTable>
                <h2>{deleteId || addId === true ? 'Successfully (un)blocked an IP adress!' : undefined}</h2>
                <div className="row heading">
                    <span>ID</span>
                    <span>Date Added</span>
                    <span>IP Adress</span>
                    <span>Delete</span>
                </div>
                {ipAdresses.map(ipObj => (
                    <div className="row" key={ipObj.id}>
                        <span>{ipObj.id}</span>
                        <span>{ipObj.date_added}</span>
                        <span>{ipObj.ip_adress}</span>
                        <span role="img" aria-label="cross-emoticon" onClick={() => removeIpAdress(ipObj.id)}>
                            ❌
                        </span>
                    </div>
                ))}
            </StyledTable>
        </React.Fragment>
    );
}

const StyledTable = styled.div`
    display: flex;
    flex-flow: column wrap;
    margin: 0rem auto;
    width: 100%;

    .row {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        border: 1px solid black;
        border-top: none;

        :nth-child(odd) {
            background-color: ${colors.light};
        }

        &.heading {
            border-top: 1px solid black;
            font-weight: 600;
        }

        span {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 25%;
            padding: 0.5rem;
            :last-child {
                cursor: pointer;
            }

            :not(:last-child) {
                border-right: 1px solid black;
            }
        }
    }
`;

const UserOptions = styled.div`
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    margin: 0 auto;

    label {
        margin-bottom: 2rem;
        color: ${colors.main};
        font-size: 3rem;
    }

    input {
        width: 20rem;
        font-size: 2rem;
    }

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
        &.deactive {
            background: ${colors.deactive};
            cursor: blocked;
        }
    }
`;
