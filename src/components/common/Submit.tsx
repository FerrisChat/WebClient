import styled from "styled-components";

export default styled.input`
    border: none;
    border-radius: 8px;
    padding: 16px 30px;
    min-width: 72px;
    font: inherit;
    background-color: ${props => props.theme.button.success};
    transition: opacity 0.5s ease;

    &:hover {
        opacity: 0.8;
        cursor: pointer;
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;