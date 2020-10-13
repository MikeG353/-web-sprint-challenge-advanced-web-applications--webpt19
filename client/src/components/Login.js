import React, { useState } from "react";
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { baseURL } from '../api/axiosWithAuth'

const Login = () => {
  const initialCredentials = {
    username: "",
    password: ""
  }
  const [credentials, setCredentials] = useState(initialCredentials)
  const { push}  = useHistory()
  const handleChanges = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }
  const login = (e) => {
    e.preventDefault()
    axios
      .post(`${baseURL}/login`, credentials)
      .then(res => {
        localStorage.setItem('token', res.data.payload)
        push('/protected')
      })
      .catch(err => {
        console.error('unable to login. error: '. err)
      })
  }
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
    <form onSubmit={login}>
      <input 
        type="text"
        name="username"
        value={credentials.username}
        onChange={handleChanges}
      />
      <input 
        type="password"
        name="password"
        value={credentials.password}
        onChange={handleChanges}
      />
      <button>Log In</button>
    </form>
    </>
  );
};

export default Login;
