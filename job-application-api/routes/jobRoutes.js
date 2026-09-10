import express from 'express'
import { createJob, deleteJob, getJobById, getJobs, updateJob } from '../controllers/jobControllers'

const router = express.Router()




router.get('/', getJobs)

router.get('/:id', getJobById)

router.post('/', createJob)

router.patch('/:id', updateJob)

router.delete('/:id', deleteJob)




export default router