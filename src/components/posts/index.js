import React from 'react';
import styled from 'styled-components';
// import {branch} from 'baobab-react/higher-order';
// import {colors} from '../../css-utils.js';

export default function Posts() {
    return (
        <React.Fragment>
            <StyledPosts>
                <h1>Posts</h1>
            </StyledPosts>
        </React.Fragment>
    );
}

const StyledPosts = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    flex: 1;
    margin: 1rem;
`;
