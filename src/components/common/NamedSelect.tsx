import React from 'react';
import styled from 'styled-components';

const Container = styled.div<{ padding?: string }>`
    display: grid;

    & > div > select {
        border: none;
        border-radius: 6px;
        padding: ${props => props.padding};
        background-color: ${props => props.theme.secondary};
        position: relative;
        -webkit-appearance: none;
        appearance: none;
    }

    & > div {
        position: relative;
        padding: 0;
        width: 100%;
    }

    & > div::after {
        content: "⏷";
        top: 3px;
        right: 14px;
        position: absolute;
        z-index: 1000;
        opacity: 0.4;
    }

    & > div > select option {
        transition: color 0.4s ease;
    }

    & > div > select option:hover {
        background-color: ${props => props.theme.primary};
    }

    & > label {
        margin: 6px 0;
        font-weight: 500;
        font-size: 0.95em;
    }
`;

interface NamedSelectProps {
    name: string;
    label: string;
    padding?: string;
    [key: string]: any;
}

export default function NamedSelect({ name, label, padding = '8px', children, ...props }: SupportsChildren<NamedSelectProps>) {
    return (
        <Container padding={padding}>
            <label htmlFor={name}>{label}</label>
            <div>
                <select name={name} {...props}>{children}</select>
            </div>
        </Container>
    )
}