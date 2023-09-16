import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { base_url } from '../config';

export const SendMessage = () => {
    const token = localStorage.getItem('token');
  const [message, setMessage] = useState('');
  const [successPopup, setSuccessPopup] = useState(false);
  const navigate = useNavigate()

  const handleSendMessage = async () => {
    try {
      await axios.post(
        `${base_url}admin/send/all/message`,
        { msg: message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Reset the message input
      setMessage('');

      // Display the success popup
      setSuccessPopup(true);

      // Close the success popup after 1 second
      setTimeout(() => {
        setSuccessPopup(false);
      }, 3000);

      // Log a success message to the console
      console.log('Message sent!');
    } catch (error) {
      console.error('Failed to send message:', error);
      navigate('/login')
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 p-8 w-full">
        <h2 className="text-2xl font-bold">Send Message</h2>
        <p className="text-md font-semibold">
          You can send a message to all users regarding news, events, or sales.
        </p>
        <div className="flex flex-col mt-4 items-center">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="px-4 w-full py-2 mr-2 rounded-md shadow-sm border border-gray-300 focus:border-blue-500 focus:outline-none"
            cols="80"
            rows="10"
          ></textarea>
          <button
            onClick={handleSendMessage}
            className="mt-4 p-2 px-8 bg-green-300 hover:bg-green-400 rounded-md shadow-md"
          >
            Send
          </button>
        </div>
      </div>

      {/* Success Popup */}
      {successPopup && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-md">
          Message sent successfully!
        </div>
      )}
    </div>
  );
};
