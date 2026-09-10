import express from 'express'
import { jobs, applications } from '../data/data'

const router = express.Router()



router.get('/', (req,res) => {


  const { status, jobId } = req.query

  let result = applications

  if (status === 'applied') {
    result = result.filter(application => application.status === 'applied')
  }

  if (status === 'withdrawn') {
    result = result.filter(application => application.status === 'withdrawn')
  }


  if (jobId) {
    result = result.filter(
      application => application.jobId === Number(jobId)
    )
  }


  res.status(200).json({
    success: true,
    data: result
  })
})





router.get('/:id',  (req,res) => {

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




router.post('/', (req, res) => {

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


  applications.push(newApplication)


  res.status(201).json({
    success: true,
    message: 'Applied successfully!'
  })
})  



  app.patch('/:id', (req, res) => {
  const id = Number(req.params.id)

  const application = applications.find(
    application => application.id === id
  )

  // Application doesn't exist
  if (!application) {
    return res.status(404).json({
      success: false,
      message: 'Application not found!'
    })
  }

  const { status } = req.body

  // Only allow "withdrawn"
  if (status !== 'withdrawn') {
    return res.status(400).json({
      success: false,
      message: 'Invalid status!'
    })
  }

  // Already withdrawn
  if (application.status === 'withdrawn') {
    return res.status(409).json({
      success: false,
      message: 'Application is already withdrawn!'
    })
  }

  // Update status
  application.status = 'withdrawn'

  return res.status(200).json({
    success: true,
    data: application
  })
})


router.delete('/api/applications/:id', (req, res) => {
  const id = Number(req.params.id)

  const applicationIndex = applications.findIndex(
    application => application.id === id
  )

  if (applicationIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Application not found!'
    })
  }

  applications.splice(applicationIndex, 1)

  return res.status(200).json({
    success: true,
    message: 'Application deleted successfully'
  })
})













export default router