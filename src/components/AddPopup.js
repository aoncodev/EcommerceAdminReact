import React, {useState} from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { base_url } from '../config';

const PopupForm = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const show = false;
    const [files, setFiles] = useState({
        img1: null
      });
      
      const handleFileChange = (e) => {
        const { name, files } = e.target;
        
        if (files.length > 0) {
          setFiles(prev => ({ ...prev, [name]: files[0] }));
        }
      };
    
      const handleRemove = (name) => {
        setFiles(prev => ({ ...prev, [name]: null }));
      }
    
     
    
      const [errors, setErrors] = useState({});
    
    const validateForm = () => {
      let newErrors = {};
    
      // Validate files
      if (!files.img1) {
        newErrors.files = 'All fields are required.';
      }
    
    
      setErrors(newErrors);
    
      // If no errors, return true
      return Object.keys(newErrors).length === 0;
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
      
        if (validateForm()) {
          // Submit form
          console.log('Form submitted');
      
          // Prepare formData
          let formData = new FormData();

          formData.append('show', show);
          formData.append('img', files.img1); 
      
          
      
          try {
            // Make a post request with the form data
            const response = await axios.post(`${base_url}admin/add/popup`, formData, {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
              },
            });
            
            if(response.status == 200 ){
                navigate(-1)
            }
            // Log the response for debug purposes
            console.log(response);
      
            // Navigate to another page if necessary
            // navigate('/success');
          } catch (error) {
            console.error('Failed to submit form:', error);
            navigate('/login')
          }
        }
      };

  return (
    <div className='flex'>
        <Sidebar/>
      <div className="mx-auto bg-white w-full  ml-64 p-8  mb-8">
        <h2 className='font-bold text-2xl px-4'>Add Popup</h2>
        <form onSubmit={handleSubmit} className="space-y-10">
        <h2 className='px-4 font-semibold'>Image</h2>
        <div className="px-4 grid grid-cols-3 gap-0">
          
          {/* File inputs */}
          {['img1'].map((name, i) => (
            <div key={i} className="justify-center relative overflow-auto rounded-lg border-dotted bg-gray-200 border-gray-200 border-2 px-4 py-2 w-[350px] h-56 shadow-md my-3">
              <label htmlFor={name} className="absolute inset-0 cursor-pointer">
                <input 
                  id={name} 
                  name={name} 
                  type="file" 
                  className="sr-only" 
                  onChange={handleFileChange} 
                />
                {files[name] 
                  ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <img src={URL.createObjectURL(files[name])} alt="" className="object-cover w-full h-full" />
                      <button 
                        className="bg-red-500 text-white p-1 rounded absolute"
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            handleRemove(name, e);
                        }}
                        >
                        Remove
                        </button>
                    </div>
                  ) 
                  : (
                    <span className="absolute inset-0 flex flex-col items-center justify-center text-gray-600">
                      <i className="fas fa-upload text-blue-500"></i>
                      <span className="mt-2 text-sm font-medium">Click to upload files</span>
                    </span>
                  )
                }
              </label>
            </div>
          ))}
        </div>
          {/* Product names in different languages */}


     
      
        <div className='px-4 flex justify-center'>
          {errors.files && <p className="text-red-500">{errors.files}</p>}
        </div>
      <div className='flex px-4'>
      <button  type='submit' className='bg-gray-100 text-black hover:bg-green-300 w-full p-2 px-4 rounded-md'>Confirm</button>
      </div>
      

    </form>
    </div>
    </div>
  );
};

export default PopupForm;