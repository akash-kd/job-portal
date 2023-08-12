
import { Goal } from './goal.model.js'

export const addGoal = async (req, res) => {
    if (req.body.createdBy && req.body.goal) {
        const goal = new Goal(req.body)
        try {
            await goal.save()
            res.status(200).send(goal)
        } catch (error) {
            res.status(404).send(error).end()
        }
    } else {
        res.status(400).send({
            message: 'Certain Parameter are missing'
        }).end()
    }
}

export const removeGoal = async (req, res) => {
    if (req.body.createdBy && req.body._id) {
        const goal = await Goal.findByIdAndDelete(req.body._id)
        try {
            res.status(200).send(goal)
        } catch (error) {
            res.status(404).send(error).end()
        }
    } else {
        res.status(400).send({
            message: 'Certain Parameter are missing'
        }).end()
    }
}

export const updateGoal = async (req, res) => {
    if (req.body.createdBy && req.body._id && req.body.goal) {
        const goal = await Goal.findByIdAndUpdate({_id:req.body._id}, { goal: req.body.goal }, { new: true })
        try {
            res.status(200).send(goal)
        } catch (error) {
            res.status(404).send(error).end()
        }
    } else {
        res.status(400).send({
            message: 'Certain Parameter are missing'
        }).end() 
    }
}

export const doneGoal = async (req, res) => {
    if (req.body.createdBy && req.body._id) {
        const goal = await Goal.findByIdAndUpdate({ _id: req.body._id }, { done: true }, { new: true })
        try {
            res.status(200).send(goal)
        } catch (error) {
            res.status(404).send(error).end()
        }
    } else {
        res.status(400).send({
            message: 'Certain Parameter are missing'
        }).end()
    }
}

export const allGoals = async (req, res) => {
    if (req.body.createdBy) {
        const goals = Goal.find({createdBy:req.body.createdBy})
        goals
            .then(data => res.status(200).send(data))
            .catch(err => res.status(404).send(err).end())
    } else {
        res.status(400).send({
            message: 'Certain Parameter are missing'
        }).end()
    }
}