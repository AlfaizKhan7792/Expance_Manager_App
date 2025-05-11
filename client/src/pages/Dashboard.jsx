import { useEffect } from "react";
import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/Topbar";
import SummaryCard from "../components/admin/SummaryCard";
import ExpenseChart from "../components/admin/ExpenseChart";
import ReportOverview from "../components/admin/ReportOverview";
import ExpenseActivity from "../components/admin/ExpenseActivity";
import ExpenseList from "../components/admin/ExpenseList";
import { useDispatch, useSelector } from "react-redux";
import { GetAllTrans, GetAllUsers } from "../features/Admin/AdminSlice";
import { useNavigate } from "react-router-dom";
// import LoadingPage from "./LoadingPage";
import IncomeList from "../components/admin/IncomeList";

const Dashboard = () => {

  const {All_Users} = useSelector(state => state.Auth)
  const {Users , Trans , isError , message} = useSelector((state) => state.Admin)
const navigate = useNavigate()
const dispatch = useDispatch()

  // console.log(Users , Trans)

  const totalIncome = (Trans || [])
  .filter((item) => item?.type === "Credit")
  .reduce((sum, item) => sum + Number(item?.amount), 0);

const totalExpense = (Trans || [])
  .filter((item) => item?.type === "Debit")
  .reduce((sum, item) => sum + Number(item?.amount), 0);

const totalBalance = totalIncome - totalExpense;


  useEffect(() =>{
    if(!All_Users){
navigate("/login")
    }else{
      navigate("/dashboard")
    }
    dispatch(GetAllUsers())
    dispatch(GetAllTrans())
  },[All_Users , isError , message])

  // if(isLoading){
  //   return <LoadingPage />
  // }

  return (
    <>
    {/* <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <Topbar />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <SummaryCard value={Users?.length} title="Total Users"  highlight />
          <SummaryCard value={Trans?.length} title="Total Transactions"  highlight />
          <SummaryCard value={totalIncome} title="Total Income"  highlight />
          <SummaryCard title="Total Expense" value={totalExpense}  highlight />
          <SummaryCard title="Total Savings" value={totalBalance} highlight />
        </div>
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ExpenseChart Trans={Trans} />
          <ReportOverview totalIncome={totalIncome} totalExpense={totalExpense} totalBalance={totalBalance} />
        </div>
          <ExpenseActivity />
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ExpenseList Trans={Trans} />
          <IncomeList Trans={Trans} />
        </div>
      </div>
    </div> */}

    <div className="flex h-screen overflow-hidden duration-300">
  <div className="w-1/5 h-screen fixed top-0 left-0 z-20">
    <Sidebar />
  </div>

  <div className="w-4/5 ml-[20%] overflow-y-auto p-6">
    <Topbar />

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      <SummaryCard value={Users?.length} title="Total Users" highlight />
      <SummaryCard value={Trans?.length} title="Total Transactions" highlight />
      <SummaryCard value={totalIncome} title="Total Income" highlight />
      <SummaryCard title="Total Expense" value={totalExpense} highlight />
      <SummaryCard title="Total Savings" value={totalBalance} highlight />
    </div>

    <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ExpenseChart Trans={Trans} />
      <ReportOverview totalIncome={totalIncome} totalExpense={totalExpense} totalBalance={totalBalance} />
    </div>

    <ExpenseActivity Trans={Trans} />

    <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ExpenseList />
      <IncomeList />
    </div>
  </div>
</div>

    </>
  )
}

export default Dashboard
