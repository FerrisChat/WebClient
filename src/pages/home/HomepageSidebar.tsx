import React from 'react';
import styled from 'styled-components';

const HomepageSidebarContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    margin: 12px;
    font-weight: 700;
    font-size: 1.6em;
    opacity: 0.4;
`;

export default function HomepageSidebar() {
    return (
        <HomepageSidebarContainer>
            Nothing to see here...
        </HomepageSidebarContainer>
    )
}