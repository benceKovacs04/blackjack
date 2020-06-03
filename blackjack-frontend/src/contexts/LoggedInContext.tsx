import React, { useState } from 'react'
import cookies from 'js-cookie'

const loggedInContext = React.createContext({
    loggedIn: false,
    username: "",
    toggleLoggedIn: () => { },
    setUser: (username: string) => { },
    logOut: () => { }
})


export const LoggedInContextWrapper = (props: any) => {

    const [loggedIn, setLoggedIn] = useState<boolean>(cookies.get('loggedIn') ? true : false);
    const [username, setUsername] = useState<any>(cookies.get('loggedIn') ? cookies.get('loggedIn') : "")

    const toggleLoggedIn = () => {
        setLoggedIn(!loggedIn)
    }

    const setUser = (username: string) => {
        setUsername(username)
    }

    const logOut = () => {
        setLoggedIn(false)
        setUsername("")
        cookies.remove('loggedIn')
    }

    return (
        <loggedInContext.Provider
            value={{
                loggedIn,
                username,
                toggleLoggedIn,
                setUser,
                logOut
            }}
        >
            {props.children}
        </loggedInContext.Provider>
    )
}

export default loggedInContext;
