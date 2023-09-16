import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {AiOutlinePlus } from 'react-icons/ai';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { base_url } from '../config';



const ProductPage = () => {
    const { name } = useParams();
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const navigate = useNavigate();

    const fetchProducts = async (name) => {
        try {
            const response = await axios.get(`${base_url}admin/products/${name}`, {
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

    

    const fetchCategory = async () => {
        try {
            const response = await axios.get(`${base_url}admin/category`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCategories(response.data);
            setSelectedCategory(response.data[0]);
        } catch (error) {
            console.error('Failed to fetch category:', error);
            navigate('/login')
        }
    }

    const updateAvail = async (id) => {
        try {
            const response = await axios.get(`${base_url}admin/products/avail/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log()
            fetchProducts(name);
        } catch (error) {
            console.error('Failed to fetch category:', error);
            navigate('/login')
        }
    }

    const deleteProd = async (id) => {
        try {
            const response = await axios.delete(`${base_url}admin/delete/product/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchProducts(name);
        } catch (error) {
            fetchProducts(name);
            console.error('Failed to fetch category:', error);
            navigate('/login')
        }
    }
  
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        fetchProducts(name);
        fetchCategory();
        setSelectedCategory(name);
    }, [name, token]);


    const handleEdit = async (id)=>{
        navigate(`/edit/product/${id}`)
    }


    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        if (selectedCategory !== null) {
            if (e.target.value == "all") {
                navigate('/products/all')
                fetchProducts(e.target.value)
            } else {
                navigate(`/products/${e.target.value}`)
                fetchProducts(e.target.value)
            }
            
        } else {
            fetchProducts(name);
        }
    };

    return (
      <div className="p-8 ml-64 bg-white w-full">
        <div className='flex justify-between'>
        <h2 className="text-3xl font-bold ">Products</h2>
        
        <button className='bg-gray-200 px-4 py-2 rounded-lg shadow-md hover:bg-green-300 flex justify-center items-center' onClick={()=> navigate('/add/products')}> <AiOutlinePlus /> Add Product</button>
        </div>
        <div className='flex items-center'>
            <h1>Total products: {products && products.length}</h1>
        </div>
        <div className='flex justify-between mt-6'>
            <h2 className='text-xl font-medium'>Choose Category</h2>
            <select 
                value={name}
                onChange={handleCategoryChange}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            >
                <option value="all">All</option>
                {categories.map((category, index) => (
                    <option key={index} value={category.name_en}>
                        {category.name_en}
                    </option>
                ))}
            </select>
        </div>


        <div className="bg-white p-4 rounded-md  mt-4">

          <div className="overflow-x-auto">
            <table className="min-w-full leading-normal rounded-md">
              <thead>
                <tr>
                  <th className="px-3 py-1 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-3 py-1 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-3 py-1 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-3 py-1 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-3 py-1 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Fixed Price
                  </th>
                  
                  <th className="px-3 py-1 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-3 py-1 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    In Stock
                  </th>
                  <th className="px-3 py-1 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-3 py-1 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Edit
                  </th>
                  <th className="px-3 py-1 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index} className={product.avail ? 'bg-white' : 'bg-red-50'}>
                    <td className="px-3 py-1 border-b border-gray-200 text-sm">
                      {index+1}
                    </td>
                    <td className="px-3 py-1 border-b border-gray-200 text-sm">
                      <img src={product.images[0]} alt={product.title_en} className="w-20 h-20"/>
                    </td>
                    <td className="px-3 py-1 border-b border-gray-200 text-sm">
                      {product.title_en}
                    </td>
                    <td className="px-3 py-1 border-b border-gray-200 text-sm">
                      {product.price}
                    </td>
                    <td className="px-3 py-1 border-b border-gray-200 text-sm">
                      {product.fixed_price}
                    </td>
                    <td className="px-3 py-1 border-b border-gray-200 text-sm">
                      {product.category_en}
                    </td>
                    <td className="px-3 py-1 border-b border-gray-200 text-sm">
                      {product.avail ? 'Yes' : 'No'}
                    </td>
                    <td className="px-3 py-1 border-b border-gray-200 text-sm">
                    <button onClick={()=> updateAvail(product._id)} className="px-4 py-2 mr-2 bg-green-300 text-black rounded hover:bg-green-400">Status</button>
                    </td>
                    <td className="px-3 py-1 border-b border-gray-200 text-sm">
                    <button onClick={()=> handleEdit(product._id)} className="px-4 py-2 mr-2 bg-blue-300 text-black rounded hover:bg-blue-400">Edit</button>
                    </td>
                    <td className="px-3 py-1 border-b border-gray-200 text-sm">
                    <button onClick={()=> deleteProd(product._id)} className="px-4 py-2 bg-red-300 text-black rounded hover:bg-red-400">Delete</button>
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

export default ProductPage;
