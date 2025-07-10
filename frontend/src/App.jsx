import { Route, Routes, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Layout from "./components/Layout"
import WatchVideo from "./pages/WatchVideo"
import ChannelPage from "./pages/ChannelPage"
import CreateChannelPage from "./pages/CreateChannelPage"
import UploadVideo from "./pages/uploadVideo"
import EditVideo from "./pages/EditVideo"
import PublicChannelPage from "./pages/PublicChannelPage"



function App() {
 

  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/login" />} /> */} 
        <Route path="/" element={ <Layout><Home/></Layout>}/>
        <Route path="/upload" element={<Layout><UploadVideo/></Layout>}/>
        <Route path="/channel" element={<Layout><ChannelPage/></Layout>}/>
        <Route path="/create-channel" element={<Layout><CreateChannelPage /></Layout>} />
        <Route path="/channel/:id" element={<Layout><PublicChannelPage/></Layout>}/>
        <Route path="/edit-video/:id" element={<EditVideo/>}/>
        <Route path="/watch/:id" element={<Layout><WatchVideo/></Layout>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
