import { useEffect, useState} from 'react'

export default function Job({ job }) {
    const API_URL = import.meta.env.VITE_API_URL
    const [count, setCount] = useState(0);
    useEffect(() => {
        async function getApplicants() { 
            const response = await fetch(
                `${API_URL}/application/getApplicants/${job._id}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            const data = await response.json()
            setCount(data.length)
        }

        getApplicants()
    }, [])
    return (
        <div className='flex flex-row justify-between border rounded-md w-full h-32 px-10 py-5 my-3'>
            <div className=''>
                <a href={`/applicants/${job._id}`} className='font-semibold text-xl hover:text-sky-500 hover:underline cursor-pointer'>{ job.role}</a>
                <h2 className="my-1">{job.location}</h2>
                <h2 className="my-1">{job.company}</h2>
            </div>
            <div className="flex flex-col justify-center items-center">
                <h2 className="font-semibold text-xl">Applicants</h2>
                <p className="font-bold text-3xl text-green-500">{count}</p>
            </div>
        </div>
    )
}