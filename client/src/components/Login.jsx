import React, { useContext } from 'react'
import { GeneralContext } from '../context/GeneralContext';

const Login = ({setAuthType}) => {

  const {setEmail, setPassword, login, authError} = useContext(GeneralContext);

  const handleLogin = async (e) =>{
    e.preventDefault();
    await login();
  }

  return (
    <form className="authForm" onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className="form-floating mb-3 authFormInputs">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" 
                onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating mb-3 authFormInputs">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" 
                onChange={(e) => setPassword(e.target.value)} /> 
            <label htmlFor="floatingPassword">Password</label>
        </div>
        {authError && <div className="authError">{authError}</div>}
        <button type="submit" className="authButton">Sign in</button>
        <p>Not registered? <span onClick={()=> setAuthType('register')}>Register</span></p>
    </form>
  )
}

export default Login