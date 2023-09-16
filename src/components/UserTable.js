import axios from 'axios';
import React, { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { base_url } from '../config';


const UserPage = () => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("All");
    const status = ["All", "Activated", "Not Activated"]
    const navigate = useNavigate()

    const fetchUsers = async (token) => {
        try {
            const response = await axios.get(`${base_url}admin/users`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUsers(response.data);
            setFilteredUsers(response.data);
        } catch (error) {
            console.error('Failed to fetch data:', error);
            navigate('/login')
        }
    }

    useEffect(()=>{
        fetchUsers(token);
    },[])

    const handleStatus = (e) => {
        setSelectedStatus(e.target.value);

        if(e.target.value === "All"){
            setFilteredUsers(users);
        } else if(e.target.value === "Activated"){
            setFilteredUsers(users.filter(user => user.activated));
        } else if(e.target.value === "Not Activated"){
            setFilteredUsers(users.filter(user => !user.activated));
        }
    }

    return (
      <div className="p-8 ml-64 w-full bg-white">
        <div className='flex items-center justify-between'>
            <div className='flex items-center'><h2 className="text-3xl font-bold mb-4">Users</h2>
        <h2 className='text-xl mb-2 ml-2 font-semibold text-gray-600'> {users && users.length}</h2> </div>
        <div className='flex justify-between items-center mt-6'>
            <h2 className='text-md font-medium mr-3'>Sort by:</h2>
            <select 
                value={selectedStatus}
                onChange={handleStatus}
                className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-blue-500"
            >
                {status.map((category, index) => (
                    <option key={index} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>
        
        </div>
        
        
        <div className="bg-white p-4 rounded-md shadow-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full leading-normal rounded-md">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Account Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={index}>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      {index+1}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      {user.phone}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm flex items-center">
                      {user.activated ?<div className='p-1 bg-green-300 rounded-full shadow-sm w-1 h-1 mr-2'></div>: <div className='p-1 bg-red-300 rounded-full shadow-sm w-1 h-1 mr-2'></div> } {user.activated ? 'Account Activated': "Account not Activated"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
};

export default UserPage;
