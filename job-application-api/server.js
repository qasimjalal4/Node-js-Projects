import express, { application } from 'express'
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



app.delete('/api/jobs/:id', (req,res) => {

  const id = Number(req.params.id)

  const jobExists = jobs.some(job => job.id === id)

  if(!jobExists) {
    return res.status(404).json({
      success: false,
      message: 'Job not found!'
    })
  }

  const filteredJobs = jobs.filter(job => job.id !== id)

  jobs.length = 0
  jobs.push(...filteredJobs)

  res.status(200).json({
    success: true,
    message: 'Job deleted successfully!'
  })



  /*

  const jobIndex = jobs.findIndex(job => job.id === id)

  if (jobIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Job not found!'
    })
  }


  jobs.splice(jobIndex, 1)



  */
})



app.get('/api/applications', (req,res) => {

  res.status(200).json({
    success: true,
    data: applications
  })
})


app.get('/api/applications/:id', (req,res) => {

  const id = Number(req.params.id)

  const application = applications.find(application => application.id === id)

  if(!application) {
    return res.status(404).json({
      success: false,
      message: 'Application not found!'
    })
  }

  res.status(200).json({
    success: true,
    data: application
  })
})




app.post('/api/applications', (req, res) => {

  const { jobId, applicantName } = req.body

  if(!applicantName.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Applicant name is required!'
    })
  }

  const job = jobs.find(job => job.id === jobId)

  if(!job) {
    return res.status(404).json({
      success: false,
      message: 'Job not found!'
    })
  }

  if(!job.available) {
    return res.status(409).json({
      success: false,
      message: 'This job is no longer available'
    })
  }

    const alreadyApplied = applications.some(
    application =>
      application.jobId === Number(jobId) &&
      application.applicantName === applicantName.trim()
  )

  if (alreadyApplied) {
    return res.status(409).json({
      success: false,
      message: 'You have already applied to this job!'
    })
  }




  const newApplication = {
    id: applications > 0 ? Math.max(...applications.map(application => application.id)) + 1 : 1,
    jobId,
    applicantName,
    status: 'applied'
  }


  applications.push(application)


  res.status(201).json({
    success: true,
    message: 'Applied successfully!'
  })


})
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`)
})