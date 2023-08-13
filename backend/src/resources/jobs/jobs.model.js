import mongoose from 'mongoose'

const JobSchema = new mongoose.Schema(
    {
        desc: {
            type: String,
            required: true,
            trim: true,
            maxlength: 1000,
        },
        requirements: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        company: {
            type: String,
            required: true,
        },
        role: { 
            type: String,
            required: true,
        },
        createdBy:{
            required: true,
            type: String,
        },
        status: {
            type: String,
            enum: ['hiring', 'over'],
            default: 'hiring',
        },
        date: {
            type: Date,
            default: Date.now,
        },
        applicants: {
            type: Number,
            default: 0,
        }
    },
    { timestamps: true }
)

export const Jobs = mongoose.model('jobs', JobSchema)