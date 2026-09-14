import { useState } from 'react'
import './App.css'
import { Route, Routes, Link, BrowserRouter, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'

import NotFound from "./pages/NotFound"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<div>helllllo there</div>}/>

        {/* Not Found Page */}
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
