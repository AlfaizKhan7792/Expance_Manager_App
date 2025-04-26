import React from "react";
import { useDispatch } from "react-redux";
import { DeleteTrans, Remove, Update } from "../features/Transaction/TransSlice";
import { useNavigate } from "react-router-dom";
// import { OctagonX, PencilIcon } from "lucide-react";

const TotalExpanse = ({expanceList}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleDelete = (id) =>{
    dispatch(DeleteTrans(id))
    dispatch(Remove(id))
  }

  const handleEdit = (id) => {
    const data = expanceList.find(item => item._id === id);
    dispatch(Update(data));
    navigate("/add-transaction");
  }
  
  

  if(expanceList?.length === 0){
    return( <h1 className="text-center text-white text-2xl">No Income Yet!!</h1>)
  }

  return (
<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 dark:text-teal-400 mb-4">
        Total Expense
      </h3>
      <ul className="space-y-4">
        {expanceList?.map((expense, index) => (
        <li
        key={index}
        className="flex justify-between border border-red-500 p-3 rounded-md text-red-500 dark:text-gray-300 text-lg"
      >
            <div className="text-lg text-red-500 flex flex-col">
             <span><strong> {expense?.name} : ₹{expense?.amount}</strong></span>
             <small>{expense?.category1}</small>
            </div>
            <div className="space-x-2">
              <button
              onClick={() => handleEdit(expense._id)}
                className="px-3 py-1 text-sm font-medium text-white bg-[#800020] rounded-md hover:bg-[#a41c30]"
                
              >
                {/* <PencilIcon /> */}
                Edit
              </button>
              <button
              onClick={() => handleDelete(expense._id)}
                className="px-3 py-1 text-sm font-medium text-white bg-[#800020] rounded-md hover:bg-[#a41c30]"
                
              >
                {/* <OctagonX /> */}
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TotalExpanse;
