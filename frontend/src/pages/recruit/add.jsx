import { useState } from 'react'
import { getAuth } from 'firebase/auth'
export default function AddJob() {
    const [data, setData] = useState({})
    const user = getAuth().currentUser
    const onSubmit = async (e) => { 
        e.preventDefault()
        data.createdBy = user.uid;
        console.log(data)
        const API_URL = import.meta.env.VITE_API_URL

        const response = await fetch(`${API_URL}/jobs/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        const status = await response.status;
        const returnData = await response.json();

        console.log(status,returnData)

    }
    return (
        <div className='w-1/2 h-full p-10 px-24'>
            <div className='font-bold mb-10 text-3xl'>Create Job</div>
            <form onSubmit={onSubmit}>
                <div className='mb-6'>
                    <label
                        htmlFor='role'
                        className='block mb-2 text-sm font-medium text-gray-900'
                    >
							Role
                    </label>
                    <input
                        onChange={(e) => setData({ ...data, role: e.target.value })}
                        value={data.role}
                        type='text'
                        name='role'
                        className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                        placeholder='Software Developer Engineer'
                        required
                    />
                </div>
                <div className='mb-6'>
                    <label
                        htmlFor='company'
                        className='block mb-2 text-sm font-medium text-gray-900'
                    >
							Company
                    </label>
                    <input
                        onChange={(e) => setData({ ...data, company: e.target.value })}
                        value={data.company}
                        type='text'
                        name='company'
                        className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                        placeholder='Google'
                        required
                    />
                </div>
                <div className='mb-6'>
                    <label
                        htmlFor='location'
                        className='block mb-2 text-sm font-medium text-gray-900'
                    >
							Location
                    </label>
                    <input
                        onChange={(e) => setData({ ...data, location: e.target.value })}
                        value={data.location}
                        type='text'
                        name='location'
                        className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                        placeholder='Bengaluru, Karnataka, India'
                        required
                    />
                </div>
                <div className='mb-6'>
                    <label
                        htmlFor='description'
                        className='block mb-2 text-sm font-medium text-gray-900'
                    >
							Description
                    </label>
                    <textarea
                        onChange={(e) =>
                            setData({ ...data, desc: e.target.value })
                        }
                        value={data.description}
                        name='description'
                        className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                        placeholder='Job Description'
                        required
                    />
                </div>
                <div className='mb-6'>
                    <label
                        htmlFor='requirements'
                        className='block mb-2 text-sm font-medium text-gray-900'
                    >
						Requirments
                    </label>
                    <textarea
                        onChange={(e) => setData({ ...data, requirements: e.target.value })}
                        value={data.requirements}
                        name='requirements'
                        className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                        placeholder='Requirements'
                        required
                    />
                </div>

                <button
                    onSubmit={onSubmit}
                    type='submit'
                    className='text-white bg-sky-500 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center shadow-lg'
                >
						Create Job
                </button>
            </form>
        </div>
    )
}