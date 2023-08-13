/* eslint-disable no-undef */
import { Jobs } from './jobs.model.js'

export const addJob = async (req, res) => {
    if (req.body.desc && req.body.requirements && req.body.role && req.body.company && req.body.location && req.body.createdBy) { 
        const job = await Jobs(req.body)
        try {
            await job.save()
            res.status(200).send(job)
        } catch (error) {
            res.status(404).send(error).end()
        }
    } else res.status(422).json({message: 'Missing Data'}).end()
}

export const changeStatus = async (req, res) => {
    try {
        const jobId = req.params.id

        // Find the job by ID
        const job = await Jobs.findById(jobId)
        if (!job) {
            return res.status(404).json({ message: 'Job not found' })
        }

        // Update the job's status to 'over'
        job.status = 'over'
        await job.save()

        res.status(200).json({ message: 'Job status updated to "over"' })
    } catch (error) {
        res.status(500).json({ message: 'Error updating job status', error: error.message })
    }
}

export const findJobs = async (req, res) => { 
    try {
        const createdBy = req.params.id
        const jobs = await Jobs.find({ createdBy: createdBy })
        res.status(200).json(jobs).end()
    } catch (error) {
        res.status(500).json({message: 'Internal Error'})
    }
}