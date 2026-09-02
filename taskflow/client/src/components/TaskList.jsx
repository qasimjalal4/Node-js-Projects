import TaskItem from "./TaskItem"

const TaskList = ({tasks, onUpdatedTask}) => {

  return (
    <>
      {tasks.map((task) =>

       <TaskItem key={task.id} task={task} onUpdatedTask={onUpdatedTask} />
      )}
    </>
  )
}

export default TaskList