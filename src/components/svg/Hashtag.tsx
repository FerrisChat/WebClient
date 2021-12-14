import React from 'react';
import styled from 'styled-components';

const Container = styled.svg`
    rect {
        fill: ${props => props.theme.text};  
    }
`;

export default function Hashtag() {
    return (
        <Container xmlns="http://www.w3.org/2000/svg" width="16" viewBox="0 0 300 330" fill="none">
            <rect width="36.5935" height="327.113" rx="18.2967" transform="matrix(0.981928 0.189254 -0.159255 0.987237 96.689 0)" />
            <rect y="118.675" width="39.5584" height="300" rx="19.7792" transform="rotate(-90 0 118.675)" />
            <rect y="247.76" width="39.5584" height="300" rx="19.7792" transform="rotate(-90 0 247.76)" />
            <rect width="36.5935" height="327.113" rx="18.2967" transform="matrix(0.981928 0.189254 -0.159255 0.987237 221.932 0.136032)" />
        </Container>
    )
}