import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { companyImg } from "../constants";
import axios from "axios";
import { Api } from "../Apis/api";

export function FirstTestimonialForm() {
  const [name,setName]= useState("");
  const[company,setCompany] = useState("");
  const [url,setUrl] = useState("");
  const [userId,setUserId] = useState();

   const navigate = useNavigate();
    useEffect(()=>{
      const id = window.localStorage.getItem("id")
      setUserId(id)
      !id && navigate("/login")
    },[])

    function handleData(){
      axios.post(`${Api}/testimonial/new`,{
        name:name,company:company,url:url,userId:userId
      })
      .then((res)=>(res.data))
      .then((data)=>{
        console.log(data)
        if(data?.status){
          navigate("/home")
        }
      })
      .catch((e)=>console.log(e))
    }

  return (
    <div className=" flex justify-center bg-gray-100 lg:pt-28 h-screen">
        <div className="m-4 p-4 lg:w-1/2 md:w-3/4 md:pt-28">
        <div className="mt-10 sm:mt-0">
          <img
            className="h-12 w-auto"
            src={companyImg}
            alt="Your Company" />
          <div className="md:grid md:grid-cols-3 items-center md:gap-6">
            <div className="md:col-span-1 ">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Read Me</h3>
                <p className="mt-1 text-sm text-gray-600">Fill the form to create your first Testimonial.</p>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
                <div className="text-center text-3xl pb-2 bold text-gray-600">One Last Step</div>
                <div className="overflow-hidden shadow sm:rounded-md">
                  <div className="bg-white px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-4 gap-6">
                      <div className="col-span-6 sm:col-span-4">
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                          Name
                        </label>
                        <input
                          type="text"
                          onChange={(e)=>setName(e.target.value)}
                          placeholder="ex: John Doe"
                          className="mt-1 block w-full p-2 border rounded-md border-gray-300 shadow-sm focus:border-eeorange-500 focus:ring-eeorange-500 sm:text-sm"
                        />
                      </div>  
                      <div className="col-span-6 sm:col-span-4">
                        <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                          Company Name
                        </label>
                        <input
                          onChange={(e)=>setCompany(e.target.value)}
                          type="text"
                          placeholder="ex: Nike"
                          className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-4">
                        <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                          Website URL 
                        </label>
                        <input
                          onKeyDown={(e)=>(e.key === "Enter" && handleData())}
                          onChange={(e)=>setUrl(e.target.value)}
                          type="text"
                          placeholder="https://nike.com"
                          className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>    
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 text-center sm:px-6">
                    <button
                      onClick={()=>handleData()}
                      className="inline-flex justify-center rounded-md border border-transparent bg-eeorange-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-eeorange-500 focus:outline-none focus:ring-2 focus:ring-eeorange-700 focus:ring-offset-2"
                    >
                      Lets Go
                    </button>
                  </div>
                </div>
            </div>
          </div>
        </div>

    </div>
    </div>
  );
}

/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/

/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/


/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
  
