import { useState, useContext, useEffect } from 'react'
import { Route, Routes, Link, BrowserRouter, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import authContext from '../contexts/authContext'
import ClientProfile from "../pages/clientProfile"
import ArtisanProfile from "../pages/artisanProfile"



function Profile() {
  const [count, setCount] = useState(0)
  const {role, isAuthenticated} = useContext(authContext)
  const navigate = useNavigate()

  const checkIsAuth = () =>{
    if(!isAuthenticated){
      navigate("/login")
    }
  }
  useEffect(()=>{
     checkIsAuth()
  },[])
 

  const goToLogin = ()=>{
    navigate('/login')
  }
 
  return (
    <>
      {
      // console.log(role)
      // the contexts gets forgotten when the page is refreshed so use localStorage or sessionStorage
        (role === 'Client') ? <ClientProfile/> : (role === 'Artisan') ?  <ArtisanProfile/> : goToLogin()
      } 
    </>
  )
}

export default Profile
