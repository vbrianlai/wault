import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, 
    Redirect
} from "react-router-dom";
import AuthApi from '../AuthApi';
import Cookies from 'js-cookie'

function SignIn () {
    
    const [auth, setAuth] = React.useState(false);
    const readCookie = () => {
        const user = Cookies.get("user");
        if (user) {
            setAuth(true);
        }
    }
    React.useEffect(() => {
        readCookie();
    }, [])

    return (
        <div>
            <AuthApi.Provider value={{auth, setAuth}}>
                <Router>
                    <Routes/>
                </Router>
            </AuthApi.Provider>
    
        </div>
    )
}

const Login = () => {
    const Auth = React.useContext(AuthApi);
    const handleOnClick = () => {
        Auth.setAuth(true);
        Cookies.set("user", "loginTrue");
    }
    return (
        <div>
            <button onClick={handleOnClick}>Login</button>
        </div>
    )
}

const Dashboard = () => {
    const Auth = React.useContext(AuthApi);
    const handleOnClick = () => {
        Auth.setAuth(false);
        Cookies.remove("user");
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleOnClick}>Logout</button>
        </div>
    )
}

const Routes = () => {
    const Auth = React.useContext(AuthApi);

    return (
        <Switch>
            <ProtectedLogin to path="/login" auth={Auth.auth} component={Login}/>
            <ProtectedRoute to path="/dashboard" auth={Auth.auth} component={Dashboard}/>
        </Switch>
    )
}

const ProtectedRoute = ({auth, component:Component, ...rest}) => {
    return(
        <Route
            {...rest}
            render = {() => auth? (
                <Component/>
            ) :
            (
                <Redirect to="/login"/>
            )
            
            
            }
        />
    )
}

const ProtectedLogin = ({auth, component:Component, ...rest}) => {
    return(
        <Route
            {...rest}
            render = {() => !auth? (
                <Component/>
            ) :
            (
                <Redirect to="/dashboard"/>
            )
            
            
            }
        />
    )
}

export default SignIn;