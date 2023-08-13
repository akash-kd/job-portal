import { User } from './user.model.js'

export const createUser = async (req, res) => {
    if (req.body.createdBy && req.body.isRecruiter != null) { 
        const user = await User(req.body)
        try {
            await user.save()
            res.status(200).send(user)
        } catch (error) {
            res.status(404).send(error).end()
        }
    }
}

export const getUser = async (req, res) => {
    try {
        const userId = req.params.id
        const user = await User.findOne({createdBy: userId})
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: 'Error Bad Formatting', error: error.message })
    }
}