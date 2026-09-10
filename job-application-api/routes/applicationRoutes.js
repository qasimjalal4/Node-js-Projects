import express from 'express'
import { createApplication, deleteApplication, getApplicationById, getApplications, updateApplication } from '../controllers/applicationControllers'


const router = express.Router()



router.get('/', getApplications)

router.get('/:id', getApplicationById)

router.post('/', createApplication)  

router.patch('/:id', updateApplication)

router.delete('/:id', deleteApplication)





export default router