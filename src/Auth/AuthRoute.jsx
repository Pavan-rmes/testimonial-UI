import { LoginPage } from "./Login"
import { Routes, Route, useNavigate, useNavigation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

export function AuthRoute(props){
    const navigate = useNavigate()
    const [auth,setAuth] = useState();
    useEffect(()=>{
        const id = window.localStorage.getItem("id")
        !id && navigate("/login")
        setAuth(id)
    },[])
    return(
        <div>
            <Routes >
                {auth?<Route {...props}>{props.children}</Route>:<></>}
            </Routes>
        </div>
    )
}