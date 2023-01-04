
import React, { useContext, useEffect, useState } from 'react';
import ScrollableFeed from 'react-scrollable-feed'
import { fetchMessasges } from '../api/request';
import { ChatContext } from '../context/ChatContext';
import { Message } from './Message';

export const Messages = ({messages}) => {
  const{selectedChat}=useContext(ChatContext)





  return (
    <ScrollableFeed  className='messageContainer'>
    {messages?.map(message=>
        <Message key={message._id} message={message} messages={messages}/>
      )}
      
    </ScrollableFeed>
  )
}
