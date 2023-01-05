import { Avatar, Box, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { getSender } from "../helpers/chatLogics";
import {motion} from 'framer-motion'
import { item } from "../helpers/framerMotion";

export const Chat = ({ chat }) => {
  const { currentUser } = useContext(AuthContext);
  const { setSelectedChat, selectedChat } = useContext(ChatContext);

  let user = chat?.users?.filter((user) => user._id !== currentUser?._id);
  console.log(chat)
  return (
  <motion.div
  variants={item}
  whileTap={{
    scale:.9
  }}
  >
      <Box
      
    id='chat'
      onClick={() => setSelectedChat(chat)}
      key={chat._id}
      display={"flex"}
      alignItems="center"
      columnGap={2}
      cursor="pointer"
      _hover={{
        bg: "#00b8f5",
        color: "white",
      }}
      mb={2}
      bg={`${selectedChat?._id === chat?._id ?"#00b8f5": "gray.200"}`}
      p={3}
      color={`${selectedChat?._id === chat?._id ?"white": "black"}`}
      borderRadius={7}
    >
      <Avatar
        alt={user[0]?.name}
        src={user[0]?.pic}
        size={"sm"}
        name={user[0]?.name}
      />
      <Text id="chatName">
        {" "}
        {!chat.isGroupChat
          ? getSender(currentUser, chat?.users)
          : chat?.chatName}
      </Text>
    </Box>
  </motion.div>
  );
};
