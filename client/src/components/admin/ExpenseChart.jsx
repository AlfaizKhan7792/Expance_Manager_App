import React from 'react'
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const ExpenseChart = ({Trans}) => {


  // Step 1: Process Trans to get top 6 categories with total amounts
// const categoryMap = {};

// Trans?.forEach((item) => {
//   const cat = item?.category1;
//   if (cat) {
//     if (!categoryMap[cat]) {
//       categoryMap[cat] = { count: 0, totalAmount: 0 };
//     }
//     categoryMap[cat]?.count += 1;
//     categoryMap[cat]?.totalAmount += Number(item?.amount);
//   }
// });

// // Step 2: Get top 6 categories sorted by frequency
// const topCategories = Object?.entries(categoryMap)
//   .sort((a, b) => b[1]?.count - a[1]?.count)
//   .slice(0, 6)
//   .map(([category, data]) => ({
//     category,
//     totalAmount: data?.totalAmount
//   }));

// Step 3: Extract labels and data for the chart
// const allCategories = topCategories?.map((item) => item?.category);
// const allAmounts = topCategories?.map((item) => item?.totalAmount);






const allCategories = Trans?.map((item) => item?.category1)
.slice(0, 6)
const allAmounts = Trans?.map((item) => item?.amount)
.slice(0, 6)

const data = {
  labels: allCategories,
  datasets: [
    {
      label: "Expenses",
      data: allAmounts,
      backgroundColor: "#991B1B"
    }
  ]
};

      
      const options = {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        }
      };

  return (
    <>
    <div className="bg-white text-red-800 p-4 border-red-800 hover:border rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-2">Top 5 Transaction Source</h2>
      <Bar data={data} options={options} />
    </div>
    </>
  )
}

export default ExpenseChart
