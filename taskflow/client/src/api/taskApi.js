
export async function getTasks() {

  const response = await fetch("/api/tasks");

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return response.json();

}



export async function createTask(title) {

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

    return data.task
  
}


export async function updateTask(id,updates) {

  const response = await fetch(`/api/tasks/${id}`, {

    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updates)
  })

  const data = await response.json()

  return data.task
  
}