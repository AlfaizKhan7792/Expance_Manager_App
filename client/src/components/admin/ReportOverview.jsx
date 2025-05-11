import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// ✅ Register required elements for Doughnut charts
ChartJS.register(ArcElement, Tooltip, Legend);

const ReportOverview = ({totalIncome, totalExpense , totalBalance}) => {


const data = {
  labels: ["Income", "Expense", "Savings"],
  datasets: [
    {
      label: "Report",
      data: [totalIncome, totalExpense, totalBalance],
      backgroundColor: ["#22c55e", "#f97316", "#3b82f6"],
    },
  ],
};

  return (
    <div className="bg-white text-red-800 p-4 border-red-800 hover:border rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-2">Report Overview</h2>
      <Doughnut data={data} />
    </div>
  );
}


export default ReportOverview
