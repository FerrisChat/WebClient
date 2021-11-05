import React from 'react';
import ReactDOM from 'react-dom';
import Message from './components/Message';

const MESSAGE = 
    "Don't paste anything into this console without knowing "
    + "what you're doing first. Your account could get compromised!";

console.log('%c' + MESSAGE, 'font-size:23px;');

// Below are tests/debugging 

const exampleAuthor = {
	name: 'jay3332',
  avatarUrl: 'https://cdn.discordapp.com/avatars/414556245178056706/4420a414ad5831e914ca44bb1266e229.png?size=2048'
}

const exampleAuthor2 = {
	name: 'pee',
  avatarUrl: 'https://cdn.discordapp.com/emojis/596576798351949847.png',
}

ReactDOM.render(
    <div id='chat'>
        <Message id={'12345678'} content='hello' author={exampleAuthor} />
        <Message id={'12345679'} content='hey' author={exampleAuthor2} />
        <Message id={'12345680'} content={'hello, **pee**\nHow has your day been?'} author={exampleAuthor} />
    </div>,
    document.getElementById('app'),
);

/*

import MessageGroup from './components/MessageGroup';
ReactDOM.render(
    <div id='chat'>
        <MessageGroup>
            <Message id={'12345678'} content='hello' author={exampleAuthor} />
            <Message id={'12345679'} content='hey' author={exampleAuthor2} />
            <Message id={'12345680'} content={'hello, **pee**\nHow has your day been?'} author={exampleAuthor} />
        </MessageGroup>
    </div>,
    document.getElementById('app')
)

*/