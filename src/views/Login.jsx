import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = ({login}) => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const onsubmit = async (e) => {
    e.preventDefault()
    if(!username || !password){
      alert("las credenciales no deben estar vacias")
      return
    }
    const res = await login({username:username, password:password})
    if (res.login === true){
      setUsername("")
      setPassword("")
      navigate("/admin")
    }else{
      alert("credenciales incorrectas")
    }
  }
  return (
    <>
    <form onSubmit={onsubmit}>
      <TextField value={username} onChange={(e)=>setUsername(e.target.value)}></TextField>
      <TextField type='password' value={password} onChange={(e)=>setPassword(e.target.value)}></TextField>
      <Button type='submit'>Login</Button>
    </form>
    </>
  )
}

export default Login