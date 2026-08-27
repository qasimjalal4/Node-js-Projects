import http from 'http'

const PORT = 3000



const server = http.createServer((req,res) => {

  if(req.method === 'GET' && req.url === '/') {

    res.statusCode = 200
    res.setHeader('Content-Type','text/plain')
    res.end('User Management API')

  } else {

    res.statusCode = 404
    res.setHeader('Content-Type','text/plain')
    res.end('Route not found!')
  }

})



server.listen(PORT, () => {

  console.log(`server running on PORT: ${PORT}`)
})