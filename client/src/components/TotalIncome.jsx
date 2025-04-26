import React from "react";
import { useDispatch } from "react-redux";
import { DeleteTrans, Remove, Update } from "../features/Transaction/TransSlice";
import { useNavigate } from "react-router-dom";
import { OctagonX, PencilIcon } from "lucide-react";

const TotalIncome = ({incomeList}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleEdit = (id) =>{
    const data = incomeList.find(item => item._id === id)
    dispatch(Update(data))
  navigate("/add-transaction")
  }

  const handleDelete = (id) =>{
    dispatch(DeleteTrans(id))
    dispatch(Remove(id))
  }

  if(incomeList?.length === 0){
    return( <h1 className="text-center text-white text-2xl">No Income Yet!!</h1>)
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
    <h3 className="text-xl font-bold text-gray-800 dark:text-teal-400 mb-4">
      Total Income
    </h3>
      <ul className="space-y-4">
        {incomeList?.map((item, index) => (
          <li
            key={index._id}
            className="flex justify-between items-center p-4 border border-green-500 rounded-lg shadow-md"
          >
            <div className="text-lg text-green-500 flex flex-col">
             <span><strong> {item?.name} : ₹{item?.amount}</strong></span>
             <small>{item?.category1}</small>
            </div>
            <div className="space-x-2">
              <button
              onClick={() => handleEdit(item._id)}
                className="px-3 py-1 text-sm font-medium text-white bg-[#800020] rounded-md hover:bg-[#a41c30]"
              >
                <PencilIcon />
              </button>
              <button
              onClick={() => handleDelete(item._id)}
                className="px-3 py-1 text-sm font-medium text-white bg-[#800020] rounded-md hover:bg-[#a41c30]"
              >
                <OctagonX />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TotalIncome;
