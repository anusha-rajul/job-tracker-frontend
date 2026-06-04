import { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom"
import ApplicationCard from "../components/ApplicationCard";
import { toast } from 'react-toastify';
import { DragDropProvider } from '@dnd-kit/react'
import Column from "../components/Column";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Dashboard = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [applications, setApplications] = useState({
    applied: [],
    interview: [],
    rejected: [],
    offer: []
  })

 

  useEffect(() => {
    async function getDashboard() {
       
        let response = await fetch(`${import.meta.env.VITE_API_URL}/user/dashboard`, {
      credentials: 'include'
        });
       
      let data = await response.json()
      
    if (data.success) {
      setUser(data.user)
    } else {
       navigate('/login')
    }
    }
    
    getDashboard()
  }, [])
  
  let sum = 0;

  useEffect(() => {
    async function getApplications() {
      let response = await fetch(`${import.meta.env.VITE_API_URL}/application`, {
        credentials:'include'
      })
      let data = await response.json();
      if (data.success) {
        let groupedApplications = {
          applied: data.applications.filter(app => app.status === 'applied'),
          interview: data.applications.filter(app => app.status === 'interview'),
          rejected: data.applications.filter(app => app.status === 'rejected'),
          offer: data.applications.filter(app => app.status === 'offer'),
          
        }
        setIsLoading(false)
        setApplications(groupedApplications)
      } else {
        setApplications({
          applied: [],
    interview: [],
    rejected: [],
    offer: []
        })
      }
    }
    getApplications()
  }, [])
  
  async function handleDelete(id) {
    let response = await fetch(`${import.meta.env.VITE_API_URL}/application/delete/${id}`, {
      credentials:'include'
    });

    let data = await response.json()
    if (data.success) {
      setApplications({
        applied: applications.applied.filter(app => app._id !== id),
        interview: applications.interview.filter(app => app._id !== id),
        rejected: applications.rejected.filter(app => app._id !== id),
        offer: applications.offer.filter(app => app._id !== id)

      })
      toast.success("Application deleted")
    }
    else {
      toast.error("Application cannot delete")
    }
  }

  async function handleEdit(id) {
    let response = await fetch(`${import.meta.env.VITE_API_URL}/application/update/${id}`, {

      credentials: 'include',
   
    })

    let data = await response.json()
    if (data.success) {
      navigate(`/edit`, {
        state: data.application
      })
    }

  }

  async function handleDragEnd(event) {
    let { source, target } = event.operation;
    if (!target) return;

    let id = source.id;
    let newStatus = target.id;

    let movedApp;

    const updated = { ...applications }
    
    Object.keys(updated).forEach((status) => {
      updated[status] = updated[status].filter((app) => {
        if (app._id === id) {
          movedApp = {
            ...app,
            status: newStatus,
          };
          return false;
        }
        return true;
      })
    })
    if (movedApp) {
      updated[newStatus].push(movedApp);
      setApplications(updated)
      await fetch(`${import.meta.env.VITE_API_URL}/application/status/${id}`, {
        method: "PATCH",
        credentials: 'include',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({status: newStatus})
      })
    }
  }

  sum += applications.applied.length;
  sum += applications.interview.length;
  sum += applications.rejected.length;
  sum += applications.offer.length;

  return (
    <div className="relative">

      
        
      <h1 className="text-center text-2xl font-bold">Welcome, {isLoading? <Skeleton width={100} /> : user?.name}</h1>
      <div className="m-5 ">

        <h2 className="mb-7 text-xl font-semibold">Your Applications: { sum }</h2>
      
     
        <DragDropProvider onDragEnd={handleDragEnd}>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {Object.keys(applications).map((column) => (

            isLoading ? (<div key={column} className="flex flex-col gap-2"><Skeleton height={50} /> <Skeleton height={300}/></div>) : (<Column id={column} key={column}>
              <h1 className="mb-4 font-bold text-lg p-2 capitalize bg-green-300 rounded-md text-center" >{column}</h1>
              {applications[column].map((application) => (

              <ApplicationCard key={application._id} application={application} handleDelete={handleDelete} handleEdit={handleEdit} />
                
              ))}
              </Column>)
          ))}
        </div>
      </DragDropProvider>
        

      </div>
    </div>
  )
}

export default Dashboard
