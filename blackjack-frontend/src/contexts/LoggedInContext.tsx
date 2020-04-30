import React, { useState } from 'react'
import cookies from 'js-cookie'

const loggedInContext = React.createContext({
    loggedIn: false,
    username: "",
    toggleLoggedIn: () => { },
    setUsername: (username: string) => { }
})


export const LoggedInContextWrapper = (props: any) => {

    const [loggedIn, setLoggedIn] = useState<boolean>(cookies.get('loggedIn') ? true : false);
    const [username, setUser] = useState<string>("")

    const toggleLoggedIn = () => {
        setLoggedIn(!loggedIn)
    }

    const setUsername = (username: string) {
        setUser(username)
    }

    return (
        <loggedInContext.Provider
            value={{
                loggedIn,
                username,
                toggleLoggedIn,
                setUsername
            }}
        >
            {props.children}
        </loggedInContext.Provider>
    )
}

export default loggedInContext;
