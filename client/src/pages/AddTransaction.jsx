import React, { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import { useDispatch, useSelector } from "react-redux";
import { AddTrans } from "../features/Transaction/TransSlice";
import LoadingPage from "./LoadingPage";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddTransaction = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {All_Trans , isLoading , isErorr , message , isSuccess} = useSelector((state) => state.Trans)

  // State for AddTransaction fields
  const [transaction, setTransaction] = useState({
    name: "",
    amount: "",
  });

  // State for Categories Form fields
  const [extraDetails, setExtraDetails] = useState({
    category1: "",
    type: "Credit",
  });

  // State for controlling second form visibility
  const [isSecondFormOpen, setIsSecondFormOpen] = useState(false);

  // Handle AddTransaction form input changes
  const handleTransactionChange = (e) => {
    const { name, value } = e.target;
    setTransaction({ ...transaction, [name]: value });
  };

  // Handle Second Form input changes
  const handleExtraDetailsChange = (e) => {
    const { name, value } = e.target;
    setExtraDetails({ ...extraDetails, [name]: value });
  };

  // Handle Second Form submission
  const handleSecondFormSubmit = (e) => {
    e.preventDefault();
    setIsSecondFormOpen(false); // Close second form
  };

  // Handle final form submission
  const handleFinalSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      ...transaction,
      ...extraDetails,
    };
    // console.log("Final: ", finalData);

    dispatch(AddTrans(finalData));

    // Reset state after submission
    setTransaction({ name: "", amount: "" });
    setExtraDetails({ category1: "", type: "Credit" });
  };

  useEffect(() =>{

    if(All_Trans && isSuccess){
      navigate("/view-details")    
    }

    if(isErorr && message){
      toast.error(message)
    }

    setTransaction()

  
  },[All_Trans , isSuccess, isErorr , message])

  if(isLoading){
    return <LoadingPage />
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFFF0] to-[#666666] flex items-center justify-center">
      <div className="w-full max-w-md bg-[#FFFFF0] p-8 rounded-xl shadow-xl">
        <span className="flex justify-between">
          <BackButton url={"/"} />
          <h2 className="text-2xl font-bold mb-6 text-center text-[#800020]">
            Add Transaction
          </h2>
        </span>
        <form onSubmit={handleFinalSubmit} className="space-y-6">
          {/* Transaction Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium mb-2 text-[#333333]"
            >
              Transaction Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={transaction?.name}
              onChange={handleTransactionChange}
              placeholder="Enter transaction name"
              className="w-full px-4 py-2 rounded-lg border border-[#666666] bg-[#FFFFF0] focus:outline-none focus:ring-2 focus:ring-[#800020] transition"
              required
            />
          </div>

          {/* Transaction Amount */}
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium mb-2 text-[#333333]"
            >
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={transaction?.amount}
              onChange={handleTransactionChange}
              placeholder="Enter amount"
              className="w-full px-4 py-2 rounded-lg border border-[#666666] bg-[#FFFFF0] focus:outline-none focus:ring-2 focus:ring-[#800020] transition"
              required
            />
          </div>

          <span className="flex gap-5 border rounded-md px-3">
            <p>{extraDetails?.category1}</p>
            <p>{extraDetails?.type}</p>
          </span>

          {/* Button to open Second Form */}
          <div className="text-center float-end">
            <button
              type="button"
              onClick={() => setIsSecondFormOpen(true)}
              className="px-6 py-3 bg-[#800020] mb-3 text-white font-semibold rounded-lg hover:bg-[#a41c30] focus:outline-none focus:ring-2 focus:ring-[#800020] transition"
            >
              Add Category's
            </button>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-3 w-full bg-[#800020] text-white font-semibold rounded-lg hover:bg-[#a41c30] focus:outline-none focus:ring-2 focus:ring-[#800020] transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Second Form Modal */}
      {isSecondFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#FFFFF0] p-8 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-xl font-bold text-center mb-4 text-[#800020]">
              Add More Details
            </h3>
            <form onSubmit={handleSecondFormSubmit} className="space-y-6">
              {/* Transaction Type */}
              <div>
                <label
                  htmlFor="transactionType"
                  className="block text-sm font-medium mb-2 text-[#333333]"
                >
                  Transaction Type
                </label>
                <input
                  type="text"
                  id="category1"
                  name="category1"
                  value={extraDetails?.category1}
                  onChange={handleExtraDetailsChange}
                  placeholder="Enter transaction type"
                  className="w-full px-4 py-2 rounded-lg border border-[#666666] bg-[#FFFFF0] focus:outline-none focus:ring-2 focus:ring-[#800020] transition"
                  
                />
              </div>

              {/* Credit/Debit Selection */}
              <div>
                <label
                  htmlFor="creditDebit"
                  className="block text-sm font-medium mb-2 text-[#333333]"
                >
                  Credit/Debit
                </label>
                <select
                  id="type"
                  name="type"
                  value={extraDetails?.type}
                  onChange={handleExtraDetailsChange}
                  className="w-full px-4 py-2 rounded-lg border border-[#666666] bg-[#FFFFF0] focus:outline-none focus:ring-2 focus:ring-[#800020] transition"
                >
                  <option value="Credit">Credit</option>
                  <option value="Debit">Debit</option>
                </select>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#800020] text-white font-semibold rounded-lg hover:bg-[#a41c30] focus:outline-none focus:ring-2 focus:ring-[#800020] transition"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTransaction;