import { useState, useContext, createContext, useEffect } from 'react'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { auth } from './utils/firebase.js'
import { useUserContext } from '@context/user_context.jsx'
import { onAuthStateChanged } from 'firebase/auth'
import {
    createBrowserRouter,
    RouterProvider,
    useNavigate,
} from 'react-router-dom'
import Nav from './components/nav/nav.jsx'
import SignUp from '@pages/signup/signup.jsx'
import Login from '@pages/login/login.jsx'
import Applicants from '@pages/applicants/main.jsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/signin',
        element: <Login />,
    },
    {
        path: '/signup',
        element: <SignUp />,
    },
])

function App() {
    const API_URL = import.meta.env.VITE_API_URL
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { user, updateUser } = useUserContext()
    const navigate = useNavigate()
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

    onAuthStateChanged(auth, async (userCredential) => {
        if (userCredential) {
            updateUser(userCredential)
            console.log(userCredential)
            const response = await fetch(`${API_URL}/user/get/${userCredential.uid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const status = await response.status
            const data = await response.json()
            console.log('USER FROM APP',status, data);
            if (data.isRecruiter === true) navigate('/recruit/dashboard')
            else navigate('/jobportal')
        } else {
            updateUser(null)
            console.log(userCredential)
        }
    })

    const onLogout = () => {
        auth.signOut()
    }

    return (
        <div className='main w-full h-full flex justify-center items-center'>
            <div>
                {user && user.email ? (
                    <div>
                        <h2>Welcome, {user.email}!</h2>
                        <button onClick={onLogout}>Logout</button>
                    </div>
                ) : (
                    <p>Home</p>
                )}
            </div>
        </div>
    )
}

export default App
