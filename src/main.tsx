import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/App';

const MESSAGE = 
    "Don't paste anything into this console without knowing "
    + "what you're doing first. Your account could get compromised!";

console.log('%c' + MESSAGE, 'font-size: 24px');

window.app = {};
ReactDOM.render(<App />, document.getElementById('app'));