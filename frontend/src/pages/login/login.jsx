import { useState, useContext} from 'react'
import { auth } from '@utils/firebase.js'
import { UserProvider, useUserContext } from '@context/user_context.jsx'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { user, updateUser } = useUserContext()

    const onSubmit = async (e) => {
        e.preventDefault();
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
