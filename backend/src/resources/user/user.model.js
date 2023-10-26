import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {   
        name: {
            type: String,
            required: true,
        },
        isRecruiter: {
            type: Boolean,
            required: true,
        },
        resume: {
            type: String,
        },
        createdBy:{
            required: true,
            type: String,
        },
    },
)

export const User = mongoose.model('user', userSchema)