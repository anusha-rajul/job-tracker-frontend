import { useState } from "react"
import { useNavigate } from "react-router-dom";

const Application = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    companyName: '',
    role: '',
    salary: '',
    status: 'applied',
    appliedDate: '',
    platform: ''
  })
  const [message, setMessage] = useState('')

  function handleForm(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let response = await fetch('http://localhost:3000/application/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials:'include',
        body: JSON.stringify(formData)
      })
      let data = await response.json();
      if (data.success) {
        setFormData({
          companyName: '',
          role: '',
          salary: '',
          appliedDate: '',
          status: 'applied',
          platform: ''
        })
        navigate('/dashboard')
      }
      else {
        setMessage(data.message)
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className=" h-screen flex flex-col justify-start items-center gap-10">
      {message?{message}:''}
          <h1>Add Application</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full items-center justify-start ">
            <input onChange={handleForm} value={formData.companyName} className="w-1/3 px-4 py-2 rounded-md bg-zinc-100" type="text" name="companyName" placeholder="Company Name" /> 
            <input onChange={handleForm} value={formData.role} className="w-1/3 px-4 py-2 rounded-md bg-zinc-100" type="text" name="role" placeholder="Role" />  
            <input onChange={handleForm} value={formData.salary} className="w-1/3 px-4 py-2 rounded-md bg-zinc-100" type="number" name="salary" placeholder="Salary" />
            <input onChange={handleForm} value={formData.appliedDate} className="w-1/3 px-4 py-2 rounded-md bg-zinc-100" type="date" name="appliedDate" />
        <select name="status" value={formData.status} onChange={handleForm} className="w-1/3 px-4 py-2 rounded-md bg-zinc-100">
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="rejected">Rejected</option>
          <option value="offer">Offer</option>
        
        </select>
        <select name="platform" value={formData.platform} onChange={handleForm} className="w-1/3 px-4 py-2 rounded-md bg-zinc-100" placeholder="Platform">
          <option value=""></option>
          <option value="linkedIn">LinkedIn</option>
          <option value="naukri">Naukri</option>
          <option value="indeed">Indeed</option>
          <option value="internshala">Internshala</option>
          <option value="other">Other</option>
        </select>
            <input className="w-1/6 px-4 py-2 rounded-md bg-green-400 text-white" type="submit" value='Create' />
        </form>
    </div>
  )
}

export default Application
