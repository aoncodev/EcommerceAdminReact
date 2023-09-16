import React, { useState } from 'react';
import axios from 'axios'; // import axios
import { useNavigate } from 'react-router-dom';
import { base_url } from '../config';

export const Login = () => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [isError, SetError] = useState(false);
    const [error, SetErr] = useState("");

    const handleSubmit = async e => {
        e.preventDefault();
        console.log(base_url)
        try {
            const response = await axios.post(`${base_url}admin/login`, {
                phone,
                password,
            });
            if(response.status === 200){
                // Store the token and user data in localStorage
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                
                // Navigate to home page
                navigate('/');
            }
            else {
                SetError(true);
                SetErr("Please check password or phone number");
            }
            // do something with the token
        } catch (error) {
            
                SetError(true);
                SetErr("Please check password or phone number");
            
        }
    };

    return (
        <div className='flex w-screen h-screen items-center justify-center bg-slate-50'>
            <div className=' flex w-[40%] h-[50%] items-center justify-center bg-white shadow-md rounded-lg'>
                <div className='flex flex-col justify-center items-center'>
                <h2 className='font-semibold'>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <h2 className='font-semibold mt-4'>Enter admin or manager phone number</h2>
                        <div className='flex flex-col items-center justify-between  mt-4'>
                            <input type="text" value={phone} onChange={e => setPhone(e.target.value)} className="px-4 w-full py-2  rounded-md shadow-sm border border-gray-300 focus:border-blue-500 focus:outline-none" name="phone" placeholder='Phone' />  
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="px-4 w-full py-2 mt-4 rounded-md shadow-sm border border-gray-300 focus:border-blue-500 focus:outline-none" name="password" placeholder='Password' />  
                             {isError && <p className='mt-4 text-red-400 text-md font-semibold'>{error}</p>}
                            <button type="submit" className='p-2 bg-green-300 rounded-md shadow-md hover:bg-green-400 mt-2 px-8'>Login</button>
                        </div>    
                    </form>
                </div>
            </div>
        </div>
    );
}
