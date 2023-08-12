import mongoose from 'mongoose'

const notesSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
            trim: true,
            maxlength: 500
        },
        emoji: {
            type: String,
            maxlength: 2,
        },
        createdBy:{
            required: true,
            type: String,
        },
    },
    { timestamps: true }
)

export const Notes = mongoose.model('notes', notesSchema)