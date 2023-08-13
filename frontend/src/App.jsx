import { useState,useContext,createContext } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './utils/firebase.js'
import './App.css'
import { useUserContext } from '@context/user_context.jsx'
import { onAuthStateChanged } from 'firebase/auth'
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom'
import Nav from './components/nav/nav.jsx'
import SignUp from '@pages/signup/signup.jsx'
import Login from '@pages/login/login.jsx'

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
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {user, updateUser} = useUserContext();
    const navigate = useNavigate();
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

                if(errorCode === 'auth/email-already-in-use') {
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

    onAuthStateChanged(auth, (userCredential) => {
        if (userCredential) {
            updateUser(userCredential)
            console.log(userCredential)
        } else {
            updateUser(null)
            console.log(userCredential)
        }
    })

    

    const isRecruit = localStorage.getItem('isRecruit')
    if(isRecruit) navigate('/recruit/dashboard')
    const onLogout = () => {
        auth.signOut();
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
