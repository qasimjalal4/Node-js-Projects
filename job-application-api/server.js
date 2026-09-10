import express from 'express'
import { jobs, applications } from './data/data'

const app = express()
const PORT = 3000

app.use(express.json())

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


app.post('/api/jobs', (req, res) => {

  const { company, position, available } = req.body

  
  if (!company || !company.trim()) {
    return res.status(400).json({
      success: false,
      message: "Company is required"
    })
  }

  if (!position || !position.trim()) {
    return res.status(400).json({
      success: false,
      message: "Position is required"
    })
  }

  const newJob = {
    id: jobs.length > 0 ? Math.max(...jobs.map(job => job.id)) + 1 : 1,
    company,
    position,
    available
  }


  jobs.push(newJob)

  res.status(201).json({
    success: true,
    data: jobs
  })
})


app.patch('/api/jobs/:id', (req, res) => {

  const id = Number(req.params.id)

  const job = jobs.find(job => job.id === id)

  if(!job) {
    res.status(404).json({
      success: false,
      message: 'Job not found!'
    })
  }

  const { company, position, available} = req.body

  if(company !== undefined) {
    if(!company.trim()) {
      res.status(400).json({
        success: false,
        message: 'Company cannot be empty!'
      })
    }

    job.company = company.trim()

  }

  if(position !== undefined) {
    if(!position.trim()) {
      res.status(400).json({
        success: false,
        message: 'Position cannot be empty!'
      })
    }

    job.position = position.trim()
  }


  if(available !== undefined) {
    job.available = true
  }


  res.status(200).json({
      success: true,
      data: job
  })


})


app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`)
})