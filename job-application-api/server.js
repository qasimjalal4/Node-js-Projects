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




app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`)
})