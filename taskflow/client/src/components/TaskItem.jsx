import { useState } from "react"
import ConfirmModal from "./ConfirmModal"
 
const TaskItem = ({task, onUpdatedTask, onDeletedTask}) => {

  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(task.title)
  const [isSaving, setIsSaving] = useState(false)
  const [editError, setEditError] = useState(null)

 async function handleToggle() {

    await onUpdatedTask(task.id, {
     completed: !task.completed
    })
  }


  async function handleSave() {

    if(!editedTitle.trim()) return;

   try {
    
    setIsSaving(true)
    setEditError(null)

    await onUpdatedTask(task.id, {
      title: editedTitle.trim()
    })

  } catch(error) {

    setEditError(error.message)

  } finally {
    setIsSaving(false)
  }

    setEditing(false)
    
  }
  
  return (
   <>
    <div 
       className="bg-white shadow mb-5 p-4 rounded flex justify-between items-center">
      <div>  
       {editing ? (
        <> 
        <input
         value={editedTitle}
         onChange={e => setEditedTitle(e.target.value)}
         placeholder="Change your title"
         className="border p-2 rounded mr-4"
        />

         <button
          onClick={handleSave}
          className="bg-green-600 text-white px-3 py-1 rounded ml-2"
        >
          {isSaving ? 'Saving...' : 'Save'}
        </button>

        <button
          onClick={() => {
            setEditedTitle(task.title)
            setEditing(false)
          }}
          className="bg-gray-500 text-white px-3 py-1 rounded ml-2"
        >
          Cancel
        </button>
       </> 
       ) : (
         <h1
        className="font-semibold"
       >{task.title}</h1>
        )}

        {editError && (
        <p className="text-red-500 text-sm mt-2">
         {editError}
         </p>
        )}
       <p>
        {task.completed ? 'Completed': 'Pending'}</p>
       <button
         onClick={handleToggle}
        className={`text-white border-none rounded-md  px-2 py-[6px] text-sm font-semibold mt-3
        ${task.completed ? 'bg-red-600': 'bg-green-600'}`}
        
       >{task.completed ? 'Mark Pending': 'Mark Completed'}</button>
      </div>
      <div className="mr-8">
       <button
        onClick={() => setShowModal(true)}
        className="bg-red-700 px-[10px] py-[6px] text-white border-none rounded-md text-sm font-semibold
        hover:opacity-80 active:opacity-70 transition-opacity
        "
       >Delete</button>  
       <button
        className="bg-black px-[10px] py-[6px] text-white border-none rounded-md text-sm font-semibold
        hover:opacity-80 active:opacity-70 transition-opacity ml-4"
        onClick={() => setEditing(true)}
       >Edit</button>
      </div>  
      </div>
      
    {showModal &&
     <ConfirmModal 
      taskTitle={task.title}
      onCancel={() => setShowModal(false)}
      onConfirm={() => {
        onDeletedTask(task.id)
        setShowModal(false)
      }}
      />
    }  
   
   </>
  )

    
}

export default TaskItem



/* const confirmed = window.confirm('Are u sure , u want to delete this task!')

          if(confirmed) {
          onDeletedTask(task.id)
          }

          */