import express from 'express'

const app = express()
const PORT = 3000


app.get('/', (req,res) => {
  res.status(200).json({
    success: true,
    message: 'Job Application API is running!'
  })
})




app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`)
})