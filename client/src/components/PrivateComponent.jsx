import React from 'react'
import useAuthStatus from '../Hooks/useAuthStatus'
import LoadingPage from '../pages/LoadingPage'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateComponent = () => {

    const {LoggedIn , CheckStatus} = useAuthStatus()

    if(CheckStatus){
<LoadingPage />
    }

    return LoggedIn ? <Outlet /> : <Navigate to={"/login"} />

}

export default PrivateComponent
