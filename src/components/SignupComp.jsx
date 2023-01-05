import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import jwtDecode from 'jwt-decode';
import React, { useContext, useState } from 'react'
import { signup } from '../api/request';
import { AuthContext } from '../context/AuthContext';
import { useCloudinary } from '../hooks/useCloudinary';
import { SpinnerComp } from './SpinnerComp';

export const SignupComp = () => {
    const {setCurrentUser}=useContext(AuthContext)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState("");
  const {url,loading:imageIsUploading}=useCloudinary(file);
  const[loading,setLoading]=useState(false);



  const handleSignup = async () => {
    setLoading(true)
    try {
      if(url){
      const {data:token}=await signup(name,email,password,url);
        setLoading(false)
        localStorage.setItem('token',token)
        const decoded=jwtDecode(token);
        setCurrentUser(decoded)
        window.location='/dashboard'
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  };




  return (
    <FormControl>
    <Box>
  <FormLabel>Name</FormLabel>
  <Input value={name} onChange={(e)=>setName(e.target.value)} type='text' />
    </Box>
    <Box mt={4}>
  <FormLabel>Email</FormLabel>
  <Input value={email} onChange={(e)=>setEmail(e.target.value)} type='email' />
    </Box>
    <Box mt={4}>
  <FormLabel>Password</FormLabel>
  <Input value={password} onChange={(e)=>setPassword(e.target.value)} type='password' />
    </Box>
    <Box mt={4}>
  <FormLabel>Upload Profile Picture</FormLabel>
  {imageIsUploading&& <SpinnerComp size={'sm'} color={'blue'}/>}
  <Input  onChange={(e)=>setFile(e.target.files[0])} type='file' />
    </Box>
    <Button disabled={!name||!email||!password||!url} bg={'#00B8F5'} color='white' onClick={handleSignup} mt={4} width={'100%'}>{loading?<SpinnerComp color='white' size={'sm'}/>:"Signup"}</Button>
</FormControl>
  )
}
