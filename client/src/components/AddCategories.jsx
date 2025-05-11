import BackButton from "./BackButton";

const AddCategories = (url) => {
  return (

    
    <div className="min-h-[89.6vh] bg-gradient-to-br from-[#FFFFF0] to-[#666666] text-[#333333] flex items-center justify-center">
<div className="w-full max-w-md bg-[#FFFFF0] p-8 rounded-xl shadow-xl transform transition duration-300 hover:scale-105">
<span className="flex  justify-between"><BackButton url={"/add-transaction"} />
  <h2 className="text-2xl font-bold mb-6 text-center text-[#800020]">
    Add Categories
  </h2></span>
  <form className="space-y-6">
    <div>
      <label
        htmlFor="category"
        className="block text-sm font-medium mb-2 text-[#333333]"
      >
        Field:
      </label>
      <input
        type="text"
        id="category"
        placeholder="Example: Adani Shares Profit"
        className="w-full px-4 py-3 rounded-lg border border-[#666666] bg-[#FFFFF0] focus:outline-none focus:ring-2 focus:ring-[#800020] transition"
      />
    </div>
      {/* Select Input */}
      <div>
            <label htmlFor="type" className="block text-sm font-medium mb-1 text-[#333333]">
              Transaction Type
            </label>
            <select
              id="type"
              className="w-full px-4 py-2 rounded-lg border border-[#666666] bg-[#FFFFF0] focus:outline-none focus:ring-2 focus:ring-[#800020] transition"
            >
              <option value="credit" className="w-full px-4 py-2 rounded-lg border border-[#666666] dark:border-[#FFFFF0] bg-[#F9F9F9] dark:bg-[#4D4D4D] focus:outline-none focus:ring-2 focus:ring-[#800020] transition">Credit</option>
              <option value="debit" className="w-full px-4 py-2 rounded-lg border border-[#666666] dark:border-[#FFFFF0] bg-[#F9F9F9] dark:bg-[#4D4D4D] focus:outline-none focus:ring-2 focus:ring-[#800020] transition">Debit</option>
            </select>
          </div>
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
</div>

  );
};

export default AddCategories;
