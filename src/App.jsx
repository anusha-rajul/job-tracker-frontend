import Register from "./pages/Register"
import Login from "./pages/Login"
import {Routes, Route} from 'react-router-dom'
import Navbar from "./components/Navbar"
import Dashboard from "./pages/Dashboard"
import Application from "./pages/Application"
import Edit from "./pages/Edit"
import Notes from "./pages/Notes"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
      <div>
      <Navbar />
      <ToastContainer />
      <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              {/* <Route path="/dashboard" element={<Dashboard />} /> */}
              <Route path="/application" element={<Application />} />
              <Route path="/edit" element={<Edit />} />
              <Route path="/notes" element={<Notes />} />
        </Routes>
    </div>
  )
}

export default App
