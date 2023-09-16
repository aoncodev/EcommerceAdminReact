import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { base_url } from '../config';
import { format } from 'date-fns'; // Import the format function from date-fns


const OrderPage = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${base_url}admin/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(response.data);
      setFilteredOrders(response.data);
    } catch (error) {

      console.error("Failed to fetch orders:", error);
      navigate('/login')
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleSortChange = (e) => {
    const status = e.target.value;

    if (status === "") {
      setFilteredOrders(orders); // Reset to original dataset
    } else {
      const filtered = orders.filter((order) => order.status === status);
      setFilteredOrders(filtered);
    }
  };

  return (
    <div className="bg-white ml-64 p-8 w-full">
      <h2 className="font-bold text-2xl">Order Page</h2>
      <div className="flex justify-end">
        <div className="flex mr-2">
          <p className="px-2">Sort by: </p>
          <select onChange={handleSortChange}>
            <option value="">All</option>
            <option value="On Hold">On Hold</option>
            <option value="Processing">Processing</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Delivered">Delivered</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
      </div>
      <div className="bg-white p-4 rounded-md mt-4">
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal rounded-md">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, index) => (
                  <tr key={index} className={order.status === "Delivered" ? "bg-gray-100" : ""}>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    {order.order_id}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                  {format(new Date(order.createdAt), 'MM/dd/yyyy HH:mm:ss')} {/* Format the date */}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    {order.receiver_name}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    {order.user_id}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    {order.total}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    {order.payment_type}
                  </td>
                  {order.status === 'On Hold' &&
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                     <button
                      className="px-4 py-2 bg-black text-white rounded shadow-md hover:shadow-green-300"
                      onClick={() => navigate(`/order/${order._id}`)}
                    >
                      On Hold
                    </button>
                    
                   
                    
                  </td>}
                  {order.status === 'Confirmed' &&
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                     <button
                      className="px-4 py-2 bg-blue-300 text-black rounded shadow-md hover:bg-blue-400"
                      onClick={() => navigate(`/order/${order._id}`)}
                    >
                      Confirmed
                    </button>
                    
                   
                    
                  </td>}
                  {order.status === 'Processing' &&
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                     <button
                      className="px-4 py-2 bg-orange-300 text-black rounded shadow-md hover:bg-orange-400"
                      onClick={() => navigate(`/order/${order._id}`)}
                    >
                      Processing
                    </button>
                    
                   
                    
                  </td>}

                  {order.status === 'Delivered' &&
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                     <button
                      className="px-4 py-2 bg-green-300 text-black rounded shadow-md hover:bg-green-400"
                      onClick={() => navigate(`/order/${order._id}`)}
                    >
                      Delivered
                    </button>
                    
                   
                    
                  </td>}
                  {order.status === 'Canceled' &&
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                     <button
                      className="px-4 py-2 bg-red-300 text-black rounded shadow-md hover:bg-red-400"
                      onClick={() => navigate(`/order/${order._id}`)}
                    >
                      Canceled
                    </button>
                    
                   


                    
                  </td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
