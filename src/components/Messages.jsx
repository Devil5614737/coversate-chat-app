
import React from 'react';
import ScrollableFeed from 'react-scrollable-feed'
import { Message } from './Message';

export const Messages = ({messages}) => {






  return (
    <ScrollableFeed  className='messageContainer'>
    {messages?.map(message=>
        <Message key={message._id} message={message} messages={messages}/>
      )}
      
    </ScrollableFeed>
  )
}
