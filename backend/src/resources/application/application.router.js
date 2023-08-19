import { Router } from 'express'
import { addApplication, getJobsByUser, applicantsByJob, changeStatus, getApplicationsByJobAndUser} from './application.controller.js'
const ApplicationRouter = Router()

ApplicationRouter
    .post('/add', addApplication)
    .post('/get', getJobsByUser)
    .get('/getApplicants/:id', applicantsByJob)
    .post('/changeStatus', changeStatus)
    .post('/getApplicationsByJobAndUser',getApplicationsByJobAndUser)

export default ApplicationRouter