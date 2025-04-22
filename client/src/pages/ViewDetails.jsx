// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import BackButton from "../components/BackButton";
// import { useDispatch, useSelector } from "react-redux";
// import { GetTrans } from "../features/Transaction/TransSlice";
// import { toast } from "react-toastify";
// import LoadingPage from "./LoadingPage";
// import { useEffect } from "react";
// import TotalIncome from "../components/TotalIncome";
// import TotalExpanse from "../components/TotalExpanse";

// // Register Chart.js modules
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const ViewDetails = () => {

//   const dispatch = useDispatch()
//   const {All_Trans , isLoading , isError , message}= useSelector((state) => state.Trans)

//   console.log("Transactions Details:");
// All_Trans.transactions.forEach((transactions) => {
//   console.log(`Name: ${transactions.name}`);
//   console.log(`Amount: ${transactions.amount}`);
//   console.log(`Category: ${transactions.category1}`);
//   console.log(`Type: ${transactions.type}`);
// });

  

// // Calculate Total Income and Expance
// const totalIncome =
// All_Trans.transactions?.filter((trans) => trans.type === "Credit").reduce(
//   (p, c) => p + (parseFloat(c.amount) || 0),
//   0
// ) || 0;
// const totalExpance =  All_Trans.transactions?.filter((trans) => trans.type === "Debit").reduce(
//   (p, c) => p + (parseFloat(c.amount) || 0),
//   0
// ) || 0;
// const Balance = totalIncome - totalExpance

// // Filtered Data for IncomeList and ExpanceList
// const incomeList = All_Trans.transactions.filter((trans) => trans.type === "Credit") || [];
// const expanceList = All_Trans.transactions.filter((trans) => trans.type === "Debit") || [];


//   // Chart Data
//   const data = {
//     labels: ["Income", "Expense", "Balance"],
//     datasets: [
//       {
//         label: "Amount (₹)",
//         data: [totalIncome, totalExpance, Balance],
//         backgroundColor: ["#22c55e", "#ef4444", "#facc15"], // Green, Red, Yellow
//       },
//     ],
//   };


//   useEffect(() =>{
//     dispatch(GetTrans())
//     console.log(All_Trans);
//     console.log(GetTrans);
//     if(isError && message){
//       toast.error(message)
//     }
//     },[ isError , message ])

  

//   if(isLoading){
//     return <LoadingPage />
//   }

//   return (
//     <div className="dark">
//       <div className="grid md:grid-cols-2 grid-cols-1 bg-gray-100 dark:bg-gray-900 p-4 gap-4">
//         {/* Left Section: Details */}
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
//         <span className="flex justify-between items-center">
//           <h2 className="text-2xl font-bold text-gray-800 dark:text-teal-400 mb-4">
//           {/* <h2 className="text-2xl font-bold mb-6 text-center text-[#800020]"> */}
//             Financial Summary
//           </h2>
//         <BackButton url={"/"} />
//         </span>
//           <div className="space-y-4">
//             <p className="text-7xl font-medium">
//               <span className="text-gray-800 dark:text-teal-400">Total Income:</span>{" "}
//               <span className="text-green-500">₹{totalIncome}</span>
//             </p>
//             <p className="text-6xl font-medium">
//               <span className="text-gray-800 dark:text-teal-400">Total Expense:</span>{" "}
//               <span className="text-red-500">₹{totalExpance}</span>
//             </p>
//             <p className="text-5xl font-medium">
//               <span className="text-gray-800 dark:text-teal-400">Balance:</span>{" "}
//               <span className="text-yellow-500">₹{Balance}</span>
//             </p>
//           </div>
//         </div>

//         {/* Right Section: Chart */}
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
//           <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-teal-400 mb-4">
//             Financial Overview
//           </h2>
//           <Bar data={data} options={{ responsive: true, maintainAspectRatio: true }} />
//         </div>
//       </div>

//       {/* Lower Section */}
//       <div className="grid md:grid-cols-2 grid-cols-1 bg-gray-100 dark:bg-gray-900 px-4 pb-4 gap-4">
//         {/* Left: Income List */}
//         <TotalIncome incomeList={incomeList} />

//         {/* Right: Expense List */}
//         <TotalExpanse expanceList={expanceList} />
//       </div>
//     </div>
//   );
// };

// export default ViewDetails;































import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import BackButton from "../components/BackButton";
import { useDispatch, useSelector } from "react-redux";
import { GetTrans } from "../features/Transaction/TransSlice";
import { toast } from "react-toastify";
import LoadingPage from "./LoadingPage";
import { useEffect } from "react";
import TotalExpanse from "../components/TotalExpanse";
import TotalIncome from "../components/TotalIncome";

// Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ViewDetails = () => {
  const dispatch = useDispatch();
  const { All_Trans = { transactions: [] }, isLoading, isError, message } = useSelector(
    (state) => state.Trans
  ); 

// console.log(All_Trans);


// Filter transactions based on category1 and type
const totalIncome =
All_Trans?.transactions
  ?.filter((trans) => trans?.type === "Credit")
  .reduce((p, c) => p + (parseFloat(c?.amount) || 0), 0) || 0;

const totalExpance =
All_Trans?.transactions
  ?.filter((trans) => trans?.type === "Debit")
  .reduce((p, c) => p + (parseFloat(c?.amount) || 0), 0) || 0;

const Balance = totalIncome - totalExpance;

// Filtered Data for IncomeList and ExpanceList
const incomeList = All_Trans?.transactions?.filter(
(trans) => trans.type === "Credit"
) || [];

const expanceList = All_Trans?.transactions?.filter(
(trans) => trans.type === "Debit"
) || [];


  // Chart Data
  const data = {
    labels: ["Income", "Expense", "Balance"],
    datasets: [
      {
        label: "Amount (₹)",
        data: [totalIncome, totalExpance, Balance],
        backgroundColor: ["#22c55e", "#ef4444", "#facc15"], // Green, Red, Yellow
      },
    ],
  };

  useEffect(() => {
    dispatch(GetTrans());
    if (isError && message) {
      toast.error(message);
    }
  }, [dispatch, isError, message]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="dark">
      <div className="grid md:grid-cols-2 grid-cols-1 bg-gray-100 dark:bg-gray-900 p-4 gap-4">
        {/* Left Section: Details */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <span className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-teal-400 mb-4">
              Financial Summary
            </h2>
            <BackButton url={"/"} />
          </span>
          <div className="space-y-4">
            <p className="text-7xl font-medium">
              <span className="text-gray-800 dark:text-teal-400">Total Income:</span>{" "}
              <span className="text-green-500">₹{totalIncome}</span>
            </p>
            <p className="text-6xl font-medium">
              <span className="text-gray-800 dark:text-teal-400">Total Expense:</span>{" "}
              <span className="text-red-500">₹{totalExpance}</span>
            </p>
            <p className="text-5xl font-medium">
              <span className="text-gray-800 dark:text-teal-400">Balance:</span>{" "}
              <span className="text-yellow-500">₹{Balance}</span>
            </p>
          </div>
        </div>

        {/* Right Section: Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-teal-400 mb-4">
            Financial Overview
          </h2>
          <Bar data={data} options={{ responsive: true, maintainAspectRatio: true }} />
        </div>
      </div>

      {/* Lower Section */}
      <div className="grid md:grid-cols-2 grid-cols-1 bg-gray-100 dark:bg-gray-900 px-4 pb-4 gap-4">
        {/* Left: Income List */}
        <TotalIncome incomeList={incomeList} />

        {/* Right: Expense List */}
        <TotalExpanse expanceList={expanceList} />
      </div>
    </div>
  );
};

export default ViewDetails;
