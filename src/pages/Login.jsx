import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"

const Login = () => {
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  
  function handleFormData(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  async function handleSubmit(e) {
    
      try {
          e.preventDefault();
    let response = await fetch('http://localhost:3000/user/login', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(formData)
    })
        let data = await response.json()

        if (data.success) {
          setFormData({
            email: '',
            password: ''
          })
          navigate('/dashboard')
        } else {
          navigate('/login')
          setMessage(data.message) 
        }
      } catch (error) {
        console.log(error)
      }
  }

  return (
    
    <div className="h-screen flex flex-col justify-center items-center gap-10">
      {message ? <h1>{message}</h1> :''}
      <h1 className="text-2xl font-bold">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full">
        <input onChange={handleFormData} value={formData.email} className="px-4 py-2 border-none bg-zinc-200 rounded-md md:w-1/3" type="email" name="email" placeholder="email" />
        <input onChange={handleFormData} value={formData.password} className="px-4 py-2 border-none bg-zinc-200 rounded-md md:w-1/3" type="password" name="password" placeholder="password" />
        <input className="px-2 py-1 bg-blue-400 text-white rounded-md md:w-1/6" type="submit" value="Login" />
          </form>
          <Link to='/register'>Register</Link>
      </div>
  )
}

export default Login
