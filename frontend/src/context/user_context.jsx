import { createContext, useState,useContext} from 'react'

export const UserContext = createContext({
    authenticated: false,
    user: {},
})

export function useUserContext() {
    return useContext(UserContext)
}

export const UserProvider = ({ children }) => {
    const [isAuth, setAuth] = useState(false)
    const [user, updateUser] = useState({})
    
    return (
        <UserContext.Provider value={{ user, updateUser, isAuth, setAuth }}>
            {children}
        </UserContext.Provider>
    )
}
