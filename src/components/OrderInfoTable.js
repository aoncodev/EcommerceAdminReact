import React, { useState, useEffect } from 'react';
import {AiOutlinePlus } from 'react-icons/ai';
import { Link } from 'react-router-dom';


const OrderInfoTable = ({order}) => {
    // Replace this with your actual product data
    

    


    

    return (
      <div className="mt-8 bg-white w-full">
        
        <div className='flex justify-between'>
        <h2 className="text-2xl font-bold ">Order Info</h2>
        </div>
        {order && (
        <div className="bg-white p-4 rounded-md  mt-4">

          <div className="overflow-x-auto">
          <table
            id="order-table"
            className="min-w-full leading-normal rounded-md"
          >
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                   Address
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Orders
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Sender
                  </th>
              
                </tr>
              </thead>
              <tbody>
                
                  <tr  >
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      {order.order_id}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      {order.user_id}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      {order.receiver_name}
                    </td>
                    {order.address &&  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      {order.address}
                    </td>}
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
  {order.cart.map((product) => `${product.product_name} (${product.weight} x ${product.quantity})`).join(", ")}
</td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      Surxon
                    </td>

                  </tr>
                
              </tbody>
            </table>
          </div>
        </div>)}
      </div>
    );
};

export default OrderInfoTable;