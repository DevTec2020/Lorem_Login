import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Login } from "../Pages/Login.jsx"
import { Usuarios } from "../Pages/Usuarios.jsx"


function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route index element={<Login/>} />
            <Route path='/usuarios' element={<Usuarios/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
