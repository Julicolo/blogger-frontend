import React from 'react';
import styled from 'styled-components';
import {colors} from '../../utils.js';

export default function Footer() {
    return (
        <React.Fragment>
            <StyledFooter>
                <span>Footer</span>
            </StyledFooter>
        </React.Fragment>
    );
}

export const StyledFooter = styled.footer`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${colors.main};
    padding: 0.5rem 0;
    color: ${colors.white};
`;
