import { useState,useContext,createContext } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './utils/firebase.js'
import './App.css'
import { useUserContext } from '@context/user_context.jsx'
import { onAuthStateChanged } from 'firebase/auth'



function App() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {user, updateUser} = useUserContext();


    onAuthStateChanged(auth, (user) => {
        if (user) {
            updateUser(user);
        } else {
            updateUser(null);
        }
    })
    
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

    


    const onLogout = () => {
        updateUser(null) // Clear user data
    }
    return (
        <div className='main w-full h-full flex justify-center items-center'>
            <div>
                {user.email ? (
                    <div>
                        <h2>Welcome, {user.email}!</h2>
                    </div>
                ) : (
                    <p>Home</p>
                )}
            </div>
        </div>
    )
}

export default App
