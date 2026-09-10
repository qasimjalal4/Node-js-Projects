import express from 'express'
import { jobs, applications } from './data/data'

const app = express()
const PORT = 3000


app.get('/', (req,res) => {
  res.status(200).json({
    success: true,
    message: 'Job Application API is running!'
  })
})


app.get('/api/jobs', (req,res) => {

  const { available, company } = req.query

  let result = jobs

  if(available === 'true') {
    result =  result.filter(job => job.available === true)
  }

  if(company) {
    result = result.filter(job => job.company === company)
  }

  if(company && available === 'true') {
    result = result.filter(job => job.company === company && job.available === true)
  }


  res.status(200).json({
    success: true,
    data: result
  })
})



app.get('/api/jobs/:id', (req,res) => {

  const id = Number(req.params.id)

  const job = jobs.find(job => job.id === id)

  if(!job) {
    return res.status(404).json({
      success: false,
      message: 'Job not found!'
    })
  }

  res.status(200).json({
    success: true,
    data: job
  })
})




app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`)
})