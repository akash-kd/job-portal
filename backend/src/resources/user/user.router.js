import { Router } from 'express'
import { createUser } from './user.controller.js'
const UserRouter = Router()

UserRouter
    .post('/create', createUser)

export default UserRouter