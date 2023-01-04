import React, { useContext, useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Button,
  Avatar,
  Box,
  Text,
} from "@chakra-ui/react";
import { ChatContext } from "../context/ChatContext";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { createChat, searchUsers } from "../api/request";
import { User } from "./User";

export const SearchDrawer = ({ isOpen, onClose, btnRef }) => {
  const { setFetchAgain, setSelectedChat, setChats, chats } =
    useContext(ChatContext);
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const { data } = await searchUsers(query);
      setSearchResult(data);
      console.log(searchResult);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setQuery("");
  };

  const handleSelectUser = async (userId) => {
    try {
      const { data } = await createChat(userId);

      if (!chats.find((chat) => chat._id !== data._id))
        setChats([...chats, data]);
      setSelectedChat(data);
    } catch (error) {
      console.log(error);
    }
    onClose();
    setFetchAgain(true);
  };

  return (
    <Drawer
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Search users</DrawerHeader>

        <DrawerBody>
          <Box display={"flex"} columnGap={3}>
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="search users"
            />
            <Button onClick={handleSearch}>
              <MagnifyingGlassIcon width={18} height={18} />
            </Button>
          </Box>

          <Box mt={4}>
            {searchResult?.map((user) => (
              <User key={user?._id} user={user} handleSelectUser={handleSelectUser}/>
            ))}
          </Box>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue">Save</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
