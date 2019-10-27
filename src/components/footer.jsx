import React from 'react';
import styled from 'styled-components';
import {colors} from '../utils.js';
import github from '../resources/github.svg';

export default function Footer() {
    return (
        <React.Fragment>
            <StyledFooter>
                <span>&copy; Julio Schilders</span>
                <a href="https://github.com/Julicolo" target="_blank" rel="noopener noreferrer">
                    <img src={github} alt="github icon" />
                </a>
            </StyledFooter>
        </React.Fragment>
    );
}

const StyledFooter = styled.footer`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${colors.main};
    padding: 0.5rem 0;
    color: white;

    img {
        width: 1.5rem;
        margin: 0 1.5rem;
        background: radial-gradient(#fff 66%, black 70%);
        border-radius: 50%;
    }
`;
