import React from 'react';

type P = { children: any[], title: string, button: string, onSubmit(e: any): any };

export default class AuthForm extends React.Component<P, {}> {
    constructor(props: P) {
        super(props);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    onKeyDown(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            this.props.onSubmit(0)
        }
    }

    render() {
        return (
            <div className='auth-form-container'>
                <div className='auth-form'>
                    <div className='auth-form-contents'>
                        <h1>{this.props.title}</h1>
                        {/* @ts-ignore */}
                        <form className='auth-form-fields' onKeyDown={this.onKeyDown}>{this.props.children}</form>
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