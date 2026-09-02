import http from 'http'
import fs from 'fs/promises'
import { fileURLToPath } from 'url';
import path from 'path';
 
 

// "Access-Control-Allow-Origin", "http://localhost:5173"

const PORT = 3000;


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const tasksFilePath = path.join(__dirname,'data','tasks.json')



async function getTasks() {

  const tasks = await fs.readFile(tasksFilePath,'utf-8')
  
  return JSON.parse(tasks)
} 

 
async function saveTasks(tasks) {

  await fs.writeFile(tasksFilePath,JSON.stringify(tasks,null,2))
  
}


const server = http.createServer(async (req,res) => {

  if(req.method === 'GET' && req.url === '/api/tasks') {

   try {

    const tasks = await getTasks()

    res.statusCode = 200
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173")
    res.setHeader('Content-Type','application/json')

    res.end(JSON.stringify(tasks))


     
   } catch (error) {

    console.error(error);

    res.statusCode = 500
    res.setHeader('Content-Type','application/json')
    res.end(JSON.stringify({
      error: 'Failed to read tasks'
    }))
 
   }

    return
  }


  if(req.method === 'POST' && req.url === '/api/tasks') {

    let body = ''

    req.on('data', (chunk) => {
     body += chunk.toString()
    })

    req.on('end', async () => {

      try {

        const newTask = JSON.parse(body)
        const tasks = await getTasks()

        const task = {
          id: tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) + 1 : 1,
          title: newTask.title,
          completed: false
        }

        tasks.push(task)

        await saveTasks(tasks)
        
        res.statusCode = 201
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173")
        res.setHeader('Content-Type','application/json')
        res.end(JSON.stringify({
          message: 'Task created!',
          task: task
        }))

      
      } catch(error) {


      console.error(error);
      
      res.statusCode = 400
      res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173") 
      res.setHeader('Content-Type','application/json')
      res.end(JSON.stringify({
        error: 'Invalid data!'
      }))
      
    
      }  

    })


    return
  }


  if(req.method === 'PATCH' && req.url.startsWith('/api/tasks/')) {

    const id = Number(req.url.split('/')[3])

    if(!Number.isInteger(id)) {

      res.statusCode = 400
      res.setHeader('Content-Type','application/json')
      res.end(JSON.stringify({
        error: 'Invalid task ID'
      }))

      return
    }

    let body = ""

    req.on('data', (chunk) => {

      body += chunk.toString()
    })

    req.on('end', async () => {

      try {

        const updates = JSON.parse(body)

        const tasks = await getTasks()

        const task = tasks.find(task => task.id === id)

        if(!task) {

          res.statusCode = 404
          res.setHeader('Content-Type','application/json')
          res.end(JSON.stringify({
            error: 'Task not found!'
          }))

           return
        }

        if(updates.completed !== undefined) {
          task.completed = updates.completed
        }

        await saveTasks(tasks)

        res.statusCode = 200
        res.setHeader("Content-Type","application/json");
        res.end(JSON.stringify({
          message: 'Task updated!',
          task: task
        }))

        
      } catch(error) {

        console.error(error)

        res.statusCode = 400
        res.setHeader("Content-Type","application/json");
        res.end(JSON.stringify({
          error: "Invalid data",
        }));

      }
    })

    return
  }


})




server.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`)
})



