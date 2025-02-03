import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingPage from './LoadingPage';

const HomePage = () => {

  const {All_Users , isLoading , isError , message} = useSelector((state) => state.Auth)

  const navigate = useNavigate()

  useEffect(() =>{
if(!All_Users){
  navigate("/login")
}else{
  navigate("/")
}
if(isError && message){
  return toast.error(message)
}
  },[All_Users , isError , message])

  if(isLoading){
    return <LoadingPage />
  }

  return (
    <div>
      <div className="min-h-[89.6vh]  bg-[#FFFFF0] dark:bg-[#333333] text-[#333333] dark:text-[#FFFFF0]">
        {/* Navbar */}
        {/* <header className="flex items-center justify-between p-4 border-b border-[#666666] dark:border-[#FFFFF0]">
          <h1 className="text-xl font-bold">Expance Manager App</h1>
          <div className="flex items-center gap-4">
            <button
              className="px-4 py-2 bg-[#800020] text-white rounded-md shadow-md hover:bg-[#a41c30]"
              onClick={() => setDarkMode(!darkMode)}
            >
              Toggle Theme
            </button>
            <button className="px-4 py-2 bg-[#800020] text-white rounded-md shadow-md hover:bg-[#a41c30]">
              Log Out
            </button>
          </div>
        </header> */}

        {/* Main Content */}
       <main className="flex flex-col items-center pt-60 justify-center gap-6 p-6">
            <h1 className="text-center text-3xl font-bold uppercase">Welcome To {All_Users?.name}</h1>
         <Link to={"/add-transaction"} className="w-[70%] px-6 py-3 text-center text-lg font-semibold bg-[#666666] text-[#FFFFF0] rounded-md shadow-md hover:bg-[#800020]">
            Add Transaction
          </Link>
          <Link to={"/view-details"} className="w-[70%] text-center px-6 py-3 text-lg font-semibold bg-[#666666] text-[#FFFFF0] rounded-md shadow-md hover:bg-[#800020]">
            View Details
          </Link>
        </main>
       </div>
      </div>
  );
};

export default HomePage;
