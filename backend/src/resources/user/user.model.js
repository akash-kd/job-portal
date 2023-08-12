import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        isRecruiter: {
            type: Boolean,
            required: true,
        },
        createdBy:{
            required: true,
            type: String,
        },
    },
)

export const User = mongoose.model('user', userSchema)