import React, {useEffect, useState} from "react"
import api from "./api"
import {login, logout, getToken} from './auth'
import {Route, Redirect} from "react-router-dom"
import LinearProgress from '@material-ui/core/LinearProgress';


export default function WAuth({component: Component, ...rest}){
    const [redirect, setRedirect] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function verify(){
            try {
                var res = await api.get('/api/token/usuarios/checkToken', {params:{token: getToken()}});
                
                if(res.data.status === 200){
                    setLoading(false)
                    setRedirect(false)
                }else{
                    logout()
                    setLoading(false)
                    setRedirect(true)
                }
            } catch (err) {
                console.log(err)
            }
        }
        verify()
    }, [])

    return (
        loading? <LinearProgress style={{width: '50%', margin: '80px auto'}} />: <Route {...rest}
        render={props => !redirect?(
            <Component {...props} />
        ):<Redirect to={{pathname: "/admin/login", state: {from: props.location}}} />
        } />
    )        
}