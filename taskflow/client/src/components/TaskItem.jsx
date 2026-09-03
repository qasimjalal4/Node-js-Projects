import { useState } from "react"
import ConfirmModal from "./ConfirmModal"
 
const TaskItem = ({task, onUpdatedTask, onDeletedTask}) => {

  const [showModal, setShowModal] = useState(false)

 async function handleToggle() {

    await onUpdatedTask(task.id, {
     completed: !task.completed
    })
  }
  
  return (
   <>
    <div 
       className="bg-white shadow mb-5 p-4 rounded flex justify-between items-center">
      <div>  
       <h1
        className="font-semibold"
       >{task.title}</h1>
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
        className="bg-black px-[10px] py-[6px] text-white border-none rounded-md text-sm font-semibold
        hover:opacity-80 active:opacity-70 transition-opacity
        "
       >Delete</button>  
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