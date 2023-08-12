import { useState, useContext } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@utils/firebase.js'
import { UserProvider, useUserContext } from '@context/user_context.jsx'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { user, updateUser } = useUserContext()
    const navigate = useNavigate()

    const onSubmit = async (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user
                // store user in local storage
                localStorage.setItem('user', JSON.stringify(user))
                localStorage.setItem('user_id', user.uid)
                updateUser(user)
                navigate('/')
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
        <div className='main w-full h-full flex flex-col justify-center items-center space-y-10'>
            <div>
                <h2 className='text-2xl font-bold'>Login</h2>
            </div>
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

export default Login
