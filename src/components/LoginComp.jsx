import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import React, { useContext,useEffect,useState } from 'react'
import {AuthContext} from '../context/AuthContext'
import {useNavigate} from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import { login } from '../api/request'
import { SpinnerComp } from './SpinnerComp'


export const LoginComp = () => {
  const { setCurrentUser, currentUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data: token } = await login(email, password);
      const decoded = jwtDecode(token);
      setLoading(false);
      localStorage.setItem("token", token);
      setCurrentUser(decoded);
      window.location="/dashboard"
    } catch (error) {
      setLoading(false);
      alert(error.response.data);
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser, navigate]);
  return (
<FormControl>
    <Box>
  <FormLabel>Email address</FormLabel>
  <Input type='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
    </Box>
    <Box mt={4}>
  <FormLabel>Password</FormLabel>
  <Input type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
    </Box>
    <Button bg={'#00B8F5'} color='white' onClick={handleLogin} mt={4} width={'100%'}>{loading?<SpinnerComp color='white' size={'sm'}/>:"Login"}</Button>
</FormControl>
  )
}
