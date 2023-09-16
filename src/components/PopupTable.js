import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {AiOutlinePlus } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { base_url } from '../config';

const PopupTable = () => {
  
    const token = localStorage.getItem('token');
    const [products, setProducts] = useState([])
    const navigate = useNavigate();

    const fetchNotification = async () => {
        try {
            const response = await axios.get(`${base_url}admin/popup`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data)
            setProducts(response.data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
            navigate('/login')
        }
    }

    useEffect(()=>{
        fetchNotification();
    },[token])
    
    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token'); // Get the token from local storage
            const response = await axios.post(`${base_url}admin/delete/popup`, { id }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    
            if(response.data.message === 'popup deleted successfully.') {
                // Remove the category from your local state so that the UI updates
                fetchNotification();
            } else {
                console.error('Failed to delete popup:', response.data.message);
            }
        } catch (error) {
            console.error('Failed to delete notification:', error);
            navigate('/login')
        }
    }

    const handleChangeStatus = async (id) => {
        try {
            const token = localStorage.getItem('token'); // Get the token from local storage
            const response = await axios.post(`${base_url}admin/change/popup`, { id }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if(response.data.message === 'popup changed successfully.') {
                // Remove the category from your local state so that the UI updates
                fetchNotification();
            } else {
                console.error('Failed to delete popup:', response.data.message);
            }
        } catch (error) {
            console.error('Failed to delete notification:', error);
            navigate('/login')
        }
    }


    


    

    return (
      <div className="p-8 ml-64 bg-white w-full">
        <div className='flex justify-between'>
        <h2 className="text-3xl font-bold ">Popup images</h2>
        <Link to='/add/popup'><button className='bg-gray-200 px-4 py-2 rounded-lg shadow-md hover:bg-green-300 flex justify-center items-center'> <AiOutlinePlus /> Add Popup</button></Link>
        </div>
        <div className="bg-white p-4 rounded-md  mt-4">

          <div className="overflow-x-auto">
            <table className="min-w-full leading-normal rounded-md">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Show
                  </th>
                  
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>

                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index} >
                    <td className="px-3 py-1 border-b border-gray-200 text-sm">
                      <img src={product.image} alt={product.image} className="w-36 h-36  "/>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      {product.show ? <p>True</p>: <p>False</p> }
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <button onClick={()=>handleChangeStatus(product._id)} className="px-4 py-2 mr-2 bg-green-300 text-white rounded hover:bg-green-400">Change</button>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <button onClick={()=>handleDelete(product._id)} className="px-4 py-2 mr-2 bg-red-600 text-white rounded hover:bg-blue-900">Delete</button>
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

export default PopupTable;