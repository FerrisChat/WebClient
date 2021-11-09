import React from 'react';
import { useNavigate } from 'react-router';

import API from '../api/API';
import AuthForm from './AuthForm';
import AuthFormField from './AuthFormField';

export default class RegisterForm extends React.Component<{}, {}> {
    constructor(props: {}) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit() {
        window.startApp();
        window.api = API.fromRegistration({
            // @ts-ignore
            username: document.getElementById('auth-form-field__username')!.value,
            // @ts-ignore
            email: document.getElementById('auth-form-field__email')!.value,
            // @ts-ignore
            password: document.getElementById('auth-form-field__password')!.value,
        });
    }

    render() {
        return (
            <AuthForm title='Register' button='Sign Up' onSubmit={this.onSubmit}>
                <AuthFormField id='username' label='Username' maxLength='32' required />
                <AuthFormField id='email' label='Email' required />
                <AuthFormField id='password' label='Password' type='password' required />
                <div className='auth-switch-type'>
                    Already have an account? <a href='/login'>Login</a>
                </div>
            </AuthForm>
        )
    }
}