import { Avatar, Box, Button, GridItem, Input, Text } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client';
import { fetchMessasges, sendTheMessage } from '../api/request';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import {  otherUser } from '../helpers/chatLogics';
import { Messages } from './Messages'
import { SpinnerComp } from './SpinnerComp';



const ENDPOINT='https://chat-app-backend2.onrender.com';

var socket



export const MessageBox = () => {
  const [text, setText] = useState("");
  const{selectedChat,setFetchAgain,setNotification,notification}=useContext(ChatContext);
  const{currentUser}=useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const[loading,setLoading]=useState(false)
  const[isLoading,setIsLoading]=useState(false)
  



  useEffect(()=>{
    socket=io(ENDPOINT);
    socket.emit("setup",currentUser);
  
  });


  const sendMessage = async (e) => {
    e.preventDefault();
    setText("");
    setIsLoading(true)
    try {
      const { data } = await sendTheMessage(text, selectedChat._id);
      setMessages([...messages, data]);
      socket.emit('new message',data)

      setIsLoading(false)
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
    setFetchAgain(true)
  };


  useEffect(()=>{
    socket.on("message recieved",(newMessageRecieved)=>{
      setNotification([...notification,newMessageRecieved])
      setMessages([...messages,newMessageRecieved])
    })
    })






  const fetchMessage=async()=>{
    setLoading(true)
    if(!selectedChat) return 
    try {
      const {data}=await fetchMessasges(selectedChat?._id.toString())
      setLoading(false)
      setMessages(data);
      socket.emit("join chat", selectedChat?._id);
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

useEffect(()=>{
  fetchMessage()
},[selectedChat])



  return (
  <GridItem p={2} className='messageBox' colSpan={3} border={'1px solid #dbdbdb'} borderRadius={8}>
    <Box display='flex' alignItems={'center'} columnGap={2}>
      <Avatar name={otherUser(selectedChat,currentUser)?.name} src={otherUser(selectedChat,currentUser)?.pic} alt={otherUser(selectedChat,currentUser)?.name}/>
      <Text fontWeight={500}>{otherUser(selectedChat,currentUser)?.name}</Text>
    </Box>
    <Box   mt={4} height={420}>
      {loading?<SpinnerComp size={'sm'} color='blue'/>:
    <Messages messages={messages}/>
      }
    </Box>
    <form style={{display:'flex',gap:14,marginTop:18}} onSubmit={sendMessage}>
    <Input  value={text} onChange={(e)=>setText(e.target.value)} placeholder='write a message to username' size='md' />
    <Button bg={'#00B8F5'} color='white' onClick={sendMessage}>{isLoading?<SpinnerComp size={'sm'} color='white'/>:"Send"}</Button>
    </form>
  </GridItem>
  )
}
