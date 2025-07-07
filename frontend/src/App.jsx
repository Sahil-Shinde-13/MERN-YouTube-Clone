import { Route, Routes, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Layout from "./components/Layout"



function App() {
 

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/home" element={ <Layout><Home/></Layout>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
