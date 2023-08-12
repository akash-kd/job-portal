import mongoose from 'mongoose'

const goalSchema = new mongoose.Schema(
    {
        goal: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200
        },
        done: {
            type: Boolean,
            default: false,
        },
        createdBy:{
            required: true,
            type: String,
        },
    },
    { timestamps: true }
)

export const Goal = mongoose.model('goal', goalSchema)
