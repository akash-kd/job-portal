import { useState,useContext,createContext } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './utils/firebase.js'
import './App.css'
import { UserProvider, useUserContext } from './context/user_context.jsx'




function App() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {user, updateUser} = useUserContext();

    console.log(user);
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
        <div className='main'>
            <div>
                {user.username ? (
                    <div>
                        <h2>Welcome, {user.username}!</h2>
                        <button onClick={onLogout}>Logout</button>
                    </div>
                ) : (
                    <p>Please log in.</p>
                )}
            </div>
            <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input type='submit' value='Submit' onClick={onSubmit} />
        </div>
    )
}

export default App
