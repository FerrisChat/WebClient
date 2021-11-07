import React from 'react';

export default function AuthFormField({ id, label, ...fields }: any) {
    id = 'auth-form-field__' + id;
    
    return (
        <div className='auth-form-field'>
            <label htmlFor={id}>{label}</label>
            <input id={id} {...fields} />
        </div>
    )
}