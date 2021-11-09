import React from 'react';
import API from '../api/API';
import AuthForm from './AuthForm';
import AuthFormField from './AuthFormField';

export default class LoginForm extends React.Component<{}, {}> {
    constructor(props: {}) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit() {
        window.startApp();
        window.api = API.fromLogin({
            // @ts-ignore
            email: document.getElementById('auth-form-field__email')!.value,
            // @ts-ignore
            password: document.getElementById('auth-form-field__password')!.value,
        });
    }

    render() {
        return (
            <AuthForm title='Login to FerrisChat' button='Log In' onSubmit={this.onSubmit}>
                <AuthFormField id='email' label='Email' required />
                <AuthFormField id='password' label='Password' type='password' required />
                <div className='auth-switch-type'>
                    Don't have an account? <a href='/register'>Register</a>
                </div>
            </AuthForm>
        )
    }
}