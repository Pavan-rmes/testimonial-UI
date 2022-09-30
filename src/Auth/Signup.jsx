import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {Api} from "../Apis/api"
import { Routes, Route } from "react-router-dom";
import { VerifyOtpPage } from "./VerifyOtpPage";




export function SignupPage(){
    return(
        <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/verify" element ={<VerifyOtpPage />} />
        </Routes>
    )
}


export function Signup() {
    const navigate = useNavigate();
    const [email, setemail] = useState('');

    useEffect(()=>{
        const id = window.localStorage.getItem("id")
        id && navigate("/home")
      },[])

    function handleSignup(e){
        // e.preventDefault();
        axios.post(`${Api}/signup`,{email:email})
        .then((response)=>(response.data))
        .then((data)=>{
            window.localStorage.setItem('emailForSignIn', email);
            window.localStorage.setItem('newUser',data.newUser);
            data.status =="success" && navigate("/signup/verify");
        })
        .catch((error)=>console.log(error))
    }
    
    return (
        <>
            <div 
            className="flex h-screen">
                <div className="relative hidden w-0 flex-1 lg:block">
                    <img
                        className="absolute inset-0 h-full w-full object-cover"
                        src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
                        alt="" />
                </div>
                <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div>
                            <img
                                className="h-12 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=orange&shade=600"
                                alt="Your Company" />
                            <h3 className="my-6 text-2xl font-bold tracking-tight text-gray-900">Welcome to Add Socialproof</h3>
                            <p className="my-6">Good news, no passwords to remember! </p>
                            <p className="my-6">Enter your email and we'll send you a login code.</p>
                        </div>

                        <div className="mt-8">
                            <div className="mt-6">
                                <div 
                                onSubmit={(e)=>handleSignup(e)}
                                className="space-y-6">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                            Email address
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                onKeyDown={(e)=>(e.key === "Enter" && handleSignup())}
                                                onChange={(e) => { setemail(e.target.value); }}
                                                id="email"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                required
                                                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-4">
                                        <div
                                            onClick={() => handleSignup()}
                                            className="flex cursor-pointer w-full justify-center rounded-md border border-transparent bg-eeorange-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-eeorange-700 focus:outline-none focus:ring-2 focus:ring-eeorange-700 focus:ring-offset-2"
                                        >
                                            Get Login Code
                                        </div>
                                    </div>
                                    <div className="flex flex-row gap-2">
                                        <p className="text-gray-600">Already have an account?</p>
                                        <p
                                            onClick={() => navigate("/login")}
                                            className="text-eeorange-500 cursor-pointer">Log in</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}



