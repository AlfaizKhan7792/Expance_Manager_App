import { motion } from "framer-motion"; 

const SummaryCard = ({ title, value, highlight }) => {
  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`p-4 bg-white rounded-xl duration-300 shadow hover:shadow-md transition border-l-4 border-gray-200 ${
        highlight ? "hover:border-red-800" : "hover:border-gray-300"
      } group `}
    >
      <div className="text-sm text-gray-500 group-hover:text-red-800">{title}</div>
      <div className="text-xl font-bold group-hover:text-red-800 mt-1">{value}</div>
    </motion.div>
    </>
  )
}

export default SummaryCard
