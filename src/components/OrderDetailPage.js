import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import React from 'react'
import CartTable from "./CartTable";
import OrderInfoTable from "./OrderInfoTable";
import UserInfoTable from "./UserInfoTable";
import axios from "axios";
import { base_url } from '../config';

export const OrderDetailPage = () => {
    const { id } = useParams();
    const token = localStorage.getItem("token");
    const [order, setOrder] = useState({});
    const [cart, setCart] = useState([])
    const navigate = useNavigate()

    const fetchOrder = async () => {
        try {
            const response = await axios.get(`${base_url}admin/order/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setOrder(response.data);
            setCart(response.data.cart);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
            navigate('/login')
        }
    };

    const changeStatusOrder = async (id, status) => {
        try {
          await axios.put(
            `${base_url}admin/order/status`,
            { id, status },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
      
          let msg = "";
          let phone = order.user_id;

    // Check if the status is Confirmed or Processing and assign the appropriate message
    if (status === "Confirmed") {
      msg = `Great news! Your order with ID ${order.order_id} has been confirmed. We are now preparing it for processing. Thank you for your purchase.`;
    } else if (status === "Processing") {
      msg = `We're happy to inform you that your order with ID ${order.order_id} is currently being processed. Our team is working diligently to ensure its timely delivery.`;
    }

    if (msg !== "") {
      await axios.post(
        `${base_url}admin/send/message`,
        { phone, msg },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
      
          fetchOrder();
        } catch (error) {
          console.error("Failed to change order status:", error);
          navigate('/login')
        }
      };

    useEffect(() => {
        fetchOrder();
    }, [id, token]);

    if (!order || !order.cart ) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-8 ml-64 bg-white w-full">
            <div className="flex justify-between">
                <h2 className="text-3xl font-bold mb-4">Order ID: {order && order.order_id}</h2>
                
                <div className="flex px-2 p-2">
                <button className="p-2 mr-2 bg-gray-800 rounded-md shadow-lg hover:bg-black text-white" onClick={() => changeStatusOrder(order._id,"On Hold")}>On Hold</button>
                <button className="p-2 mr-2 bg-blue-300 rounded-md shadow-md hover:bg-blue-500" onClick={() => changeStatusOrder(order._id,"Confirmed")}>Confirmed</button>
                <button className="p-2 mr-2 bg-orange-300 rounded-md shadow-md hover:bg-orange-500" onClick={() => changeStatusOrder(order._id,"Processing")}>Processing</button>
                <button className="p-2 mr-2 bg-green-300 rounded-md shadow-md hover:bg-green-500" onClick={() => changeStatusOrder(order._id,"Delivered")}>Delivered</button>
                <button className="p-2 mr-2 bg-red-300 rounded-md shadow-md hover:bg-red-500" onClick={() => changeStatusOrder(order._id,"Canceled")}>Canceled</button>
            </div>
            </div>
            <h2 className="text-lg font-semibold mb-4">Status: {order && order.status}</h2>
            
            <CartTable cart={cart} order={order} />
            <OrderInfoTable order={order} />
            <div className="mt-8">
                <div>
                    <h2 className="font-bold text-xl">Address</h2>
                    {order.address && (
                        <p>{order.address}</p>
                    )}
                </div>
                <div className="mt-8">
                    <h2 className="font-bold text-xl">Order Note</h2>
                    <p>{order.shippingReq}</p>
                </div>
            </div>
            <UserInfoTable order={order} />
            <div className="mb-12"></div>
        </div>
    );
};
