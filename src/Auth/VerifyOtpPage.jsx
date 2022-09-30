import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Api } from "../Apis/api";



export function VerifyOtpPage() {
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const [err,setError] = useState(0)


    useEffect(()=>{
        const id = window.localStorage.getItem("id")
        id && navigate("/home")
      },[])

    function handleOtp(e) {
        const email = window.localStorage.getItem("emailForSignIn");
        console.log(email);
        if (!email) {
            navigate("/signup");
            return;
        }
        console.log(email, otp,err);
        axios.post(`${Api}/signup/verifyotp`, { email: email, otp: otp })
            .then((resp) => resp.data)
            .then((data) => {
                if (data.status === "Error") {
                    navigate("/signup");
                    return;
                }
                if (data.status === "Invalid") {
                    setError(1)
                    //handle invaild otp by changing the Color
                    return;
                }
                if (data.status === "success") {
                    //store the given token id
                    console.log(data)
                    const newUser = window.localStorage.getItem("newUser");
                    window.localStorage.setItem('id',data.id)
                    newUser ==='true'?navigate("/onboarding-details"):navigate("/home");
                    window.localStorage.removeItem('newUser');
                }

            });
    }


    return (
        <>
            <div className="flex h-screen">
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
                            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Email Sent!</h2>
                        </div>

                        <div className="mt-8">
                            <div className="mt-6">
                                <div
                                    onSubmit={(e) => handleOtp(e)}
                                    className="space-y-6">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                            4 digit code
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                onKeyDown={(e)=>(e.key === "Enter" && handleOtp())}
                                                onChange={(e) => { setOtp(e.target.value); }}
                                                type="text"
                                                required
                                                className={`block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${err && 'border-red-500 focus:border-red-500'}`} />
                                            <p className={`${err?'block text-red-500' :'hidden'}`}>Code is invalid or expired. Try requesting a new code.</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-4">
                                        <div
                                            onClick={() => handleOtp()}
                                            className="flex cursor-pointer w-full justify-center rounded-md border border-transparent bg-eeorange-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-eeorange-700 focus:outline-none focus:ring-2 focus:ring-eeorange-700 focus:ring-offset-2"
                                        >
                                            Log in
                                        </div>
                                    </div>
                                    <button className="flex flex-row gap-2">
                                        <p className="text-gray-600">Already have an account?</p>
                                        <p
                                            onClick={() => navigate("/login")}
                                            className="text-eeorange-500 cursor-pointer">Log in</p>
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
