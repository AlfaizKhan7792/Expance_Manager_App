import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import { RegisterUser } from "../features/Auth/AuthSlice";

const RegisterPage = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {isLoading , isError , message , All_Users} = useSelector((state=> state.Auth))

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    dispatch(RegisterUser(formData))
  };

  useEffect(() =>{
if(All_Users){
    navigate("/")
}
  },[All_Users , isError , message])

  if(isLoading){
return <LoadingPage />
}


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFFF0] to-[#666666] text-[#333333] flex items-center justify-center">
      <div className="w-full max-w-md bg-[#FFFFF0] p-8 m-8 rounded-xl shadow-xl transform transition duration-300 hover:scale-105">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#800020]">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium mb-2 text-[#333333]"
            >
              Name:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-lg border border-[#666666] bg-[#FFFFF0] focus:outline-none focus:ring-2 focus:ring-[#800020] transition"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-2 text-[#333333]"
            >
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg border border-[#666666] bg-[#FFFFF0] focus:outline-none focus:ring-2 focus:ring-[#800020] transition"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium mb-2 text-[#333333]"
            >
              Phone:
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
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
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg border border-[#666666] bg-[#FFFFF0] focus:outline-none focus:ring-2 focus:ring-[#800020] transition"
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium mb-2 text-[#333333]"
            >
              Confirm Password:
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="w-full px-4 py-3 rounded-lg border border-[#666666] bg-[#FFFFF0] focus:outline-none focus:ring-2 focus:ring-[#800020] transition"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-3 w-full bg-[#800020] text-white font-semibold rounded-lg hover:bg-[#a41c30] focus:outline-none focus:ring-2 focus:ring-[#800020] transition"
            >
              Register
            </button>
          </div>
        </form>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-[#800020] font-semibold hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
