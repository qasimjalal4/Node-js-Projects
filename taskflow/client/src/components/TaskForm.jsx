import { useState } from "react"


const TaskForm = ({onTaskCreated}) => {

   const [title, setTitle] = useState('')
   const [isCreating, setIsCreating] = useState(false)


   async function handleSubmit(event) {

      
      event.preventDefault()

      if(!title.trim()) {
        return
      }
    
    try {
      
      setIsCreating(true)

      await onTaskCreated(title.trim())
       

      setTitle('')  


   } catch(error) {

    console.error(error)
   } finally {

    setIsCreating(false)
   } 
  }

  return (
      <form onSubmit={handleSubmit} 
      className="mb-12 mt-8">
      <input 
       value={title}
       onChange={e => setTitle(e.target.value)}
       placeholder="Enter your task..."
       className="border p-2 mr-4 rounded w-80"
       />  

      <button
      disabled={isCreating}
       type="submit"
       className="bg-blue-600 px-8 py-2 border-none cursor-pointer rounded-md text-white font-semibold
       active:opacity-80 transition-opacity disabled:opacity-50
       "
      >
       {isCreating? 'Adding...' : 'Add'}
      </button> 

     </form>
  )
}

export default TaskForm