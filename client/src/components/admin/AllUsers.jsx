import { useState } from 'react';
import {useSelector} from "react-redux"
import { Eye, EyeOff, ChevronDown, ChevronUp, ArrowUpDown, Download } from 'lucide-react';
import { exportToExcel } from '../../utils/exportToExcel';

export default function AllUsers() {
    const {Users} = useSelector(state => state.Admin)
  const [users, setUsers] = useState(Users);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [passwordVisibility, setPasswordVisibility] = useState({});
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // Export Data in Excel Formate
    const handleExport = () => {
    if (!Users || Users.length === 0) {
      alert("No data to export");
      return;
    }
    exportToExcel(Users, "UserTransactions.xlsx");
  };
 

  // Handle sorting
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedUsers = [...users].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setUsers(sortedUsers);
  };

  // Toggle password visibility
  const togglePasswordVisibility = (userId) => {
    setPasswordVisibility(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  // Handle row selection
  const toggleRowSelection = (userId) => {
    if (selectedRows.includes(userId)) {
      setSelectedRows(selectedRows.filter(id => id !== userId));
    } else {
      setSelectedRows([...selectedRows, userId]);
    }
  };

  // Handle select all
  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(users.map(user => user.id));
    }
    setSelectAll(!selectAll);
  };

  // Masked password display
  const renderPassword = (user) => {
    if (passwordVisibility[user.id]) {
      return (
        <span className="flex items-center">
          {user.password}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              togglePasswordVisibility(user.id);
            }}
            className="ml-2 text-gray-500 hover:text-gray-700"
          >
            <EyeOff size={16} />
          </button>
        </span>
      );
    }
    return (
      <span className="flex items-center">
        {'•'.repeat(Math.min(10, user.password.length))}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            togglePasswordVisibility(user.id);
          }}
          className="ml-2 text-gray-500 hover:text-gray-700"
        >
          <Eye size={16} />
        </button>
      </span>
    );
  };

  // Get sort icon for table headers
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <ArrowUpDown size={16} />;
    return sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 md:p-8">
      {/* Page Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-indigo-800 relative inline-block">
          Welcome To All-Users
          <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></span>
        </h1>
        <p className="text-gray-600 mt-2">Manage and view all registered users in your system</p>
      </div>

      {/* Control Panel */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">

          {/* Action Buttons */}
          <div className="float-end">
            <button 
            onClick={handleExport}
              className={`px-4 py-2 rounded-lg flex items-center ${
                selectedRows.length > 0 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              } transition-colors`}
              disabled={selectedRows.length === 0}
            >
              <Download size={18} className="mr-1" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {selectedRows.length > 0 && (
          <div className="text-sm text-gray-600 mt-2">
            {selectedRows.length} user{selectedRows.length > 1 ? 's' : ''} selected
          </div>
        )}
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={toggleSelectAll}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center space-x-1 hover:text-indigo-800"
                    onClick={() => requestSort('id')}
                  >
                    <span>S.No/ID</span>
                    {getSortIcon('id')}
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center space-x-1 hover:text-indigo-800"
                    onClick={() => requestSort('name')}
                  >
                    <span>Name</span>
                    {getSortIcon('name')}
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center space-x-1 hover:text-indigo-800"
                    onClick={() => requestSort('email')}
                  >
                    <span>Email</span>
                    {getSortIcon('email')}
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Password
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center space-x-1 hover:text-indigo-800"
                    onClick={() => requestSort('date')}
                  >
                    <span>Date/Time</span>
                    {getSortIcon('date')}
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center space-x-1 hover:text-indigo-800"
                    onClick={() => requestSort('time')}
                  >
                    <span>User_ID</span>
                    {getSortIcon('time')}
                  </button>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user, index) => (
                <tr 
                  key={user.id}
                  className={`
                    hover:bg-indigo-50 transition-colors cursor-pointer
                    ${selectedRows.includes(user.id) ? 'bg-indigo-100' : ''}
                  `}
                  onClick={() => toggleRowSelection(user.id)}
                >
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(user.id)}
                        onChange={() => {}} // Handled by row click
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900">{index + 1}</span>
                      <span className="text-xs text-gray-500">{user.id}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-medium">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{renderPassword(user)}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.createdAt}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user._id}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {users.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No users found matching your search criteria</p>
            <button 
              className="mt-4 text-indigo-600 hover:text-indigo-800"
              onClick={() => setUsers(Users)}
            >
              Reset search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}