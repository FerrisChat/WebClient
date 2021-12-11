import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import BaseForm from './BaseForm';
import NamedInput from '../../components/common/NamedInput';

export default function LoginForm() {
    const navigate = useNavigate();
    const [ error, setError ] = useState<string>();

    return (
        <BaseForm title='Login to FerrisChat' error={error} message={
            <>Don't have an account? Well too bad</>  // TODO
        } submit='Log In' onSubmit={
            async ({ target }) => {
                // @ts-ignore
                const [ { value: email }, { value: password }, submit ] = target;
                submit.disabled = true;

                try {
                    await window.app.api.login({ email, password })
                }
                catch ({ message }) {
                    setError(message as string);
                    submit.disabled = false;
                    return
                };

                navigate('/home')
            }
        }>
            <NamedInput name='email' type='email' label='Email' placeholder='Email' autoComplete='email' required />
            <NamedInput name='password' type='password' label='Password' placeholder='Password' autoComplete='password' required />
        </BaseForm>
    )
}