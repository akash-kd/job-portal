import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { UserProvider } from './context/user_context.jsx';
import './index.css'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Nav from './components/nav/nav.jsx';
import SignUp from '@pages/signup/signup.jsx'
import Login from '@pages/login/login.jsx'
import LoginForRecruiter from '@pages/loginForRecruiter/loginforrecruiter.jsx';
import SignUpForRecruiter from '@pages/signUpForRecruiter/signupForRecruiter.jsx';
import Recruit from '@pages/recruit/main.jsx';
import AddJob from '@pages/recruit/add.jsx';
import JobPortal from '@pages/portal/main.jsx';
import Applicants from '@pages/applicants/main.jsx';

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
        path: '/signinforrecruiter',
        element: <LoginForRecruiter />,
    },
    {
        path: '/signup',
        element: <SignUp />,
    },
    {
        path: '/signupforrecruiter',
        element: <SignUpForRecruiter />,
    },
    {
        path: '/recruit/dashboard',
        element: <Recruit />,
    },
    {
        path: '/recruit/add',
        element: <AddJob />,
    },
    {
        path: '/jobportal',
        element: <JobPortal />,
    },
    {
        path: '/applicants/:jobId',
        element: <Applicants />,
    },
])

const user = getAuth().currentUser;
const onLogout = () => {
    getAuth().signOut();
}


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <UserProvider>
            { user ? <button onClick={onLogout}>Logout</button> : <Nav />}
            <RouterProvider router={router} />
        </UserProvider>
    </React.StrictMode>,
)
