import React, { useContext } from 'react'

import { GeneralContext } from '../context/GeneralContext';

const Register = ({setAuthType}) => {

  const {setUsername, setEmail, setPassword, setUsertype, register, authError} = useContext(GeneralContext);

  const handleRegister = async (e) =>{
    e.preventDefault();
    await register();
  }

  return (
    <form className="authForm" onSubmit={handleRegister}>
    <h2>Register</h2>
    <div className="form-floating mb-3 authFormInputs">
        <input type="text" className="form-control" id="floatingInput" placeholder="username"
            onChange={(e)=> setUsername(e.target.value)} />
        <label htmlFor="floatingInput">Username</label>
    </div>
    <div className="form-floating mb-3 authFormInputs">
        <input type="email" className="form-control" id="floatingEmail" placeholder="name@example.com"
            onChange={(e)=> setEmail(e.target.value)} />
        <label htmlFor="floatingInput">Email address</label>
    </div>
    <div className="form-floating mb-3 authFormInputs">
        <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
            onChange={(e)=> setPassword(e.target.value)} /> 
        <label htmlFor="floatingPassword">Password</label>
    </div>
    <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" 
        onChange={(e)=> setUsertype(e.target.value)}>
      <option value="">User type</option>
      <option value="freelancer">Freelancer</option>
      <option value="client">Client</option>
      <option value="admin">Admin</option>
    </select>
    {authError && <div className="authError">{authError}</div>}
    <button className="authButton" type="submit">Sign up</button>
    <p>Already registered? <span onClick={()=> setAuthType('login')}>Login</span></p>
</form>
  )
}

export default Register