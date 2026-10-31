import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import { useState } from 'react'
import NotFound from "./pages/NotFound"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ArtisanDirectory from "./pages/ArtisanDirectory"
import ClientProfile from "./pages/clientProfile"
import ArtisanProfile from "./pages/artisanProfile"
import authContext from './contexts/authContext'


function App() {

  const [isauthenticated, setIsAuthenticated] = useState(false)
  const [accessToken, setAccessToken] = useState(null)
  const [refreshToken, setRefreshToken] = useState(null)
  const [role, setRole] = useState(null)


  return (
    <>
    <BrowserRouter>
    <authContext.Provider value={{isauthenticated, setIsAuthenticated, accessToken, setAccessToken, refreshToken, setRefreshToken, role, setRole}}>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<Signup />} />
          <Route path="/artisans" element={<ArtisanDirectory />} />
          <Route path="/clientProfile" element={<ClientProfile />} />
          <Route path="/artisanProfile" element={<ArtisanProfile />} />
        {/* Not Found Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      </authContext.Provider>
    </BrowserRouter>
    </>
  )
}

export default App
