import mongoose from 'mongoose'

const ApplicationSchema = new mongoose.Schema(
    {
        applicationForJob: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'jobs'
        },
        applicationByUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        applicationStatus: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
)

export const Application = mongoose.model('application', ApplicationSchema)