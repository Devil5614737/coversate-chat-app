import React, { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';



const PrivateRoute = ({ component: Component}) => {
  const navigate=useNavigate();
  useEffect(()=>{
    const token=localStorage.getItem('token')
    
      if(!token){
        navigate('/')
      }
    
  },[]);

  return (
    <Component/>
  )
}
  
  export default PrivateRoute;