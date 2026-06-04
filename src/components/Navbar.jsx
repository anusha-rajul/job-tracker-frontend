import { useContext, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import menu from '../images/menu-outline.svg'
import cross from '../images/x.png'
import { LoginContextComponent } from '../context/LoginContext'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)

  const {isLoggedIn, setIsLoggedIn} = useContext(LoginContextComponent)
    const navigate = useNavigate();

    async function handleLogout() {
       try {
         let response = await fetch(`${import.meta.env.VITE_API_URL}/user/logout`, {
           credentials:'include'
         });
         let data = await response.json()
           if (data.success) {
             setIsLoggedIn(false)
             navigate('/login')
         }
       } catch (error) {
         console.log(error)
       }
  }
  
  function closeMenu() {
    setIsOpen(false)
  }
    
 
    
  return (
      <div className="flex relative gap-2 md:flex justify-between px-10 text-md py-3 items-center bg-white border border-white shadow-md mb-5">
          <ul>
              <li className='font-bold text-lg'>Job Tracker</li>
          </ul>
          <img onClick={()=>setIsOpen(!isOpen)}  className="md:hidden w-6" src={menu} alt="menu" />
      <ul className={isOpen ? 'flex flex-col gap-4 absolute right-10 top-10 bg-zinc-200 p-4 rounded-md z-99' : 'hidden md:flex justify-end items-center gap-20'}>
        {isOpen && (
          <li onClick={closeMenu}><img className='w-6 absolute right-5' src={cross} alt='cross' /></li>
             )} 
              {isLoggedIn? <>
              <li><Link to='/application'>Create application</Link></li></>: ''}
              {isLoggedIn? <li className="px-6 py-2 bg-blue-400 rounded-md cursor-pointer text-white" onClick={handleLogout}>Logout</li> : <li className="px-6 py-2 bg-blue-400 rounded-md"><Link to='/login'>Login</Link></li>}
            
          </ul>
          
    </div>
  )
}

export default Navbar
