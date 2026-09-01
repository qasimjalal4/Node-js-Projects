
const TaskItem = ({task}) => {
  
  return (
    <div 
       className="bg-white shadow mb-4 p-4 rounded">
       <h1
        className="font-semibold"
       >{task.title}</h1>
       <p className="">
        {task.completed ? 'Completed': 'Pending'}</p>
      </div>
  )
}

export default TaskItem