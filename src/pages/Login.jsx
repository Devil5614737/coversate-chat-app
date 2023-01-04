import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React from 'react'
import { LoginComp } from '../components/LoginComp'
import { SignupComp } from '../components/SignupComp'

function Login() {
  return (
<Box height={'100vh'} width={'100vw'} display='grid' placeContent={'center'}>
<Box width={450} p={3} boxShadow={'3px 3px 60px -34px rgba(0,0,0,0.75)'} borderRadius={8}>
<Tabs >
  <TabList mx={'auto'}  w={'fit-content'}>
    <Tab>Login</Tab>
    <Tab>Signup</Tab>
  </TabList>

  <TabPanels>
    <TabPanel>
    <LoginComp/>
    </TabPanel>
    <TabPanel>
      <SignupComp/>
    </TabPanel>
  </TabPanels>
</Tabs>
</Box>
</Box>
  )
}

export default Login