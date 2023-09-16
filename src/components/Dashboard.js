import React, { useEffect, useState } from 'react';
import { AiOutlineCreditCard, AiOutlineBank, AiOutlineUser, AiOutlineShoppingCart } from 'react-icons/ai';

import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js';
import { CategoryScale, LinearScale, PointElement } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { base_url } from '../config';


// Register the scale
Chart.register(CategoryScale, LinearScale ,PointElement);


const Dashboard = () => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const [mostOrder, SetMostOrder] = useState([]);
    const [recentOrder, SetRecentOrder] = useState([]);
    const [paymentTotal, setPaymentTotal] = useState({});


    const fetchRecentOrdered = async (token) => {
        try {
            const response = await axios.get(`${base_url}admin/recent/orders`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data)
            SetRecentOrder(response.data);
        } catch (error) {
            console.error('Failed to fetch data:', error);
            navigate('/login')
        }
    }

    const fetchpaymentType = async (token) => {
        try {
            const response = await axios.get(`${base_url}admin/total/payment`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data)
            setPaymentTotal(response.data);
        } catch (error) {
            console.error('Failed to fetch data:', error);
            navigate('/login')
        }
    }


    const fetchMostOrdered = async (token) => {
        try {
            const response = await axios.get(`${base_url}admin/most/ordered`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data)
            SetMostOrder(response.data);
        } catch (error) {
            console.error('Failed to fetch data:', error);
            navigate('/login')
        }
    }

    useEffect(()=>{
        fetchMostOrdered(token);
        fetchRecentOrdered(token);
        fetchpaymentType(token);
    },[token])

    // Sample sales data
    const salesData = {
      card: 12000,  // $12000 in sales via card
      bankTransfer: 8000,  // $8000 in sales via bank transfer
    };

    const navigate = useNavigate(); 

    const handleLogout = () => {
        // Clear local storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Navigate to login page
        navigate('/login');
    };


  
    return (
        <div className="ml-64 w-full p-8 bg-white">
            <div className='flex justify-between'>
            <h2 className="text-3xl  font-bold mb-4">Dashboard</h2>
            <div className='flex  items-center'>
                <p className='text-md font-semibold'>Welcome {user && user.name}!</p>
                <button onClick={handleLogout}  className='ml-4 p-2 px-4 bg-black text-white hover:shadow-green-300 hover:shadow-lg rounded-md shadow-md'>Logout</button>
            </div>
            </div>
        
        
        {/* Sales report */}
        <div className="grid grid-cols-3 gap-4 mb-8 px-4 mt-8">

            <div className="bg-green-300 p-4 rounded-lg shadow-lg">
                <h3 className="text-xl mb-2 font-semibold"><AiOutlineBank className="inline-block mr-2" /> Sales (Bank Transfer)</h3>
                <p className='font-bold'>{Number(paymentTotal.directTotal).toLocaleString('ko-KR')}₩</p>
            </div>

            <div className="bg-green-300 p-4 rounded-lg shadow-lg">
                <h3 className="text-xl mb-2 font-semibold"><AiOutlineCreditCard className="inline-block mr-2" /> Total</h3>
                <p className='font-bold'>{Number(paymentTotal.total).toLocaleString('ko-KR')}₩</p>
            </div>
        </div>

  
        {/* Most ordered users */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
    <h3 className="text-xl mb-4 font-semibold">
        <AiOutlineUser className="inline-block mr-2" /> Most Ordered Users
    </h3>
    <div className="overflow-auto max-h-[calc(15*2.5rem)]"> {/* Adjust this line */}
        <table className="min-w-full leading-normal rounded-md">
            <thead>
                <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-slate-50 text-left text-xs font-semibold text-black uppercase tracking-wider">
                        #
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-slate-50 text-left text-xs font-semibold text-black uppercase tracking-wider">
                        Phone
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-slate-50 text-left text-xs font-semibold text-black uppercase tracking-wider">
                        User
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-slate-50 text-left text-xs font-semibold text-black  uppercase tracking-wider">
                        Number of Orders
                    </th>
                </tr>
            </thead>
            <tbody>
                {mostOrder.map((user, index) => (
                    <tr key={index}>
                        <td className="px-5 py-5 border-b border-gray-200 text-sm">
                            {index+1}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 text-sm">
                            {user.phone}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 text-sm">
                            {user.username}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 text-sm">
                            {user.count}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>


      {/* Recent orders */}
      <div className="bg-white p-4 mt-8 rounded-lg shadow-lg">
        <h3 className="text-xl mb-2 font-semibold"><AiOutlineShoppingCart className="inline-block mr-2" /> Recent Orders</h3>
        <table className="min-w-full leading-normal rounded-md">
                    <thead>
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-slate-50 text-left text-xs font-semibold text-black uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-slate-50 text-left text-xs font-semibold text-black uppercase tracking-wider">
                                Order ID
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-slate-50 text-left text-xs font-semibold text-black uppercase tracking-wider">
                                User
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-slate-50 text-left text-xs font-semibold text-black uppercase tracking-wider">
                                Total
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-slate-50 text-left text-xs font-semibold text-black uppercase tracking-wider">
                                Status
                            </th>
                        </tr>
                    </thead>
          <tbody>
            {recentOrder.map((order, index) => (
              <tr key={index}>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">{order.date}</td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">{order._id}</td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">{order.receiver_name}</td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">{Number(order.total).toLocaleString('ko-KR')} ₩</td>
                {order.status === 'On Hold' && <td className="px-5 py-5 border-b border-gray-200 text-sm"><button className='bg-black text-white p-2 flex px-2 items-center justify-center shadow-md rounded-md hover:shadow-green-300'>{order.status}</button></td>}
                {order.status === 'Confirmed' && <td className="px-5 py-5 border-b border-gray-200 text-sm"><button className='bg-blue-300 text-black p-2 flex px-2 items-center justify-center shadow-md rounded-md hover:shadow-green-300'>{order.status}</button></td>}
                {order.status === 'Processing' && <td className="px-5 py-5 border-b border-gray-200 text-sm"><button className='bg-yellow-300 text-black p-2 flex px-2 items-center justify-center shadow-md rounded-md hover:shadow-green-300'>{order.status}</button></td>}
                {order.status === 'Delivered' && <td className="px-5 py-5 border-b border-gray-200 text-sm"><button className='bg-green-300 text-black p-2 flex px-2 items-center justify-center shadow-md rounded-md hover:shadow-green-300'>{order.status}</button></td>}
                {order.status === 'Canceled' && <td className="px-5 py-5 border-b border-gray-200 text-sm"><button className='bg-black text-white p-2 flex px-2 items-center justify-center shadow-md rounded-md hover:shadow-green-300'>{order.status}</button></td>}
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>


    );
  };
  
  export default Dashboard;
  