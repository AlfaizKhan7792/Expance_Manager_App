import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LogoutUser } from "../features/Auth/AuthSlice";
import LoadingPage from "../pages/LoadingPage";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { All_Users} = useSelector((state) => state.Auth)

  const dispatch = useDispatch()

  const handleExit = () =>{
    dispatch(LogoutUser())
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-br from-[#FFFFF0] to-[#666666] text-[#333333] shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Left Side: Logo/Title */}
        <h1 className="text-2xl font-bold text-[#800020]">
         <Link to={"/"}> Expance_Manager_App</Link>
        </h1>

        {/* Hamburger Menu for Mobile */}
        <button
          className="lg:hidden text-[#800020] focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>

        {/* Right Side: Buttons */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } lg:flex space-x-4 items-center`}
        >
         {
          !All_Users ? <>
           <Link to={"/login"}> <button className="px-4 py-2 bg-[#800020] text-white font-semibold rounded-lg hover:bg-[#a41c30] focus:outline-none focus:ring-2 focus:ring-[#800020] transition">
          Login
        </button></Link>
        <Link to={"/register"}>
        <button className="px-4 py-2 bg-[#800020] text-white font-semibold rounded-lg hover:bg-[#a41c30] focus:outline-none focus:ring-2 focus:ring-[#800020] transition">
          Register
        </button></Link>
       </> : <><button type="submit" onClick={handleExit} className="px-4 py-2 bg-[#800020] text-white font-semibold rounded-lg hover:bg-[#a41c30] focus:outline-none focus:ring-2 focus:ring-[#800020] transition">
            Logout
          </button></>
         }
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
