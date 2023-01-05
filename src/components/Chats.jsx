import { Box, Button, GridItem, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { fetchChats } from "../api/request";
import { ChatContext } from "../context/ChatContext";
import { Chat } from "./Chat";
import { SpinnerComp } from "./SpinnerComp";
import {motion} from 'framer-motion'
import { container } from "../helpers/framerMotion";

export const Chats = () => {
  const { chats, setChats, setFetchAgain, fetchAgain } =
    useContext(ChatContext);
    const[loading,setLoading]=useState(false)

  const fetchTheChats = async () => {
    setLoading(true)
    try {
      const { data } = await fetchChats();
      setLoading(false)
      setChats(data);
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTheChats();
  
  }, []);

  return (
    <GridItem
      className="chats"
      border={"1px solid #dbdbdb"}
      p={2}
      borderRadius={8}
      id="chats"
    >
      <Box
        display={"flex"}
        alignItems="center"
        justifyContent={"space-between"}
      >
        <Text fontWeight={"semibold"}>Chats</Text>
      </Box>
<motion.div style={{marginTop:11}}
   variants={container}
   initial="hidden"
   animate="visible"
>

      
        
        {loading?<SpinnerComp size={'sm'} color='blue'/> : chats.length > 0 ? (
          chats?.map((chat) => <Chat key={chat._id} chat={chat} />)
        ) : (
          <>
            <Text>No Chat Found</Text>
          </>
        )}
    

</motion.div>
    </GridItem>
  );
};
