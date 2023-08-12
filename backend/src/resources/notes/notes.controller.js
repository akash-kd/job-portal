import { Notes } from './notes.model.js'

export const addNotes = async (req,res) => {
    if (req.body.createdBy && req.body.content) { 
        const notes = await Notes(req.body)
        try {
            await notes.save()
            res.status(200).send(notes)
        } catch (error) {
            res.status(404).send(error).end()
        }
    }
}

export const getOneNotes = async (req,res) => {
    if (req.body.createdBy && req.body._id) { 
        const notes = await Notes.findOne({ _id: req.body._id })
        try {
            res.status(200).send(notes)
        } catch (error) {
            res.status(404).send(error).end()
        }
    }
}

export const getAllNotes = async (req,res) => {
    if (req.body.createdBy) { 
        const notes = await Notes.find({ createdBy: req.body.createdBy })
        try {
            res.status(200).send(notes)
        } catch (error) {
            res.status(404).send(error).end()
        }
    }
}


export const updateNotes = async (req, res) => {
    if (req.body.createdBy && req.body._id && req.body.content) {
        const notes = await Notes.findByIdAndUpdate({_id:req.body._id}, req.body, { new: true })
        try {
            res.status(200).send(notes)
        } catch (error) {
            res.status(404).send(error).end()
        }
    } else {
        res.status(400).send({
            message: 'Certain Parameter are missing'
        }).end() 
    }
}