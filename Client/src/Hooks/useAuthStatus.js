import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const useAuthStatus = () => {

    const {All_Users} = useSelector((state) => state.Auth)

    const [LoggedIn , setLoggedIn] = useState(false)
    const [ChechStatus, setChechStatus] = useState(true);

    useEffect(() =>{
All_Users ? setLoggedIn(true) : setLoggedIn(false)
setChechStatus(false)
    },[All_Users])

  return {LoggedIn , ChechStatus}
}

export default useAuthStatus
