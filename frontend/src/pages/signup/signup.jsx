import { useState, useContext, createContext } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@utils/firebase.js'
import '@/App.css'
import { UserProvider, useUserContext } from '@context/user_context.jsx'
import { useNavigate } from 'react-router-dom'

function SignUp() {
    const [name,setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { user, updateUser } = useUserContext()
    const API_URL = import.meta.env.VITE_API_URL
    const navigate = useNavigate()

    const onSubmit = async (e) => {
        e.preventDefault()


        
        let user;
        await createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // Signed in
                user = userCredential.user
                // store user in local storage
                localStorage.setItem('user', JSON.stringify(user))
                localStorage.setItem('user_id', user.uid)
                updateUser(user)

                const body = {
                    createdBy: user.uid,
                    isRecruiter: false,
                    name: name
                }
                const response = await fetch(`${API_URL}/user/create`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                })
                const status = response.status
                if (status === 200) {
                    const data = await response.json()
                    navigate('/')
                } else if (status === 400) {
                    alert('Bad request')
                } else if (status === 422) {
                    const data = await response.json()
                    alert(data.message)
                } else {
                    alert('Something went wrong')
                }
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                console.log(errorCode, errorMessage)

                if (errorCode === 'auth/email-already-in-use') {
                    alert('Email already in use')
                } else if (errorCode === 'auth/invalid-email') {
                    alert('Invalid email')
                } else if (errorCode === 'auth/weak-password') {
                    alert('Weak password')
                } else {
                    alert(errorMessage)
                }
            })
    }

    return (
        <section className='bg-gray-50'>
            <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
                <a
                    href='#'
                    className='flex items-center mb-6 text-2xl font-semibold text-gray-900'
                >
                    <img
                        className='w-8 h-8 mr-2'
                        src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg'
                        alt='logo'
                    />
						App Name
                </a>
                <div className='w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 '>
                    <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                        <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl'>
								Sign Up to Find Jobs
                        </h1>
                        <form className='space-y-4 md:space-y-6' action='#'>
                            <div>
                                <label
                                    htmlFor='name'
                                    className='block mb-2 text-sm font-medium text-gray-900'
                                >
										name
                                </label>
                                <input
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    type='text'
                                    name='name'
                                    id='name'
                                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                                    placeholder='Name'
                                    required='true'
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor='email'
                                    className='block mb-2 text-sm font-medium text-gray-900'
                                >
										Your email
                                </label>
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    type='email'
                                    name='email'
                                    id='email'
                                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                                    placeholder='name@company.com'
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor='password'
                                    className='block mb-2 text-sm font-medium text-gray-900'
                                >
										Password
                                </label>
                                <input
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    type='password'
                                    name='password'
                                    id='password'
                                    placeholder='••••••••'
                                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                                />
                            </div>
                            <button
                                onClick={onSubmit}
                                type='submit'
                                className='w-full text-white bg-sky-500 hover:bg-sky-700 focus:ring-2 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                            >
									Sign Up
                            </button>
                            <p className='text-sm font-light text-gray-500'>
									Sign Up for recruiter?{' '}
                                <a
                                    href='/signupforrecruiter'
                                    className='font-medium text-sky-600 hover:underline'
                                >
										Sign Up
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignUp
