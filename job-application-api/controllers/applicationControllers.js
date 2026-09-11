import { jobs, applications } from "../data/data";
import { 
        getApplications as getApplicationsService,
        getApplicationById as getApplicationByIdService,
        createApplication as createApplicationService,
        deleteApplication as deleteApplicationService
      } from "../services/applicationServices";



export const getApplications = (req,res) => {


  const { status, jobId } = req.query

  const result =   getApplicationsService(jobId,status)

  res.status(200).json({
    success: true,
    data: result
  })
}




export const getApplicationById = (req,res) => {

  const id = Number(req.params.id)

 
   try {

    const application =  getApplicationByIdService(id)

    res.status(200).json({
      success: true,
      data: application
    })

   } catch(error) {
    
    res.status(404).json({
      success: false,
      message: error.message
    })

   }

}





export const createApplication = (req, res) => {

  const { jobId, applicantName } = req.body

   
   try {

    const applications = createApplicationService(jobId,applicantName)

    res.status(200).json({
      success: true,
      message: 'Applied successfully'
    })

   } catch(error) {

    res.status(400).json({
      success: false,
      message: error.message
    })
   }

}





export const updateApplication = (req, res) => {
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
}




export const deleteApplication = (req, res) => {
  const id = Number(req.params.id)

  try {

    const applications = deleteApplicationService(id)

    res.status(200).json({
    success: true,
    message: 'Application deleted successfully'
  })


  } catch(error) {

    res.status(404).json({
      success: false,
      message: error.message
    })
  }
}

  