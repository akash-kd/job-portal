import { getAuth } from 'firebase/auth'
import { useState } from 'react'
import { useUserContext } from '../../context/user_context.jsx'


export default function Nav() { 
    const { user, updateUser } = useUserContext()
    const isRecruit = localStorage.getItem('isRecruit')
    console.log(user, isRecruit)

    if (user && user.email) {
        return (
            <div className='w-full min-h-10 flex justify-between px-10 space-x-10 py-5'>
                <div className='font-bold'>
                    App Name
                </div>
                <div className='flex space-x-10'>
                    <a>{user.email}</a>
                    <a
                        onClick={() => {
                            getAuth().signOut()
                            updateUser(null)
                        }}
                    >
                        {' '}
								Logout
                    </a>
                </div>
            </div>
        )
    }
    return (
        <div className='w-full min-h-10 flex justify-between px-10 space-x-10 py-5'>
            <div className='font-bold'>App Name</div>
            <div className='flex space-x-10'>
                <a href='/signin'>Login</a>
                <a href='/signup'>Signup</a>
            </div>
        </div>
    )
}