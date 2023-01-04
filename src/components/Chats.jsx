import { Box, Button, GridItem, Text } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { fetchChats } from "../api/request";
import { ChatContext } from "../context/ChatContext";
import { Chat } from "./Chat";

export const Chats = () => {
  const { chats, setChats, setFetchAgain, fetchAgain } =
    useContext(ChatContext);

  const fetchTheChats = async () => {
    try {
      const { data } = await fetchChats();
      setChats(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTheChats();
    return () => setFetchAgain(false);
  }, [fetchAgain]);

  return (
    <GridItem
      className="chats"
      border={"1px solid #dbdbdb"}
      p={2}
      borderRadius={8}
  id='chats'
    >
      <Box
    
        display={"flex"}
        alignItems="center"
        justifyContent={"space-between"}
      >
        <Text fontWeight={"semibold"}>Chats</Text>
      </Box>

      <Box mt={4}>
      
        {chats.length>0?chats?.map((chat) => (
          <Chat key={chat._id} chat={chat} />
        )):<>
        <Text>No Chat Found</Text>
      
        </>}
      </Box>
    </GridItem>
  );
};
