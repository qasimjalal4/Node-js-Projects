import { jobs, applications } from "../data/data";



export const getApplications = (jobId, status) => {

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

  return result
}




export const getApplicationById = (id) => {

  const application = applications.find(application => application.id === id)

  if(!application) {
    throw new Error('Application not found!')
  }

  return application
}



export const createApplication = (jobId, applicantName) => {

  if(!applicantName.trim()) {
     throw new Error('Applicant name is required!')
  }

  const job = jobs.find(job => job.id === jobId)

  if(!job) {
    throw new Error('Job not found!')
  }


  if(!job.available) {
    throw new Error('This job is no longer available')
  }

    const alreadyApplied = applications.some(
    application =>
      application.jobId === Number(jobId) &&
      application.applicantName === applicantName.trim()
  )

  if (alreadyApplied) {
    throw new Error('You have already applied to this job!')
  }



  const newApplication = {
    id: applications > 0 ? Math.max(...applications.map(application => application.id)) + 1 : 1,
    jobId,
    applicantName,
    status: 'applied'
  }


  applications.push(newApplication)

  return applications

}






export const deleteApplication = (id) => {

  const applicationIndex = applications.findIndex(
    application => application.id === id
  )


   if (applicationIndex === -1) {
     throw new Error('Application not found!')
   }

  applications.splice(applicationIndex, 1) 


  return applications
}