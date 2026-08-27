import http from 'http'
import { json } from 'stream/consumers'

const PORT = 3000

const users = [
  {
    id: 1,
    name: 'Ali',
    age: 25
  },
  {
    id: 2,
    name: 'Qasim',
    age: 22
  }
]

const server = http.createServer((req,res) => {

  const parts = req.url.split('/')

  if(req.method === 'GET' && req.url === '/') {

    res.statusCode = 200
    res.setHeader('Content-Type','text/plain')
    res.end('User Management API')

  } else if(req.method === 'GET' && req.url === '/users') {

    res.statusCode = 200
    res.setHeader('Content-Type','application/json')
    res.end(JSON.stringify(users))

  } else if(req.method === 'GET' && parts[1] === 'users' && parts[2]) {
    
    const id = Number(parts[2])

    const user = users.find(user => user.id === id)

    if(!user) {

      res.statusCode = 404
      res.setHeader('Content-Type','text/plain')
      res.end('User not found!')

      return
    }

    res.statusCode = 200
    res.setHeader('Content-Type','application/json')
    res.end(JSON.stringify(user))

 

  } else {

    res.statusCode = 404
    res.setHeader('Content-Type','text/plain')
    res.end('Route not found!')
  }

})



server.listen(PORT, () => {

  console.log(`server running on PORT: ${PORT}`)
})