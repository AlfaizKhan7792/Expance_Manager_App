import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { LoginUser } from "../features/Auth/AuthSlice";

const LoginPage = () => {

    const {isLoading , isError , message , All_Users} = useSelector((state) => state.Auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [formData , setFormData] = useState({
        email : "",
        password : ""
    })

    const {email , password} = formData
    
    const handleChange = (e) =>{
        setFormData({...formData , [e.target.name] : e.target.value})
    }

    const handleSubmit = (e) =>{
e.preventDefault()
console.log(formData);
dispatch(LoginUser(formData))
    }


    useEffect(() =>{

      if(All_Users){
        navigate("/")
      }

if(isError && message){
    return toast.error(message)
}
    },[isError, message , All_Users])

    if(isLoading){
        return <LoadingPage />
    }

        return (
          <div className="min-h-screen bg-gradient-to-br from-[#FFFFF0] to-[#666666] text-[#333333] flex items-center justify-center">
            <div className="w-full max-w-md bg-[#FFFFF0] p-8 rounded-xl shadow-xl transform transition duration-300 hover:scale-105">
              <h2 className="text-2xl font-bold mb-6 text-center text-[#800020]">
                Login
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2 text-[#333333]"
                  >
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg border border-[#666666] bg-[#FFFFF0] focus:outline-none focus:ring-2 focus:ring-[#800020] transition"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium mb-2 text-[#333333]"
                  >
                    Password:
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 rounded-lg border border-[#666666] bg-[#FFFFF0] focus:outline-none focus:ring-2 focus:ring-[#800020] transition"
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="px-6 py-3 w-full bg-[#800020] text-white font-semibold rounded-lg hover:bg-[#a41c30] focus:outline-none focus:ring-2 focus:ring-[#800020] transition"
                  >
                    Login
                  </button>
                </div>
              </form>
              <p className="text-center mt-4">
                Don't have an account?{" "}
                <a href="/register" className="text-[#800020] font-semibold hover:underline">
                  Register here
                </a>
              </p>
            </div>
          </div>
        );
      };

export default LoginPage;
