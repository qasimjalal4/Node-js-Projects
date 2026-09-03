import { useState,useEffect } from "react"
import { getTasks, createTask, updateTask, deleteTask } from "./api/taskApi"
import TaskForm from "./components/TaskForm"
import TaskList from "./components/TaskList"
import Stats from "./components/Stats"
import FilterBar from "./components/FilterBar"


function App() {
   
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')

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


  async function handleDeletedTask(id) {

     await deleteTask(id)

    setTasks(prev => prev.filter(task => task.id !== id))
    
  }


  const total = tasks.length
  const completed = tasks.filter(task => task.completed).length
  const pending = tasks.filter(task => !task.completed).length


  const filteredTasks = tasks.filter((task) => {

    if(filter === 'completed') {
      return task.completed
    }

    if(filter === 'pending') {
      return !task.completed
    }

    return true
  })


  return (
    <div className="min-h-screen py-8 pl-8 pr-96 bg-gray-100">
     <h1 className="font-bold text-2xl mb-6">
      TaskFlow
     </h1>
    
     <Stats total={total} completed={completed} pending={pending} />

     <TaskForm  onTaskCreated={handleTaskCreated}   />

     <FilterBar filter={filter} setFilter={setFilter} />
     
     <TaskList tasks={filteredTasks} onUpdatedTask={handleUpdatedTask} onDeletedTask={handleDeletedTask}  />
     
     
    </div>
  )
}

export default App
