import React from 'react';
import styled from 'styled-components';

const Container = styled.div<{ padding?: string }>`
    display: grid;

    & > input {
        border: none;
        border-radius: 6px;
        padding: ${props => props.padding};
        background-color: ${props => props.theme.secondary};
    }

    & > label {
        margin: 6px 2px;
    }
`;

interface NamedInputProps {
    name: string;
    label: string;
    padding?: string;
    [key: string]: any;
}

export default function NamedInput({ name, label, padding = '8px', ...props }: NamedInputProps) {
    return (
        <Container padding={padding}>
            <label htmlFor={name}>{label}</label>
            <input name={name} {...props} />
        </Container>
    )
}