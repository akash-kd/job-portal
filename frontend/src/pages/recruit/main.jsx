/* eslint-disable react-hooks/exhaustive-deps */
import { getAuth } from 'firebase/auth';
import { useEffect } from 'react';
import Job from '@components/job/job.jsx';
import { useNavigate } from 'react-router-dom';

export default function Recruit() {
    const API_URL = import.meta.env.VITE_API_URL
    const user = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate();

    useEffect(() => {

        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) navigate('/')
        


        async function fetchJobs(){ 
            const response = await fetch(`${API_URL}/jobs/get/${user.uid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const status = await response.status;
            const data = await response.json();
            console.log(status, data)
        }


        if(user && user.email) fetchJobs();
        
    },[])

    return (
        <div className='flex flex-col min-h-full min-w-full px-40 py-10'>
            <div className='w-full min-h-10 h-10 flex justify-between items-center px-10 py-5 mb-5'>
                <h2 className='font-bold text-3xl'>Created Jobs</h2>
                <a
                    href='/recruit/add'
                    className='text-white bg-sky-500 hover:bg-sky-700 focus:ring-2 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:shadow-md'
                >
						Add Job
                </a>
            </div>
            <div className='grid grid-cols-2 gap-5'>
                <Job />
                <Job />
            </div>
        </div>
    )
}