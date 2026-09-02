
const TaskItem = ({task, onUpdatedTask}) => {

 async function handleToggle() {

    await onUpdatedTask(task.id, {
     completed: !task.completed
    })
  }
  
  return (
    <div 
       className="bg-white shadow mb-5 p-4 rounded">
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
  )
}

export default TaskItem