import React, { useState } from 'react'
import cookies from 'js-cookie'

const loggedInContext = React.createContext({
    loggedIn: false,
    username: "",
    toggleLoggedIn: () => { },
    setUser: (username: string) => { }
})


export const LoggedInContextWrapper = (props: any) => {

    const [loggedIn, setLoggedIn] = useState<boolean>(cookies.get('loggedIn') ? true : false);
    const [username, setUsername] = useState<string>("")

    const toggleLoggedIn = () => {
        setLoggedIn(!loggedIn)
    }

    const setUser = (username: string) => {
        setUsername(username)
    }

    return (
        <loggedInContext.Provider
            value={{
                loggedIn,
                username,
                toggleLoggedIn,
                setUser
            }}
        >
            {props.children}
        </loggedInContext.Provider>
    )
}

export default loggedInContext;
