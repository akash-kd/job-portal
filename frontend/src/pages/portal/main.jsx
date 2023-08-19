import Apply from '@components/apply/apply.jsx'
import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export default function JobPortal() {
    const API_URL = import.meta.env.VITE_API_URL
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [applications, setApplications] = useState([])
    useEffect(() => {
        const auth = getAuth()
        const user = auth.currentUser
        if (!user) navigate('/')
        
        async function fetchJobs() {
            const response = await fetch(`${API_URL}/jobs/get`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const status = await response.status
            const data = await response.json()
            console.log('JOBS', status, data)
            setData(data)
        }

        async function getApplication() {
            const response = await fetch(`${API_URL}/application/get`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    createdBy: user.uid
                })
            })

            const status = await response.status
            const data = await response.json()
            setApplications(data)
        }

        if (user && user.email) fetchJobs(), getApplication()
    }, [])
    return (
        <div className='flex flex-col min-h-full min-w-full px-40 py-10'>
            <div className='w-full min-h-10 h-10 flex justify-between items-center px-10 py-5 mb-5'>
                <h2 className='font-bold text-3xl'>Available Jobs</h2>
            </div>
            <div className='flex flex-col'>
                {data.map((job, index) => {
                    return <Apply key={index} job={job} apply={true} />
                })}
            </div>
            <div className='mt-10 w-full min-h-10 h-10 flex justify-between items-center px-10 py-5 mb-5'>
                <h2 className='font-bold text-3xl'>My Applications</h2>
            </div>
            <div className='flex flex-col'>
                {applications.map((job, index) => {
                    return <Apply key={index} job={job} apply={false} />
                })}
            </div>
        </div>
    )
}