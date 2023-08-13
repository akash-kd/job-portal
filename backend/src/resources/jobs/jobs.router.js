import { Router } from 'express'
import { addJob, changeStatus, findJobs} from './jobs.controller.js'
const JobsRouter = Router()

JobsRouter
    .post('/add', addJob)
    .put('/:id/mark-as-over', changeStatus)
    .get('/get/:id',findJobs)

export default JobsRouter