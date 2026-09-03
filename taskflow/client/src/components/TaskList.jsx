import TaskItem from "./TaskItem"

const TaskList = ({tasks, onUpdatedTask, onDeletedTask}) => {

  return (
    <>
      {tasks.map((task) =>

       <TaskItem key={task.id} task={task} onUpdatedTask={onUpdatedTask} onDeletedTask={onDeletedTask} />
      )}
    </>
  )
}

export default TaskList