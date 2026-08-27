import http from 'http'
import { use } from 'react'


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

function validateUser(user) {

  if(!user.name) {
    return 'Name is required!'
  }

  if(!user.age) {
    return 'Age is required!'
  }

  if(typeof user.name !== 'string') {
    return 'Name must be a string type'
  }

  if(typeof user.age !== 'number') {
    return 'Age must be number!'
  }

  if(user.age < 0) {
    return 'Age cant be negative'
  }

  return null
}

 
function validatePatchUser(user) {

  if (user.name !== undefined) {

    if (typeof user.name !== 'string') {
      return 'Name must be a string'
    }

  }

  if (user.age !== undefined) {

    if (typeof user.age !== 'number' || Number.isNaN(user.age)) {
      return 'Age must be a valid number'
    }

    if (user.age < 0) {
      return 'Age cannot be negative'
    }

  }

  return null
}


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

    } else if(req.method === 'POST' && req.url === '/users') {
    

    let body = ''

    req.on('data', (chunk) => {
      body += chunk.toString()
    })

    req.on('end', () => {

      try {

         const user = JSON.parse(body)
         const error = validateUser(user)

         if(error) {

          res.statusCode = 400
          res.setHeader('Content-Type','application/json')
          res.end(JSON.stringify({
            error: error
          }))

          return
         }

         const newId =
          users.length > 0
          ? Math.max(...users.map(user => user.id)) + 1
          : 1

         user.id = newId
         users.push(user)

         res.statusCode = 201
         const response = {
          message: 'User created!',
          user: user
         }

         res.setHeader('Content-Type','application/json')
         res.end(JSON.stringify(response))

      } catch(error) {

        res.statusCode = 400
        res.setHeader('Content-Type','application/json')
        res.end(JSON.stringify({
          error: 'Invalid JSON!'
        }))
      }

    })

    } else if(req.method === 'PUT' && parts[1] === 'users' && parts[2]) {
      
      const id = Number(parts[2])

      const user = users.find(user => user.id === id)

      if(!user) {

        res.statusCode = 404
        res.setHeader('Content-Type','application/json')
        res.end(JSON.stringify({
          error: 'User not found!'
        }))

        return
      }

      let body = ''

      req.on('data', (chunk) => {
        body += chunk.toString()
      })

      req.on('end', () => {

        try {
                 const updatedUser = JSON.parse(body)
        const error = validateUser(updatedUser)

        if(error) {

          res.statusCode = 400
          res.setHeader('Content-Type','application/json')
          res.end(JSON.stringify({
            error: error
          }))

          return
         }

         user.name = updatedUser.name
         user.age = updatedUser.age

         res.statusCode = 200
         const response = {
          message: 'User updated',
          user: user
         }

         res.setHeader('Content-Type','application/json')
         res.end(JSON.stringify(response))
      
        } catch(error) {
           
          
         res.statusCode = 400
         res.setHeader('Content-Type','application/json')
         res.end(JSON.stringify({
           error: 'Invalid JSON!'
         }))
        }

      })


      } else if (req.method === 'PATCH' && parts[1] === 'users' && parts[2]) {

  const id = Number(parts[2])

  const user = users.find(user => user.id === id)

  
  if (!user) {

    res.statusCode = 404
    res.setHeader('Content-Type', 'application/json')

    res.end(JSON.stringify({
      error: 'User not found!'
    }))

    return
  }

  let body = ''

  
  req.on('data', (chunk) => {
    body += chunk.toString()
  })

  req.on('end', () => {

    try {

      const updatedUser = JSON.parse(body)
      const error = validatePatchUser(updatedUser)

      if(error) {

        res.statusCode = 400
        res.setHeader('Content-Type','application/json')
        res.end(JSON.stringify({
          error: error
        }))

        return
      }
  
      if (updatedUser.name !== undefined) {
        user.name = updatedUser.name
      }

      if (updatedUser.age !== undefined) {
        user.age = updatedUser.age
      }

      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')

      res.end(JSON.stringify({
        message: 'User updated!',
        user: user
      }))

    } catch (error) {

      res.statusCode = 400
      res.setHeader('Content-Type', 'application/json')

      res.end(JSON.stringify({
        error: 'Invalid JSON!'
      }))
    }
  })


  } else if (req.method === 'DELETE' && parts[1] === 'users' && parts[2]) {

    const id = Number(parts[2])

    const userExists = users.some(user => user.id === id)

    if (!userExists) {

      res.statusCode = 404
      res.setHeader('Content-Type', 'application/json')

      res.end(JSON.stringify({
        error: 'User not found!'
      }))

      return
    }

    const user = users.find(user => user.id === id)

    const remainingUsers = users.filter(user => user.id !== id)

    users.length = 0
    users.push(...remainingUsers)

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')

    res.end(JSON.stringify({
      message: 'User deleted!',
      user: user
    }))


  } else {

    res.statusCode = 404
    res.setHeader('Content-Type','text/plain')
    res.end('Route not found!')
  }

})



server.listen(PORT, () => {

  console.log(`server running on PORT: ${PORT}`)
})