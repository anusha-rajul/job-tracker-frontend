import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import back from '../images/arrow-left.png'


const Edit = () => {

    const location = useLocation()
    const state = location.state
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        companyName: state?.companyName || '',
    role: state?.role || '',
    salary: state?.salary || '',
    status: state?.status || 'applied',
    appliedDate: state?.appliedDate || '',
    platform: state?.platform || ''
    })

    async function handleUpdate(e) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }


    async function handleUpdateForm(e) {
        e.preventDefault();
        let response = await fetch(`${import.meta.env.VITE_API_URL}/application/updateApp/${state._id}`, {
            method: 'PATCH',
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
    }
  
  return (
    <>
    <button className="flex cursor-pointer" onClick={()=>navigate(-1)}><img src={back} alt='back' /> Back</button>
    
    <div className=" h-screen flex flex-col justify-start items-center gap-10">
      
          <h1>Add Application</h1>
        <form onSubmit={handleUpdateForm} className="flex flex-col gap-4 w-full items-center justify-start ">
            <input onChange={handleUpdate} value={formData.companyName} className="w-1/3 px-4 py-2 rounded-md bg-zinc-100" type="text" name="companyName" placeholder="Company Name" /> 
            <input  onChange={handleUpdate}  value={formData.role} className="w-1/3 px-4 py-2 rounded-md bg-zinc-100" type="text" name="role" placeholder="Role" />  
            <input  onChange={handleUpdate} value={formData.salary} className="w-1/3 px-4 py-2 rounded-md bg-zinc-100" type="number" name="salary" placeholder="Salary" />
            <input  onChange={handleUpdate} value={formData.appliedDate} className="w-1/3 px-4 py-2 rounded-md bg-zinc-100" type="date" name="appliedDate" />
        <select name="status"  onChange={handleUpdate} value={formData.status} className="w-1/3 px-4 py-2 rounded-md bg-zinc-100">
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="rejected">Rejected</option>
          <option value="offer">Offer</option>
        
        </select>
        <input name="platform" onChange={handleUpdate} value={formData.platform} className="w-full md:w-1/3 px-4 py-2 rounded-md bg-zinc-100" placeholder="Add link" />

            <input className="w-1/6 px-4 py-2 rounded-md bg-green-400 text-white" type="submit" value='Create' />
        </form>
      </div>
      </>
  )
}

export default Edit
