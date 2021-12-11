import React from 'react';
import styled from 'styled-components';

import icon from '../../assets/branding/ferrischat_icon.png';

type P = { height?: number, absolute?: boolean };

const Container = styled.div<Required<P>>`
    padding: 24px;
    display: flex;
    align-items: center;
    position: ${props => props.absolute && 'absolute'};
    cursor: default;

    img {
        width: ${props => props.height}px;
        height: ${props => props.height}px;
        border-radius: 35vw;
        transition: box-shadow 3s ease;
        user-select: none;

        &:hover {
            box-shadow: 0 0 24px white;
        }
    }

    span {
        font-weight: 700;
        font-size: ${props => props.height * 0.6}px;
        opacity: 0.9;
        margin-left: 12px;
    }
`;

export default function FerrisChatLogo({ height = 48, absolute = false }: P) {
    return (
        <Container className="ferris-chat-branding-logo unselectable" height={height} absolute={absolute}>
            <img src={icon} alt="FerrisChat" />
            <span>FerrisChat</span>
        </Container>
    )
}