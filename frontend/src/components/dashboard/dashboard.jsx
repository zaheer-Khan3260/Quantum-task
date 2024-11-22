import React, { useState, useEffect } from 'react';
import { Settings, X } from 'lucide-react';

const Dashboard = () => {
  const [value, setValue] = useState([]);

  useEffect(() => {
    try {
      const item = localStorage.getItem('userData');
      setValue(item ? JSON.parse(item.user) : []);
    } catch (error) {
      console.error("Error retrieving data from localStorage:", error);
      setValue([]);
    }
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-500';
      case 'suspended':
        return 'bg-red-500';
      case 'inactive':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h1 className='text-2xl bg-blue-600 w-full p-3 text-gray-300 mb-6'>Dashboard</h1>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full bg-white">
          <thead>
            <tr className="text-left text-gray-600 border-b">
              <th className="p-4 font-medium">ID</th>
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Date Of Birth</th>
              <th className="p-4 font-medium">Email</th>
              <th className="p-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {value.length > 0 ? value.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="p-4">{user._id}</td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    {user.name}
                  </div>
                </td>
                <td className="p-4">{user.dob}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full`}></div>
                    <span className="capitalize">{user.email}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button className="p-2 text-blue-500 hover:bg-blue-100 rounded">
                      <Settings size={18} />
                    </button>
                    <button className="p-2 text-red-500 hover:bg-red-100 rounded">
                      <X size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">
                  No user data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
