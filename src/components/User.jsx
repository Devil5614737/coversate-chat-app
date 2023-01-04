import { Avatar, Box, Text } from '@chakra-ui/react'
import React from 'react'

export const User = ({user,handleSelectUser}) => {
  return (
    <Box
                onClick={()=>handleSelectUser(user?._id)}
                key={user?._id}
                display={"flex"}
                alignItems="center"
                columnGap={2}
                cursor="pointer"
                mb={4}
                p={3}
                _hover={{
                  bg: "#00b8f5",
                  color: "white",
                }}
                borderRadius={7}
                bg={"gray.200"}
              >
                <Avatar src={user?.pic} size={"sm"} name={user?.name} />
                <Text>{user?.name}</Text>
              </Box>
  )
}
