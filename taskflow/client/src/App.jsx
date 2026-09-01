import { useState,useEffect } from "react"
import { getTasks, createTask } from "./api/taskApi"
import TaskForm from "./components/TaskForm"

function App() {
  

  const [tasks, setTasks] = useState([])
  

  useEffect(() => {

    async function loadTasks() {

      const data = await getTasks()

      setTasks(data)
      
    }

    loadTasks()
     
  }, [])


  async function handleTaskCreated(title) {

    const task = await createTask(title.trim())

      setTasks(prev => [...prev, task])
    
  }
    

  return (
    <div className="min-h-screen p-8 bg-gray-100">
     <h1 className="font-bold text-2xl mb-6">
      TaskFlow
     </h1>
    
     <TaskForm onTaskCreated={handleTaskCreated} />

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
