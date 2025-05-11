import {useSelector} from "react-redux"

const IncomeList = () => {

  const {Trans} = useSelector(state => state.Admin)

    const incomeList = Trans?.filter((item) => item?.type === "Credit")

  return (
    <>
       <div className="bg-white p-4 rounded-xl shadow hover:border hover:border-red-800">
      <h2 className="text-lg text-red-800 font-semibold mb-2">Recent Incomenses</h2>
      <ul className="space-y-3">
        {incomeList?.map((item, i) => (
          <li key={i} className="flex justify-between text-sm hover:bg-gray-300 hover:p-2 hover:rounded-md p-1 duration-300 text-gray-700">
            <div>
              <div className="font-medium">{new Date(item?.createdAt).toLocaleDateString()}</div>
              <div className="text-xs text-gray-400">{item?.createdAt}</div>
            </div>
            <div className="font-semibold">{item?.amount}</div>
          </li>
        ))}
      </ul>
    </div> 
    </>
  )
}

export default IncomeList
