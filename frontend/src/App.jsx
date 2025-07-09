import { Route, Routes, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Layout from "./components/Layout"
import WatchVideo from "./pages/WatchVideo"
import ChannelPage from "./pages/ChannelPage"
import CreateChannelPage from "./pages/CreateChannelPage"



function App() {
 

  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/login" />} /> */}
        <Route path="/" element={ <Layout><Home/></Layout>}/>
        <Route path="/channel" element={<Layout><ChannelPage/></Layout>}/>
        <Route path="/create-channel" element={<Layout><CreateChannelPage /></Layout>} />
        <Route path="/watch/:id" element={<Layout><WatchVideo/></Layout>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
