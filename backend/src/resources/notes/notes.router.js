import { Router } from 'express'
import { addNotes, updateNotes, getOneNotes, getAllNotes} from './notes.controller.js'
const NotesRouter = Router()

NotesRouter
    .post('/add', addNotes)
    .post('/update', updateNotes)
    .post('/get', getOneNotes)
    .post('/all',getAllNotes)

export default NotesRouter