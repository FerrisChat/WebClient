import React from 'react';
import ReactDOM from 'react-dom';
import Chat from './components/Chat';
import Login from './components/LoginForm';
import API from './api/API';
import LoginForm from './components/LoginForm';

declare global {
    interface Window { api?: API; }
}

const MESSAGE = 
    "Don't paste anything into this console without knowing "
    + "what you're doing first. Your account could get compromised!";

console.log('%c' + MESSAGE, 'font-size:23px;');

// Below are tests/debugging 

const exampleAuthor = {
  id: '0',
	name: 'jay3332',
  avatarUrl: 'https://cdn.discordapp.com/avatars/414556245178056706/4420a414ad5831e914ca44bb1266e229.png?size=2048'
}

const exampleAuthor2 = {
  id: '1',
	name: 'pee',
  avatarUrl: 'https://cdn.discordapp.com/emojis/596576798351949847.png',
}

const messages = [
  {
    content: "funny i am",
    id: "979783036336131893731250143232",
    author: exampleAuthor
  },
  { 
    content: "wrong you are.",
    id: "979883036336131893731250143232",
    author: exampleAuthor2,
  },
  { 
    content: "*abcd* **efg** ***hijk*** __lmnop__ __**test**__",
    author: exampleAuthor,
    id: "978183036336131893731250143232"
  },
  { 
    content: "message group test",
    author: exampleAuthor,
    id: "980783036336131893731250143232"
  }
]

ReactDOM.render(
    // <Chat channelId="12345" messages={messages} />,
    <LoginForm />,
    document.getElementById('app'),
);