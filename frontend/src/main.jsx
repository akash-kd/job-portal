import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { UserProvider } from './context/user_context.jsx';
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Nav from './components/nav/nav.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <div>Home</div>,
    },
    {
        path: '/signin',
        element: <App />,
    },
    {
        path: '/signup',
        element: <App />,
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
