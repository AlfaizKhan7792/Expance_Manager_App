import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const ExpenseActivity = ({ Trans }) => {
  // 1. Filter only Debit transactions
  const debitTrans = Trans?.filter((item) => item.type === "Debit");

  // 2. Sort by date (optional)
  debitTrans?.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  // 3. Prepare labels and data
  const labels = debitTrans?.map((t) =>
    new Date(t.createdAt).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short"
    })
  );

  const dataValues = debitTrans?.map((t) => Number(t.amount));

  // 4. Chart data
  const data = {
    labels,
    datasets: [
      {
        label: "Actual Expense",
        data: dataValues,
        borderColor: "#991B1B",
        backgroundColor: "#EF4444",
        tension: 0.4
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
    <div className="bg-white text-red-800 p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-2">Expense Activity</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default ExpenseActivity;
