import { useState , useEffect} from "react";



const Notes = ({closeModal, notes, setNotes, applicationId, setIsOpen , selectedNote, handleEditNote}) => {

   
    const [note, setNote] = useState({
        content: ''
    })

    useEffect(() => {
        if (selectedNote) {
            setNote({content: selectedNote.content})
        }
    },[selectedNote])

    async function handleAddNote(e) {
        
        e.preventDefault();
           let response = await fetch(`${import.meta.env.VITE_API_URL}/notes/`, {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            credentials: 'include',
            body: JSON.stringify({...note, applicationId})
        });

        let data = await response.json();

        if (data.success) {
            setNotes([...notes, data.note])
            setNote({ content: '' })
            setIsOpen(false)
        }

    }

    function handleOnChange(e) {
        const { name, value } = e.target;
        setNote({
            ...note,
            [name]: value
        })
    }

    function handleCancel() {
        setNote({content: ''})
        closeModal()
    }

  return (
    <div>
          <form onSubmit={handleAddNote} className="flex flex-col gap-5">
              <textarea name="content" onChange={handleOnChange} value={note.content} placeholder="Add a note" className="border p-2"></textarea>
              <div className="flex justify-end gap-6 ">
                {selectedNote ?   <button type="button" className="bg-yellow-200 px-4 py-1 rounded-lg" onClick={()=>{handleEditNote(selectedNote._id, note)}}>Save</button> :   <button className="bg-yellow-200 px-4 py-1 rounded-lg" type="submit">Add</button>}
              <button type="button" className="bg-yellow-200 px-4 py-1 rounded-lg" onClick={handleCancel} > Cancel </button>
              </div>
       </form>
    </div>
  )
}

export default Notes
