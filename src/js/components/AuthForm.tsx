import React from 'react';

type P = { children: any[], title: string, button: string, onSubmit(e: any): any };

export default class AuthForm extends React.Component<P, {}> {
    constructor(props: P) {
        super(props);
    }

    render() {
        return (
            <div className='auth-form-container'>
                <div className='auth-form'>
                    <div className='auth-form-contents'>
                        <h1>{this.props.title}</h1>
                        <form className='auth-form-fields'>{this.props.children}</form>
                        <div className='auth-form-submit' onClick={this.props.onSubmit}>{this.props.button}</div>
                    </div>
                </div>
            </div>
        )
    }
}

// Backstory on why this is unnecessarily a class component:
// Was supposed to be a base class to be extended on, then realized that's a crappy design
// Now I cba to change it back