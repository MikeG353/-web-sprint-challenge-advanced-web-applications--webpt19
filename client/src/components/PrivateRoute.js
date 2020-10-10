import  React from 'react'
import { Route, Redirect } from 'react-router-dom'

const isAuthenticated = () => {
    return localStorage.getItem('token') !== null
}

const PrivateRoute = ({ component: Component, ...props}) => {
    return (
        <Route 
            {...props}
            render = {() => {
                if(isAuthenticated()) {
                    return <Component {...props} />
                }
                return <Redirect to='/' />
            }}

        />
    )
}
export default PrivateRoute