import { useState, useContext } from 'react'
import { signInWithEmailAndPassword, getAuth} from 'firebase/auth'
import { auth } from '@utils/firebase.js'
import { UserProvider, useUserContext } from '@context/user_context.jsx'
import { useNavigate } from 'react-router-dom'

function LoginForRecruiter() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { user, updateUser } = useUserContext()
    const navigate = useNavigate()
    const API_URL = import.meta.env.VITE_API_URL

    const onSubmit = async (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // Signed in
                const user = userCredential.user
                // store user in local storage
                localStorage.setItem('user', JSON.stringify(user))
                localStorage.setItem('user_id', user.uid)
                updateUser(user)

                const response = await fetch(`${API_URL}/user/get/${user.uid}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                const status = response.status
                if (status === 200) {
                    const data = await response.json()
                    if (data === null) alert('User Does not exist')
                    else if (data && data.isRecruiter == false) {
                        alert(
                            'You are a candidate. Please login from candidate login page',
                        )
                        getAuth().signOut()
                    } else {
                        navigate('/recruit/dashboard')
                        localStorage.setItem('isRecruit', true)
                    }
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
							Sign in to Recruit
                        </h1>
                        <form className='space-y-4 md:space-y-6' action='#'>
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
                                    required='true'
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
                                    required='true'
                                />
                            </div>
                            <button
                                onClick={onSubmit}
                                type='submit'
                                className='w-full text-white bg-sky-500 hover:bg-sky-700 focus:ring-2 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                            >
								Sign in
                            </button>
                            <p className='text-sm font-light text-gray-500'>
								Sign in for recruiter?{' '}
                                <a
                                    href='#'
                                    className='font-medium text-sky-600 hover:underline'
                                >
									Sign In
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LoginForRecruiter
