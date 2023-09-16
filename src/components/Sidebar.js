import React from 'react';

import { AiFillHome, AiOutlineMessage, AiFillBell, AiOutlineQuestionCircle, AiOutlineAppstore, AiOutlineUser, AiOutlineUnorderedList, AiOutlineShoppingCart, AiOutlineSetting, AiOutlineMobile, AiOutlineMail, AiFillFileImage } from "react-icons/ai";
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-slate-50 fixed shadow-md text-black w-64 h-screen px-4 py-5">
        <div className='flex justify-center py-2'>
            <Link to='/'>
        <h2 className="text-3xl font-bold mb-4 justify-center">Admin</h2>
            </Link>
        </div>
      <ul>
        <li className="mb-2">
        <Link to='/users'>
          <div className='flex  items-center bg-gray-100 p-2 rounded-md shadow-sm hover:bg-black hover:text-white hover:shadow-md hover:shadow-green-300'>
            <AiOutlineUser className="inline-block mr-2" /> Users
          </div>
        </Link>
        </li>
        <li className="mb-2">
        <Link to='/products/all'>
          <div className='flex  items-center bg-gray-100 p-2 rounded-md shadow-sm hover:bg-black hover:text-white hover:shadow-md hover:shadow-green-300'>
            <AiOutlineAppstore className="inline-block mr-2" /> Products 
          </div>
          </Link>
        </li>
        <li className="mb-2">
            <Link to='/category'>
          <div className='flex  items-center bg-gray-100 p-2 rounded-md shadow-sm hover:bg-black hover:text-white hover:shadow-md hover:shadow-green-300'>
            <AiOutlineUnorderedList className="inline-block mr-2" /> Category 
          </div>
          </Link>
        </li>
        <li className="mb-2">
        <Link to='/orders'>
          <div className='flex  items-center bg-gray-100 p-2 rounded-md shadow-sm hover:bg-black hover:text-white hover:shadow-md hover:shadow-green-300'>
            <AiOutlineShoppingCart className="inline-block mr-2" /> Orders 
          </div>
          </Link>
        </li>
        <li className="mb-2">
            <Link to="/options">
          <div className='flex  items-center bg-gray-100 p-2 rounded-md hover:bg-black hover:text-white hover:shadow-md hover:shadow-green-300'>
            <AiOutlineSetting className="inline-block mr-2" /> Options 
          </div>
          </Link>
        </li>
        <li className="mb-2">
            <Link to="/message">
          <div className='flex  items-center bg-gray-100 p-2 rounded-md hover:bg-black hover:text-white hover:shadow-md hover:shadow-green-300'>
            <AiOutlineMail className="inline-block mr-2" /> Send Message
          </div>
          </Link>
        </li>
        <li className="mb-2">
            <Link to="/ads">
          <div className='flex  items-center bg-gray-100 p-2 rounded-md shadow-sm hover:bg-black hover:text-white hover:shadow-md hover:shadow-green-300'>
            <AiFillFileImage className="inline-block mr-2" /> Ads
          </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
