import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingPage from './LoadingPage';
import { restore } from '../features/Transaction/TransSlice';

const HomePage = () => {
  const { All_Users, isLoading, isError, message } = useSelector((state) => state.Auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!All_Users) {
      navigate("/login");
    } else {
      navigate("/");
    }
    if (isError && message) {
      toast.error(message);
    }
    dispatch(restore());
  }, [All_Users, isError, message]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div
      className=" w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://img.freepik.com/premium-photo/red-background-with-wavy-design_863013-27440.jpg')`
      }}
    >
      <div className="min-h-[89.6vh] flex flex-col items-center justify-center bg-black/50 text-white p-6 gap-6">
        <h1 className="text-center text-3xl font-bold uppercase">
          Welcome To {All_Users?.name}
        </h1>
        <Link
          to="/add-transaction"
          className="w-[70%] px-6 py-3 text-center text-lg font-semibold bg-gray-700 text-white rounded-md shadow-md hover:bg-red-800"
        >
          Add Transaction
        </Link>
        <Link
          to="/view-details"
          className="w-[70%] text-center px-6 py-3 text-lg font-semibold bg-gray-700 text-white rounded-md shadow-md hover:bg-red-800"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
