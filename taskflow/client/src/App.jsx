import { useState,useEffect } from "react"
import { getTasks, createTask } from "./api/taskApi"
import TaskForm from "./components/TaskForm"
import TaskList from "./components/TaskList"

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

     <TaskList tasks={tasks} />
     
     
    </div>
  )
}

export default App
