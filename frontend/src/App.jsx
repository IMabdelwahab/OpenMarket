import './App.css'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import { useState } from 'react'
import NotFound from "./pages/NotFound"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ArtisanDirectory from "./pages/ArtisanDirectory"
import Profile from "./pages/Profile"
import ClientProfile from "./pages/clientProfile"
import ArtisanProfile from "./pages/artisanProfile"
import Proposals from "./pages/Proposals"
import CreateRequest from "./pages/CreateRequest"
import authContext from './contexts/authContext'
import userInfos from './contexts/userInfosContext'


function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [accessToken, setAccessToken] = useState(null)
  const [refreshToken, setRefreshToken] = useState(null)
  const [role, setRole] = useState(null)
  const[phoneNumber , setPhoneNumber] = useState()

  const[firstName , setFirstName] = useState()
  const[lastName , setLasttName] = useState()
  
  const[profilePicture , setProfilePicture] = useState()

  return (
    <>
    <BrowserRouter>

    <authContext.Provider value={{isAuthenticated, setIsAuthenticated, accessToken, setAccessToken, refreshToken, setRefreshToken, role, setRole,phoneNumber , setPhoneNumber}}>
    <userInfos.Provider value={{firstName, setFirstName, lastName, setLasttName}}>
    
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/clientProfile" element={<ClientProfile />} />
          <Route path="/artisanProfile" element={<ArtisanProfile />} />
          <Route path="/artisans" element={<ArtisanDirectory />} />
          <Route path="/proposals" element={<Proposals />} />
          <Route path="/publier-une-demande" element={<CreateRequest />} />
        {/* Not Found Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      </userInfos.Provider>
      </authContext.Provider>

    </BrowserRouter>
    </>
  )
}

export default App
