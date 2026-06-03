
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import LoginContext from './context/LoginContext.jsx'

createRoot(document.getElementById('root')).render(
  
  <BrowserRouter>
    <LoginContext>
      <App />
      </LoginContext>
    </BrowserRouter>
  
)
