import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {AiOutlinePlus } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { base_url } from '../config';

const GroupCategoryTable = () => {
    // Replace this with your actual product data
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const [categories, setCategories] = useState([])
    const navigate = useNavigate();
    
    const fetchCategory = async () => {
        try {
            const response = await axios.get(`${base_url}admin/subcategory`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCategories(response.data);
        } catch (error) {
            console.error('Failed to fetch category:', error);
            navigate('/login')
        }
    }

    useEffect(()=>{
        fetchCategory()
    },[])


    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token'); // Get the token from local storage
            const response = await axios.post(`${base_url}admin/delete/subcategory`, { id }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    
            if(response.data.message === 'Category deleted successfully.') {
                // Remove the category from your local state so that the UI updates
                fetchCategory();
            } else {
                console.error('Failed to delete category:', response.data.message);
            }
        } catch (error) {
            console.error('Failed to delete category:', error);
            navigate('/login')
        }
    }
    

    return (
      <div className="p-8 ml-64 bg-white w-full">
        <div className='flex justify-between'>
        <h2 className="text-3xl font-bold ">Group Category</h2>
        <Link to='/add/group/category'><button className='bg-gray-200 px-4 py-2 rounded-lg shadow-md hover:bg-green-300 flex justify-center items-center'> <AiOutlinePlus /> Add Group</button></Link>
        </div>
        <div className="bg-white p-4 rounded-md  mt-4">

          <div className="overflow-x-auto">
            <table className="min-w-full leading-normal rounded-md">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name EN
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name UZ
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name RU
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name KO
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories.map((product, index) => (
                  <tr key={index} >
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      {index+1}
                    </td>
                    <td className="px-3 py-1 border-b border-gray-200 text-sm">
                      <img src={product.image} alt={product.name_en} className="w-20 h-20"/>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      {product.name_en}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      {product.name_uz}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      {product.name_ru}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      {product.name_ko}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <button onClick={()=> handleDelete(product._id)} className="px-4 py-2 mr-2 bg-red-600 text-white rounded hover:bg-blue-900">Delete</button>
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

export default GroupCategoryTable;