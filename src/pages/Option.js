import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { base_url } from '../config';

export const Options = () => {
    const [options, setOptions] = useState({})
    const token = localStorage.getItem("token");
    const [price, setPrice] = useState(0);
    const [bank, setBank] = useState('');
    const [number, setNumber] = useState('');
    const navigate = useNavigate()
    const fetchOptions = async ()=>{
        try {
            const response = await axios.get(`${base_url}admin/options`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setOptions(response.data);
        } catch (error) {
            console.error('Failed to fetch category:', error);
            navigate('/login')
        }
    }

    const changeShipping = async (price) => {
        try {
          await axios.post(
            `${base_url}admin/edit/shipping`,
            { price},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          fetchOptions();
        } catch (error) {
          console.error("Failed to change order status:", error);
          navigate('/login')
        }
      };

      const changeBank = async (bank) => {
        try {
          await axios.post(
            `${base_url}admin/edit/bank/name`,
            { bank},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          fetchOptions();
        } catch (error) {
          console.error("Failed to change order status:", error);
          navigate('/login')
        }
      };


      const changeNumber = async (number) => {
        try {
          await axios.post(
            `${base_url}admin/edit/bank/number`,
            { number},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          fetchOptions();
        } catch (error) {
          console.error("Failed to change order status:", error);
          navigate('/login')
        }
      };

    useEffect(()=>{
        fetchOptions()
    },[])
  return (
    <div className='flex'>
        <Sidebar/>
        <div className='ml-64 p-8 w-full'>
            <h2 className='text-2xl font-semibold'>Options</h2>
            <div className='flex items-center justify-between'>
                <div className='flex'>
                    <h2 className='text-md font-semibold'>Shipping Price:</h2>
                    <h2 className='text-md ml-4 font-semibold'>{Number(options.shipping).toLocaleString('ko-KR')}₩</h2>
                </div>
                <div className='flex'>
                    <input type="number" value={price}  className="px-4 w-full py-2 mr-2 rounded-md shadow-sm border border-gray-300 focus:border-blue-500 focus:outline-none" name="price" placeholder='Shipping Price' onChange={(e)=> setPrice(e.target.value)} />
                    <button onClick={()=> changeShipping(price)} className='p-2 px-4 shadow-md bg-green-300 hover:bg-green-400 rounded-md'>Edit</button>
                </div>
            </div>
            <div className='flex mt-4 items-center justify-between'>
                <div className='flex'>
                    <h2 className='text-md font-semibold'>Bank name:</h2>
                    <h2 className='text-md ml-4 font-semibold'>{options.bank}</h2>
                </div>
                <div className='flex'>
                    <input type="text" value={bank}  className="px-4 w-full py-2 mr-2 rounded-md shadow-sm border border-gray-300 focus:border-blue-500 focus:outline-none" name="price" placeholder='Bank' onChange={(e)=> setBank(e.target.value)} />
                    <button onClick={()=> changeBank(bank)} className='p-2 px-4 shadow-md bg-green-300 hover:bg-green-400 rounded-md'>Edit</button>
                </div>
            </div>
            <div className='flex mt-2 items-center justify-between'>
                <div className='flex'>
                    <h2 className='text-md font-semibold'>Bank Account:</h2>
                    <h2 className='text-md ml-4 font-semibold'>{options.bank_no}</h2>
                </div>
                <div className='flex'>
                    <input type="text" value={number}  className="px-4 w-full py-2 mr-2 rounded-md shadow-sm border border-gray-300 focus:border-blue-500 focus:outline-none" name="price" placeholder='Bank Account' onChange={(e)=> setNumber(e.target.value)} />
                    <button onClick={()=> changeNumber(number)} className='p-2 px-4 shadow-md bg-green-300 hover:bg-green-400 rounded-md'>Edit</button>
                </div>
            </div>
        </div>
    </div>
  )
}
