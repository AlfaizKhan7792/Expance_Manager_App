import { useState } from 'react';
import { useSelector } from 'react-redux';

const UserTrans = () => {

 const [searchTerm, setSearchTerm] = useState('');
  const [matchedUser, setMatchedUser] = useState(null);

const {Users , Trans} = useSelector(state => state.Admin)

  const handleSearch = () => {
    const foundUser = Users.find(
      (user) =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setMatchedUser(foundUser || null);
  };

  // Filter transactions belonging to the matched user
  const userTransactions = matchedUser
    ? Trans.filter((txn) => txn.user === matchedUser._id)
    : [];

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-start p-4 bg-gray-100">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-md text-center mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Search User</h2>

        <input
          type="text"
          placeholder="Enter name or email"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button
          onClick={handleSearch}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition duration-200"
        >
          Search
        </button>
      </div>

      {/* Show transactions */}
      {matchedUser ? (
        <div className="w-full max-w-4xl">
          <h3 className="text-xl font-bold mb-4 text-center">
            Transactions for {matchedUser.name}
          </h3>

          {userTransactions.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {userTransactions.map((txn, idx) => (
                <div
                  key={idx}
                  className="bg-white shadow-lg rounded-xl p-4 border border-gray-200 hover:shadow-xl transition"
                >
                  <p className="text-sm text-gray-600">
                    <strong>Type:</strong> {txn.type}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Amount:</strong> ₹{txn.amount}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Date:</strong>{' '}
                    {new Date(txn.date).toLocaleDateString()}
                  </p>
                  {txn.note && (
                    <p className="text-sm text-gray-600">
                      <strong>Note:</strong> {txn.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No transactions found for this user.
            </p>
          )}
        </div>
      ) : (
        searchTerm && (
          <p className="text-red-500 text-center">No user found with that name or email.</p>
        )
      )}
    </div>
    </>
  )
}

export default UserTrans
