import { useState,useEffect } from "react"
import { getTasks, createTask, updateTask } from "./api/taskApi"
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
  
  

  async function handleUpdatedTask(id,updates) {

   const updatedTask = await updateTask(id, updates)

   setTasks((prevTasks) => prevTasks.map(prevTask => prevTask.id === updatedTask.id ? updatedTask: prevTask))
    
  }

  return (
    <div className="min-h-screen py-8 pl-8 pr-40 bg-gray-100">
     <h1 className="font-bold text-2xl mb-6">
      TaskFlow
     </h1>
    
     <TaskForm  onTaskCreated={handleTaskCreated}   />

     <TaskList tasks={tasks} onUpdatedTask={handleUpdatedTask}  />
     
     
    </div>
  )
}

export default App
