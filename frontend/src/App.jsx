import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'

import NotFound from "./pages/NotFound"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ArtisanDirectory from "./pages/ArtisanDirectory"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<Signup />} />
        <Route path="/artisans" element={<ArtisanDirectory />} />

        {/* Not Found Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
