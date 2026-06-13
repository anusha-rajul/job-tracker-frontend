import { useEffect } from "react"
import { useState } from "react"
import Notes from "../pages/Notes"
// import { useNavigate } from "react-router-dom"
import noteIcon from '../images/scroll-text.png'
import deleteIcon from '../images/trash.png'
import editIcon from '../images/pencil.png'
import { useDraggable } from "@dnd-kit/react"

const ApplicationCard = ({ application, handleDelete, handleEdit}) => {

  let { ref, isDragging } = useDraggable({
    id: application._id
  })

  const [isOpen, setIsOpen] = useState(false)
  const [notes, setNotes] = useState([])
  const [selectedNote, setSelectedNote] = useState(null)

  function closeModal() {
    setSelectedNote(null)
    setIsOpen(false)
  }
  
  useEffect(() => {
    async function getApplications() {
      let response = await fetch(`${import.meta.env.VITE_API_URL}/notes/getNotes/${application._id}`, {
        credentials: 'include'
      })
      let data = await response.json()
      if (data.success) {
        setNotes(data.notes)
      }
    }
    
    getApplications()
  }, [application._id])
  
  async function handleDeleteNote(id) {
    let response = await fetch(`${import.meta.env.VITE_API_URL}/notes/delete/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    let data = await response.json();
    if (data.success) {
      setNotes(notes.filter(note => note._id !== id))
    }
    else {
      console.log('error')
    }
  }

  async function handleEditNote(id, updatedNote) {
    let response = await fetch(`${import.meta.env.VITE_API_URL}/notes/edit/${id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedNote)
    })
    let data = await response.json();
    if (data.success) {
      setNotes(notes.map((note) => note._id === id ? data.note : note));
      setSelectedNote(null)
      setIsOpen(false)
    }
  }
  



  return (
    <div ref={ref} className={`bg-white rounded-lg border border-white shadow-md py-1 px-3 text-lg mb-4 cursor-grab ${isDragging ? "opacity-50" : ""}`}>
          <div className="flex gap-3 justify-end">
        <button className=" px-3 py-1 cursor-pointer" onClick={() => setIsOpen(true)}><img src={ noteIcon } alt='noteIcon'/></button>
        
                  <button className="px-3 py-1 cursor-pointer" onClick={() => { handleDelete(application._id) }}><img src={ deleteIcon } alt='deleteIcon'/></button>
        <button className="px-3 py-1 cursor-pointer" onClick={() => { handleEdit(application._id) }}><img src={ editIcon } alt='editIcon'/></button>
       
      </div>
                  <h2 className="font-bold">Company: {application.companyName}</h2>
                  <p>Role: {application.role}</p>
                  <p>Salary: {application.salary}</p>
      <a href={application.platform} target="_blank" className="underline underline-offset-2">Link</a>
      <p>Applied Date: {new Date(application.appliedDate).toLocaleDateString()} </p>
              

      {isOpen && (
        <div className="absolute right-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-white border border-white shadow-lg w-3/4 md:w-2/5 lg:w-1/4 p-5 rounded-lg">
          <Notes notes={notes} setNotes={setNotes} handleEditNote={handleEditNote} closeModal={closeModal} applicationId={application._id} setIsOpen={setIsOpen} selectedNote={selectedNote} setSelectedNote={setSelectedNote} />
        </div>
      )}
      <p className="font-bold">Your notes: </p>
      {notes.map((note) => {
        return <div key={note._id} className="bg-yellow-200 rounded-md p-2 mb-5 flex flex-col gap-3">
          <p>{note.content}</p>
          <div className="flex gap-3 justify-end">
            <button className="cursor-pointer" onClick={() => handleDeleteNote(note._id)}><img className="w-5" src={ deleteIcon } alt='deleteIcon'/></button>
            <button className="cursor-pointer" onClick={()=>{  setIsOpen(true); setSelectedNote(note)}}  ><img className="w-5" src={ editIcon } alt='editIcon'/></button>
          </div>
        </div>
      })}
                </div>
  )
}

export default ApplicationCard
