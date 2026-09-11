import { jobs } from "../data/data";
import NotFoundError from "../errors/NotFoundError"; 
import BadRequestError from "../errors/BadRequestError";



export const getJobs = (available, company) => {

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


  return result
}



export const getJobById = (id) => {

  const job = jobs.find(job => job.id === id)

  if(!job) {
    throw new NotFoundError('Job not found!')
  }

  return job
}








export const createJob = (company, position, available) => {


  if (!company || !company.trim()) {
    throw new BadRequestError("Company is required")
  }

  if (!position || !position.trim()) {
     throw new BadRequestError("Position is required")
  }

  const newJob = {
    id: jobs.length > 0 ? Math.max(...jobs.map(job => job.id)) + 1 : 1,
    company,
    position,
    available
  }


  jobs.push(newJob)


  return jobs
}






export const updateJob = (id, company, position, available) => {

  const job = jobs.find(job => job.id === id)

   if(!job) {
    throw new NotFoundError('Job not found!')
   }

   if (company !== undefined) {
    if (!company.trim()) {
      throw new BadRequestError("Company cannot be empty!")
    }

    job.company = company.trim()
  }

  if (position !== undefined) {
    if (!position.trim()) {
      throw new BadRequestError("Position cannot be empty!")
    }

    job.position = position.trim()
  }

  if (available !== undefined) {
    job.available = available
  }


  return job

}






export const deleteJob = (id) => {

   const jobExists = jobs.some(job => job.id === id)

   if(!jobExists) {
     throw new NotFoundError('Job not found!')
   }

   const filteredJobs = jobs.filter(job => job.id !== id)

   jobs.length = 0
   jobs.push(...filteredJobs)


  return jobs
}