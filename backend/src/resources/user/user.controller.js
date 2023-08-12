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