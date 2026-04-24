import React, { useState } from 'react'
import '../styles/authenticate.css'
import Login from '../components/Login'
import Register from '../components/Register'
import {useNavigate} from 'react-router-dom'

const Authenticate = () => {

  const [authType, setAuthType] = useState('login');

  const navigate = useNavigate();

  return (

    <div className="AuthenticatePage">

        <div className="auth-navbar">
          <h3 onClick={()=> navigate('/')} >IQbrain</h3>
          <p onClick={()=> navigate('/')} >Home</p>
        </div>

        <div className="auth-header">
          <h1>IQbrain</h1>
          <p>Smart freelancing with glowing green UI and fast auth.</p>
        </div>

        {authType==='login' ?
        <>
            <Login setAuthType={setAuthType} />
        </>
        :
        <>
            <Register setAuthType={setAuthType} />
        </>
        }

    </div>
  )
}

export default Authenticate