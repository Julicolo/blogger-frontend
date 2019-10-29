import React, {useState} from 'react';
import styled from 'styled-components';
import {colors} from '../utils.js';
import search from '../resources/search.svg';
import {capitalizeFirstLetter} from '../utils.js';

export default function Search(props) {
    const url = 'http://localhost/mysql/les4/blog-backend/search.php',
        [input, setInput] = useState(''),
        [posts, setPosts] = useState([]);

    function handleChange(event) {
        setInput(event.target.value);

        if (input !== '') {
            fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    input
                })
            })
                .then(res => res.json())
                .then(result => setPosts(result));
        }
    }

    return (
        <React.Fragment>
            <SearchBar>
                <img src={search} alt="search icon" />
                <input
                    type="text"
                    name="search"
                    placeholder="Looking for something to read?"
                    onChange={event => handleChange(event)}
                />
                <ResultsBar display={posts === [] ? 'hidden' : 'flex'}>
                    {posts.map(post => {
                        return (
                            <div className="post" key={post.id}>
                                <h2>{capitalizeFirstLetter(post.post_content.slice(0, 25)) + '...'}</h2>
                                <p>
                                    {post.post_content === ''
                                        ? ''
                                        : capitalizeFirstLetter(post.post_content.slice(0, 50)) + '...'}
                                </p>
                                <h3>{capitalizeFirstLetter(post.author_name)}</h3>
                            </div>
                        );
                    })}
                </ResultsBar>
            </SearchBar>
        </React.Fragment>
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

const ResultsBar = styled.div`
    position: absolute;
    display: ${props => props.display};
    flex-flow: column wrap;
    min-width: 100%;
    background: grey;

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
`;
