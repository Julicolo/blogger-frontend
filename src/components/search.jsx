import React from 'react';
import styled from 'styled-components';
import search from '../resources/search.svg';

export default function Search({setSearchInput}) {
    return (
        <SearchBar>
            <img src={search} alt="search icon" />
            <input
                type="text"
                placeholder="Looking for something to read?"
                onChange={e => setSearchInput(e.target.value)}
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
