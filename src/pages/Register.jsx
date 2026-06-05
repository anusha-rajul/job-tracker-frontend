import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
const Register = () => {
  const navigate = useNavigate()
 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  function handleFormData(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let response =   await fetch(`${import.meta.env.VITE_API_URL}/user/register`, {
      method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(formData)
      })
      let data = await response.json()
      if (data.success) {
   

        setFormData({
          name: '',
          email: '',
          password: ''
        })
        navigate('/')

      } else {
        navigate('/register');
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
<>
 
      <div className="h-screen flex flex-col justify-center items-center gap-10">
      <h1 className="text-2xl font-bold">Register</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full">
        <input onChange={handleFormData} value={formData.name} className="px-4 py-2 border-none bg-zinc-200 rounded-md w-full md:w-1/3" type="text" name="name" placeholder="name" />
        <input onChange={handleFormData} value={formData.email} className="px-4 py-2 border-none bg-zinc-200 rounded-md md:w-1/3" type="email" name="email" placeholder="email" />
        <input onChange={handleFormData} value={formData.password} className="px-4 py-2 border-none bg-zinc-200 rounded-md md:w-1/3" type="password" name="password" placeholder="password" />
        <input className="px-2 py-1 bg-blue-400 text-white rounded-md md:w-1/6" type="submit" value="Register" />
      </form>
      <Link to="/login">Login</Link>
      </div>
</>
  )
}

export default Register
