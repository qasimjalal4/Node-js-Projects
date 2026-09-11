import { jobs } from "../data/data";
import { getJobs as getJobsService,
         getJobById as getJobByIdService,
         createJob as createJobService,
         updateJob as updateJobService,
         deleteJob as deleteJobService
        } from "../services/jobServices";


export const getJobs =  (req,res) => {

  const { available, company } = req.query

  const result = getJobsService( available, company)


  res.status(200).json({
    success: true,
    data: result
  })
}



export const getJobById = (req,res) => {

  const id = Number(req.params.id)

  try {

    const job = getJobByIdService(id)


    res.status(200).json({
      success: true,
      data: job
    })

  } catch(error) {
    res.status(404).json({
      success: false,
      message: error.message
    })
  }
}



export const createJob = (req, res) => {

  const { company, position, available } = req.body

  try {
   
    const jobs = createJobService(company,position,available)

    res.status(201).json({
      success: true,
      data: jobs
    })

  } catch(error) {

     res.status(400).json({
      success: false,
      message: error.message
     }) 
  }  
}





export const updateJob  = (req, res) => {

  const id = Number(req.params.id)

  const job = jobs.find(job => job.id === id)

  const { company, position, available} = req.body

 
  try {

    const job = updateJobService(id, company, position, available)

    res.status(200).json({
      success: true,
      data: job
    })

  } catch(error) {

     res.status(400).json({
      success: false,
      message: error.message
    })
  }

}




export const deleteJob = (req,res) => {

  const id = Number(req.params.id)

  
  try {
    
    const jobs = deleteJobService(id)

    res.status(200).json({
      success: true,
      data: jobs
    })

  } catch(error) {

    res.status(404).json({
      success: false,
      message: error.message
    })
  }


 

   

  



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
}