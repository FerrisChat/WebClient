import styled from "styled-components";

export type ButtonProps = {
    small?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default styled.button<ButtonProps>`
    border: none;
    border-radius: ${props => props.small ? '4px' : '8px'};
    padding: ${props => props.small ? '8px 12px' : '16px 30px'};
    min-width: 72px;
    font: inherit;
    transition: opacity 0.5s ease;

    &:hover {
        opacity: 0.8;
        cursor: pointer;
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
    }
`;