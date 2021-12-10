import React from 'react';

import BaseForm from './BaseForm';
import NamedInput from '../../components/common/NamedInput';

export default function LoginForm() {
    return (
        <BaseForm title='Login to FerrisChat' message={
            <>Don't have an account? Well too bad</>  // TODO
        } submit='Log In' onSubmit={e => {
            console.log('Log in working', e)
        }}>
            <NamedInput name='email' type='email' label='Email' placeholder='Email' autoComplete='email' required />
            <NamedInput name='password' type='password' label='Password' placeholder='Password' autoComplete='password' required />
        </BaseForm>
    )
}