import { useState, useContext, createContext } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@utils/firebase.js'
import '@/App.css'
import { UserProvider, useUserContext } from '@context/user_context.jsx'

function SignUp() {
    const [name,setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { user, updateUser } = useUserContext()

    console.log(user)
    const onSubmit = async (e) => {
        e.preventDefault()

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user
                // store user in local storage
                localStorage.setItem('user', JSON.stringify(user))
                localStorage.setItem('user_id', user.uid)
                updateUser(user)
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

    const onLogout = () => {
        updateUser(null) // Clear user data
    }
    return (
        <div className='main w-full h-full flex flex-col justify-center items-center space-y-10'>
            <div>
                {user.username ? (
                    <div>
                        <h2>Welcome, {user.username}!</h2>
                        <button onClick={onLogout}>Logout</button>
                    </div>
                ) : (
                    <h2 className='text-2xl font-bold'>Sign Up</h2>
                )}
            </div>
            <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Name'
                className='border h-10 w-1/5 px-5 rounded-lg'
            />
            <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
                className='border h-10 w-1/5 px-5 rounded-lg'
            />
            <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
                className='border h-10 w-1/5 px-5 rounded-lg'
            />
            <input type='submit' value='Submit' onClick={onSubmit} />
        </div>
    )
}

export default SignUp
