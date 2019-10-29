import React, {useState} from 'react';
import styled from 'styled-components';
// import {colors} from '../utils.js';
import search from '../resources/search.svg';

export default function Search(props) {
    const [input, setInput] = useState('');

    function handeChange(e) {
        // const url = 'http://localhost/mysql/les4/blog-backend/search.php';
        // if (input !== '') {
        //     fetch(url, {
        //         method: 'POST',
        //         body: JSON.stringify({
        //             input,
        //         })
        //     }).then(() => {
        //         setTitle('');
        //     });
        // }
    }

    return (
        <SearchBar>
            <img src={search} alt="search icon" />
            <input
                type="text"
                name="search"
                placeholder="Looking for something to read?"
                onChange={e => handeChange(e.target.value)}
            />
        </SearchBar>
    );
}

const SearchBar = styled.div`
    position: relative;

    img {
        width: 2rem;
        position: absolute;
        left: -1rem;
    }

    input {
        width: 35rem;
        font-size: 1.2rem;
        padding-left: 1.5rem;
        height: 2rem;
        border: none;
        border-top-right-radius: 1rem;
        border-bottom-right-radius: 1rem;
        outline: none;
    }
`;
