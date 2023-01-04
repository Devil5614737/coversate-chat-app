import { Container, Grid, useDisclosure } from "@chakra-ui/react";
import React, { useContext, useEffect, useRef } from "react";
import { Chats } from "../components/Chats";
import { MessageBox } from "../components/MessageBox";
import { Navbar } from "../components/Navbar";
import { SearchDrawer } from "../components/SearchDrawer";
import { ChatContext } from "../context/ChatContext";

function Dashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const{selectedChat}=useContext(ChatContext)

  useEffect(() => {
    console.log("this is dashboard");
  }, []);

  return (
    <>
      <Navbar onOpen={onOpen} btnRef={btnRef} />

      <main style={{ marginTop: 12 }}>
        <Container maxW={1200} >
          <Grid w={"100%"}  templateColumns="repeat(4, 1fr)" gap={2}>
            <Chats />
            {selectedChat&&
            <MessageBox />
            }
          </Grid>
        </Container>
      </main>
      <SearchDrawer isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
    </>
  );
}

export default Dashboard;
