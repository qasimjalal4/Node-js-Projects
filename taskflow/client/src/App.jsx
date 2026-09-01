import { useState,useEffect } from "react"

function App() {
  

  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {

    fetch('api/tasks')
     .then((response) => {
      return response.json()
     })
     .then((data) => {
      setTasks(data)
     })
  },[])


  
 


  async function handleSubmit(event) {

      
      event.preventDefault()

      if(!title.trim()) {
        return
      }
    
    try {
      
      setIsCreating(true)

      const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title
      })
    })

    if(!response.ok) {
      throw new Error(data.error)
    }

    const data = await response.json()

    setTasks(prev => [...prev, data.task])

     setTitle('')  


   } catch(error) {

    console.error(error)
   } finally {

    setIsCreating(false)
   } 
  }

  

   

  return (
    <div className="min-h-screen p-8 bg-gray-100">
     <h1 className="font-bold text-2xl mb-6">
      TaskFlow
     </h1>
     <form onSubmit={handleSubmit} 
      className="mb-6">
      <input 
       value={title}
       onChange={e => setTitle(e.target.value)}
       placeholder="Enter your task..."
       className="border p-2 mr-4 rounded w-72"
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
     {tasks.map((task) => 
      <div 
       key={task.id}
       className="bg-white shadow mb-4 p-4 rounded">
       <h1
        className="font-semibold"
       >{task.title}</h1>
       <p className="">
        {task.completed ? 'Completed': 'Pending'}</p>
      </div>
     )}
    </div>
  )
}

export default App
