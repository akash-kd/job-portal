import { Router } from 'express'
import { addGoal,removeGoal, updateGoal,allGoals, doneGoal} from './goal.controller.js'
const goalRouter = Router()

goalRouter
    .post('/add', addGoal)
    .post('/delete', removeGoal)
    .post('/update', updateGoal)
    .post('/all', allGoals)
    .post('/done',doneGoal)

export default goalRouter