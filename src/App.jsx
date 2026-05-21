import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './views/Login'
import Profile from './views/Profile'
import ResponsiveAppBar from './components/AppBar'
import { useEffect, useState } from 'react'
import Admin from './views/Admin'

// const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000"
const API_URL = "https://frumen2.up.railway.app"
// const usuarios = [{_id:1, name:"primero"},{_id:2, name:"segundo"}]

function App() {
  const [isLogin, setIsLogin] = useState(false)
  const [token, setToken] = useState("")
  const [user, setUser] = useState({})
  const [users, setUsers] = useState([])
  useEffect(()=>{
    if (isLogin){
      const getUsers = async () =>{
        const res = await fetch(API_URL+"/users",{headers:{authorization:token}})
        const data = await res.json()
        // console.log(data)
        setUsers(data)
      }
      getUsers()
    }
  },[isLogin])
  const login = async (user)=>{
    const res = await fetch(API_URL+"/login/",{
      method:"post",
      headers:{"content-type":"application/json"},
      body:JSON.stringify(user)
    })
    const data = await res.json()
    setIsLogin(data.login)
    setUser(data.user)
    setToken(data.token)
    return data
  }
  const delUser = async (id)=>{
    setUsers(users.filter((u)=>u._id !== id))
    await fetch(API_URL+"/users/"+id,{headers:{authorization:token},method:"delete"})
  }
  const addUser = async (newUser)=>{
    const res = await fetch(API_URL+"/users",{
      method:"post",
      headers:{"content-type":"application/json",authorization:token},
      body:JSON.stringify(newUser)
    })
    const data = await res.json()
    // const data = {user:{_id:4,name:newUser.name}}
    setUsers([...users, data])
  }
  const logout = ()=>{
    setIsLogin(false)
    setUser({})
  }
  return (
    <>
    <BrowserRouter>
    {isLogin && <ResponsiveAppBar logout={logout}/>}
    <Routes>
      <Route path='/' element={<Login login={login} />} />
      <Route path='/profile' element={<Profile user={user} />} />
      <Route path='/admin' element={<Admin addUser={addUser} users={users} delUser={delUser} />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
