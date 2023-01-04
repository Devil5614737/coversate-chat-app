import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { BellIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ChatContext } from "../context/ChatContext";

export const Navbar = ({ btnRef, onOpen }) => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const { notification, setSelectedChat,setNotification } = useContext(ChatContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentUser(null);
    navigate("/");
    localStorage.removeItem("token");
  };

  return (
    <Box paddingY={2} bg="#fff" borderBottom={"1px solid #dbdbdb"}>
      <Container
        maxW={1200}
        display="flex"
        justifyContent={"space-between"}
        alignItems="center"
      >
        <Box display={"flex"} gap={4} alignItems="center">
          <Text cursor={"pointer"} fontWeight={"bold"} textDecoration="none">
            Conversate
          </Text>
          <IconButton
            ref={btnRef}
            onClick={onOpen}
            bg={"blue.400"}
            color="white"
          >
            <MagnifyingGlassIcon width={18} height={18} />
          </IconButton>
        </Box>
        <Box display={"flex"} gap={4}>
          <Menu>
            <MenuButton position={"relative"} as={Button}>
              <BellIcon
                src={currentUser?.pic}
                width={18}
                height={18}
                name={currentUser?.name}
              />
            {notification?.length>0&&
              <Box
              display={"grid"}
              placeContent="center"
              color="white"
              width={4}
              height={4}
              borderRadius={"100%"}
              bg="red"
              position={"absolute"}
              top={-2}
              right={0}
            >
              {notification?.length}
            </Box>}
            </MenuButton>
            <MenuList>
              {notification.length>0? notification?.map((item) => (
                <MenuItem
                  onClick={()=>{
                    setSelectedChat(item.chat)
                    setNotification(notification.filter((n) => n !== item))
                  }}
                  display={"flex"}
                  alignItems="center"
                  key={notification?._id}
                >
                  <Avatar
                    alt={notification?.sender?.name}
                    src={item?.sender?.pic}
                    size={"sm"}
                  />
                  <Text ml={1}>{item?.sender?.name}</Text>
                  <Text marginLeft={3}>{item?.content}</Text>
                </MenuItem>
              )):<MenuItem>You have no new notification</MenuItem>}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button}>
              <Avatar
                src={currentUser?.pic}
                size={"sm"}
                name={currentUser?.name}
              />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Container>
    </Box>
  );
};
