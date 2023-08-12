import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { UserProvider } from './context/user_context.jsx';
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Nav from './components/nav/nav.jsx';
import SignUp from '@pages/signup/signup.jsx'
import Login from '@pages/login/login.jsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <div>Home</div>,
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

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <UserProvider>
            <Nav />
            <RouterProvider router={router} />
        </UserProvider>
    </React.StrictMode>,
)
