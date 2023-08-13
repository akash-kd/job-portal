import { Router } from 'express'
import { addJob, changeStatus } from './jobs.controller.js'
const JobsRouter = Router()

JobsRouter
    .post('/add', addJob)
    .put('/:id/mark-as-over', changeStatus)

export default JobsRouter