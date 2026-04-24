import React, { createContext, useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import socketIoClient from 'socket.io-client';

export const GeneralContext = createContext();

const GeneralContextProvider = ({children}) => {

  const WS = 'http://localhost:6001';

  const socket = socketIoClient(WS);


  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usertype, setUsertype] = useState('');
  const [authError, setAuthError] = useState('');
 
  const login = async () =>{
    try{
      if (!email || !password) {
        setAuthError('Please enter both email and password.');
        return;
      }
      setAuthError('');
      const loginInputs = {email, password}
      await axios.post('http://localhost:6001/login', loginInputs)
        .then((res)=>{
          localStorage.setItem('userId', res.data._id);
          localStorage.setItem('usertype', res.data.usertype);
          localStorage.setItem('username', res.data.username);
          localStorage.setItem('email', res.data.email);
          if(res.data.usertype === 'freelancer'){
            navigate('/freelancer');
          } else if(res.data.usertype === 'client'){
            navigate('/client');
          } else if(res.data.usertype === 'admin'){
            navigate('/admin');
          }
        })
        .catch((err) =>{
          const message = err.response?.data?.msg || 'Login failed. Check your credentials.';
          setAuthError(message);
          console.log(err);
        });
    }catch(err){
      const message = err.response?.data?.error || 'Login failed. Please try again.';
      setAuthError(message);
      console.log(err);
    }
  }
      
  const inputs = {username, email, usertype, password};

  const register = async () =>{
    try{
      if (!username || !email || !password || !usertype) {
        setAuthError('Please fill all fields and select a user type.');
        return;
      }
      setAuthError('');
      await axios.post('http://localhost:6001/register', inputs)
        .then((res)=>{
            localStorage.setItem('userId', res.data._id);
            localStorage.setItem('usertype', res.data.usertype);
            localStorage.setItem('username', res.data.username);
            localStorage.setItem('email', res.data.email);
            if(res.data.usertype === 'freelancer'){
              navigate('/freelancer');
            } else if(res.data.usertype === 'client'){
              navigate('/client');
            } else if(res.data.usertype === 'admin'){
              navigate('/admin');
            }
        })
        .catch((err) =>{
            const message = err.response?.data?.msg || err.response?.data?.error || 'Registration failed. Please check your details.';
            setAuthError(message);
            console.log(err);
        });
    }catch(err){
        const message = err.response?.data?.error || 'Registration failed. Please try again.';
        setAuthError(message);
        console.log(err);
    }
  }


  const logout = async () =>{
    
    localStorage.clear();
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        localStorage.removeItem(key);
      }
    }
    
    navigate('/');
  }


  return (
    <GeneralContext.Provider value={{socket, login, register, logout, username, setUsername, email, setEmail, password, setPassword, usertype, setUsertype, authError}} >{children}</GeneralContext.Provider>
  )
}

export default GeneralContextProvider