import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import BaseForm from './BaseForm';
import NamedInput from '../../components/common/NamedInput';
import NamedSelect from '../../components/common/NamedSelect';

export default function RegisterForm() {
    const navigate = useNavigate();
    const [ error, setError ] = useState<string>();

    return (
        <BaseForm title='Register Account' error={error} message={
            <span>
                Already have an account? <Link to="/login">Log in</Link>
            </span>
        } submit='Register' onSubmit={
            async ({ target }) => {
                // @ts-ignore
                const [ { value: username }, { value: email }, { value: password }, { value: pronouns }, submit ] = target;
                submit.disabled = true;

                try {
                    await window.app.api.register({ username, email, password, pronouns })
                }
                catch ({ message }) {
                    setError(message as string);
                    submit.disabled = false;
                    return
                };

                navigate('/home')
            }
        }>
            <NamedInput name='username' label='Username' placeholder='Username' autoComplete='username' minLength={1} maxLength={48} required />
            <NamedInput name='email' type='email' label='Email' placeholder='Email' autoComplete='email' required />
            <NamedInput name='password' type='password' label='Password' placeholder='Password' autoComplete='password' required />
            <NamedSelect name='pronouns' label='Preferred Pronouns' required>
                <option label='he/him' value='HeHim' />
                <option label='she/her' value='SheHer' />
                <option label='they/them' value='TheyThem' />
                <option label='it/its' value='ItIts' />

                <option label='he/it' value='HeIt' />
                <option label='he/her' value='HeShe' />
                <option label='he/them' value='HeThey' />
                
                <option label='she/him' value='SheHe' />
                <option label='she/its' value='SheIt' />
                <option label='she/them' value='SheThey' />

                <option label='they/him' value='TheyHe' />
                <option label='they/its' value='TheyIt' />
                <option label='they/her' value='TheyShe' />

                <option label='it/him' value='ItHim' />
                <option label='it/her' value='ItShe' />
                <option label='it/them' value='ItThey' />

                <option label='Any Pronoun' value='Any' />
                <option label='Ask for pronoun' value='OtherAsk' />
                <option label='Avoid pronouns' value='Avoid' />
            </NamedSelect>
        </BaseForm>
    )
}