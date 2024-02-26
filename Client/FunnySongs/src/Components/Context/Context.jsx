import React, { createContext,useState } from 'react'
export const AppContext = createContext()

const Context =({children}) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [formSubmitted,setFormSubmitted] = useState(false)

    return (
        <AppContext.Provider value={{formSubmitted,setFormSubmitted,isLoggedIn, setIsLoggedIn}}>
            {children}
        </AppContext.Provider>
    )

}

export default Context