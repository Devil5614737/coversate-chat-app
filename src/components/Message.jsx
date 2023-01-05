import { Avatar, Box, Text } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import {motion} from 'framer-motion'

export const Message = ({message}) => {
const{currentUser}=useContext(AuthContext)

  
  return (
  <motion.div
  initial={{opacity:0,y:40 }}
  animate={{  opacity: 1,y:0 }}
  transition={{
    type: "spring",
    stiffness: 260,
    damping: 20
  }}
  
  >
      <Box    display={'flex'} columnGap={2} mb={6} justifyContent={message?.sender?._id===currentUser?._id?"end":"start"}>
            <Avatar
            alt={message?.sender?.name}
            src={message?.sender?.pic}
            alignSelf={'end'} name='username' size={'sm'} />
        <Box  bg='#efefef' p={3} borderRadius={7}>
                <Text>{message?.content}</Text>
                <Text mt={2} fontSize={12}>{formatDistanceToNow(new Date(message?.createdAt),{addSuffix:true})}</Text>
            </Box>
        </Box>
  </motion.div>
  )
}
