import { Application } from './application.model.js'
import { User } from '../user/user.model.js'
import { Jobs } from '../jobs/jobs.model.js'
export const addApplication = async (req, res) => {
    try {
        // add application for the given model
        // return the application id

        if (req.body.applicationForJob && req.body.applicationByUser) {
            const application = new Application({
                applicationForJob: req.body.applicationForJob,
                applicationByUser: req.body.applicationByUser
            })
            const savedApplication = await application.save()
            res.status(200).json(savedApplication)
        }

        if (req.body.createdBy && req.body.applicationForJob) {

            const user = await User.findOne({ createdBy: req.body.createdBy })
            const isApplication = await Application.findOne({
                applicationForJob: req.body.applicationForJob,
                applicationByUser: user._id.toString()
            })
            if (isApplication) {
                res.status(200).json({ message: 'Already applied' })
                return
            }
            const application = new Application({
                applicationForJob: req.body.applicationForJob,
                applicationByUser: user._id.toString(),
            })
            const savedApplication = await application.save()
            res.status(200).json(savedApplication)
        }
    } catch (error) {
        // ...
        res.status(400).json(error)
    }
}

export const getJobsByUser = async (req, res) => {
    try {
        if (req.body.createdBy) {
            const user = await User.findOne({ createdBy: req.body.createdBy })
            const applications = await Application.find({ applicationByUser: user._id.toString() })
            const jobs = await Jobs.find({ _id: { $in: applications.map((application) => application.applicationForJob) } })
            res.status(200).json(jobs)
        }
    } catch (error) {
        res.status(400).json(error)
    }
}

export const applicantsByJob = async (req, res) => {
    try {
        const jobId = req.params.id
        const applications = await Application.find({ applicationForJob: jobId })
        const users = await User.find({ _id: { $in: applications.map((application) => application.applicationByUser) } })
        res.status(200).json(users)

    } catch (error) {
        res.status(400).json(error)
    }
}

export const getApplicationsByJobAndUser = async (req, res) => {
    try {
        const jobId = req.body.jobId
        const userId = req.body.userId
        const user = await User.findOne({ createdBy: userId })
        const application = await Application.findOne({ applicationForJob: jobId, applicationByUser: user._id.toString() })
        res.status(200).json(application)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const changeStatus = async (req, res) => {
    try {
        const jobId = req.body.jobId
        const userId = req.body.userId
        const status = req.body.status
        const application = await Application.findOne({ applicationForJob: jobId, applicationByUser: userId })
        application.applicationStatus = status
        const savedApplication = await application.save()
        res.status(200).json(savedApplication)
    } catch (error) {
        res.status(400).json(error)
    }
}
