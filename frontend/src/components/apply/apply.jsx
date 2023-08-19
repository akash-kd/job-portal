import { getAuth } from 'firebase/auth';
import {useState, useEffect} from 'react';

export default function Apply({ job, apply }) {
    const API_URL = import.meta.env.VITE_API_URL
    const [application, setApplication] = useState(null)
    const user = JSON.parse(localStorage.getItem('user'))
    const onApply = () => {
        fetch(`${API_URL}/application/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                applicationForJob: job._id,
                createdBy: getAuth().currentUser.uid,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data && data.message) alert(data.message)
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        if (apply == false) {
            fetch(`${API_URL}/application/getApplicationsByJobAndUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    jobId: job._id,
                    userId: user.uid,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    setApplication(data)
                    console.log('APPLication',data)   
                })
                .catch((err) => console.log(err))
        }
    }, [])

    console.log('JOB', job)
    return (
        <div className='flex flex-row justify-between border rounded-md w-full h-32 px-10 py-5 my-3'>
            <div className=''>
                <a className='font-semibold text-xl hover:text-sky-500 hover:underline cursor-pointer'>
                    {job.role}
                </a>
                <h2 className='my-1'>{job.location}</h2>
                <h2 className='my-1'>{job.company}</h2>
            </div>
            {apply && (
                <div className='flex flex-col justify-center items-center'>
                    <button
                        onClick={onApply}
                        className='hover:bg-sky-500 hover:text-white p-2 px-4 rounded-lg hover:font-bold'
                    >
							Apply for this job
                    </button>
                </div>
            )}
            

            {apply == false &&
					application &&
					application.applicationStatus == true && (
                <div className='flex flex-col justify-center items-center'>
                    <h2 className='font-semibold text-xl'>Status</h2>
                    <p className='font-bold text-3xl text-green-500'>Accepted</p>
                </div>
            )}
            {apply == false &&
					application &&
					application.applicationStatus == false && (
                <div className='flex flex-col justify-center items-center'>
                    <h2 className='font-semibold text-xl'>Status</h2>
                    <p className='font-bold text-3xl text-red-500'>Rejected</p>
                </div>
            )}
        </div>
    )
}