import { Router } from 'express'
import { createUser, getUser } from './user.controller.js'
const UserRouter = Router()

UserRouter
    .get('/get/:id', getUser)
    .post('/create', createUser)

export default UserRouter