import React from 'react';
import ReactDOM from 'react-dom';
import Message from './components/Message';
import MessageGroup from './components/MessageGroup';

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

function processMessages(messages: any[]) {
  let buffer, element;
  let current: any[] = [];
  let processed = [];

  for (const message of messages) {
    element = <Message id={message.id} content={message.content} key={message.id as string} />;
    
    if (!buffer?.id || message.author.id === buffer.id) 
        current.push(element);
    else {
        processed.push(
            <MessageGroup author={buffer} key={current[0].props.id + ":" + current.length}>{current}</MessageGroup>
      );
      current = [element];
    }
    buffer = message.author
  }

  processed.push(
    <MessageGroup author={buffer} key={current[0].props.id + ":" + current.length}>{current}</MessageGroup>
  );
  return processed
}

ReactDOM.render(
    <div id='chat'>
        {/* <MessageGroup author={exampleAuthor}>
            <Message id={'12345678'} content='hello' />
        </MessageGroup>
        <MessageGroup author={exampleAuthor2}>
            <Message id={'12345679'} content='hey' />
        </MessageGroup>
        <MessageGroup author={exampleAuthor}>
            <Message id={'12345680'} content={'hello, **pee**\nHow has your day been?'} />
            <Message id={'12345681'} content={'***test***'} />
            <Message id={'23094823908420985425898343433434'} content={'This is a message'} />
            <Message id={'43094823908420985425898343433436'} content={'This is another message'} />
        </MessageGroup> */}
        <div className="chat-messages">
          {processMessages(messages)}
        </div>
    </div>,
    document.getElementById('app'),
);