import React from 'react';
import styled from 'styled-components';

const UserInfoContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 12px;
    background-color: ${props => props.theme.tertiary};
    font-weight: 600;

    img {
        width: 42px;
        border-radius: 50%;
    }

    & > span {
        margin: 0 12px;
        display: grid;
    }

    & > span > span {
        opacity: 0.6;
        font-weight: 400;
        font-size: 0.9em;
    }
`;

export default function UserInfo() {
    const { avatar, name, discriminator } = window.app.api.user!;

    return (
        <UserInfoContainer>
            <img src={avatar as string} />
            <span>
                {name}
                <span>#{discriminator.toString().padStart(4, '0')}</span>
            </span>
        </UserInfoContainer>
    )
}