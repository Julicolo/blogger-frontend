import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {colors} from '../utils.js';

export default function Blacklist(props) {
    const url = 'http://localhost/mysql/les4/blog-backend/blacklist/',
        [ipAdresses, setIpAdressses] = useState([]),
        [adressToBlock, setAdressToBlock] = useState('');

    useEffect(() => {
        fetch(url + 'index.php')
            .then(res => res.json())
            .then(setIpAdressses);
    }, []);

    function addIpAdress() {
        return fetch(url + 'add.php', {
            method: 'POST',
            body: JSON.stringify({
                add: adressToBlock
            })
        })
            .then(res => res.json())
            .then(result => {
                setAdressToBlock('');

                setIpAdressses([result, ...ipAdresses]);
            });
    }

    function removeIpAdress(id) {
        return fetch(url + 'delete.php', {
            method: 'POST',
            body: JSON.stringify({
                delete: id
            })
        }).then(() => {
            setIpAdressses(
                ipAdresses.filter(ipAdress => {
                    return parseInt(ipAdress.id) !== id;
                })
            );
        });
    }

    return (
        <React.Fragment>
            <UserOptions>
                <label htmlFor="ip-adress">IP adress</label>
                <input
                    type="text"
                    name="ip-adress"
                    value={adressToBlock}
                    onChange={e => setAdressToBlock(e.target.value)}
                />
                <button className={adressToBlock === '' ? 'inactive' : undefined} onClick={addIpAdress}>
                    <span role="img" aria-label="cross-emoticon">
                        🙅🏾‍♀
                    </span>
                </button>
            </UserOptions>
            <StyledTable>
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
            cursor: not-allowed;
        }

        span {
            font-size: 5rem;
        }
    }
`;
