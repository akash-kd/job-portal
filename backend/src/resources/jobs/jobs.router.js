import { Router } from 'express'
import { addJob, changeStatus, findJobs, jobsByRecruiter} from './jobs.controller.js'
const JobsRouter = Router()

JobsRouter
    .post('/add', addJob)
    .put('/:id/mark-as-over', changeStatus)
    .get('/get', findJobs)
    .get('/getJobsByRecruiter/:id', jobsByRecruiter)

export default JobsRouter