import React from 'react';
import styled from 'styled-components';

import Submit from '../../components/common/Submit';
import { parseCSSColor } from '../../utils';

const BaseFormContainer = styled.form`
    position: absolute;
    display: flex;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    border-radius: 12px;
    padding: 32px;

    div {
        padding: 4px;
        display: grid;
        flex-direction: column;
    }

    div h2 {
        text-align: center;
        font-weight: 600;
    }

    &::before {
        content: "";
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
        background-color: ${props => parseCSSColor(props.theme.tertiary, 0.7).rgba};
        backdrop-filter: blur(8px) saturate(0.7);  // aware that this does not work
        border-radius: 12px;
        z-index: -1;
    }
`;

const FormItemsContainer = styled.div`
    margin: 6px 0;
`;

const FormMessageContainer = styled.div`
    text-align: center;
    margin: 16px;
    font-size: 0.86em;
    opacity: 0.9;
`;

interface BaseFormProps {
    title: string;
    message?: string | Children;
    submit: string;
    onSubmit: React.FormEventHandler;
}

export default function BaseForm({ title, message, submit, onSubmit, children }: RequiresChildren<BaseFormProps>) {
    return (
        <BaseFormContainer onSubmit={e => {e.preventDefault(); return onSubmit(e)}}>
            <div>
                <h2>{title}</h2>
                <FormItemsContainer>{children}</FormItemsContainer>
                {
                    message &&
                    <FormMessageContainer>{message}</FormMessageContainer>
                }
                <Submit type='submit' value={submit} />
            </div>
        </BaseFormContainer>
    )
}