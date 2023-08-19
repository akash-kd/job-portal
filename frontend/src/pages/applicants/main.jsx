import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Applicants() {
    const { jobId } = useParams()
    const API_URL = import.meta.env.VITE_API_URL
    const [data, setData] = useState([])
    useEffect(() => {
        async function getApplicants() {
            const response = await fetch(
                `${API_URL}/application/getApplicants/${jobId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            )
            const data = await response.json()
            const originalData = []
            console.log(data)
            setData(data)
        }

        getApplicants()
    }, [])

    const onAccept = async (userId) => {
        const response = await fetch(`${API_URL}/application/changeStatus`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                jobId: jobId,
                userId: userId,
                status: true
            }),
        })
        const data = await response.json()
        console.log('STATUS',data)
    }

    const onReject = async (userId) => {
        const response = await fetch(`${API_URL}/application/changeStatus`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                jobId: jobId,
                userId: userId,
                status: false,
            }),
        })
        const data = await response.json()
        console.log('STATUS', data)
    }

    return (
        <div className='px-32 py-10'>
            <table className='w-full text-sm text-left text-gray-500 p-10'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 '>
                    <tr>
                        <th scope='col' className='px-6 py-3'>
								Applicant
                        </th>
                        <th scope='col' className='px-6 py-3'>
								Resume
                        </th>
                        <th
                            scope='col'
                            className='px-6 py-3 flex items-center space-x-10'
                        >
								Select or Reject
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data !== null &&
							data.map((item, index) => (
							    <tr className='bg-white border-b' key={index}>
							        <th
							            scope='row'
							            className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'
							        >
							            {item.name}
							        </th>
							        <th
							            scope='row'
							            className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'
							        >
                                        <a href={item.resume} target="_blank" className='hover:text-sky-500 hover:underline cursor-pointer'>Resume</a>
							        </th>
							        <td className='px-6 py-4 flex items-center space-x-10'>
							            <button
							                onClick={() => onAccept(item._id)}
							                className='bg-green-500 py-2 px-5 rounded-md text-white'
							            >
											Accept
							            </button>
							            <p>OR</p>
							            <button
							                onClick={() => onReject(item._id)}
							                className='bg-red-500 py-2 px-5 rounded-md text-white'
							            >
											Reject
							            </button>
							        </td>
							    </tr>
							))}
                </tbody>
            </table>
        </div>
    )
}
