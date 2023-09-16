import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { base_url } from '../config';

export const EditProducts = () => {
    const navigate = useNavigate(); 
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const token = localStorage.getItem('token');
  const [categories, setCategories] = useState([])

  const [title_en, setTitle_en] = useState('');
  const [title_ru, setTitle_ru] = useState('');
  const [title_uz, setTitle_uz] = useState('');
  const [title_ko, setTitle_ko] = useState('');

  const [category_en, setCategory_en] = useState('');
  const [category_ko, setCategory_ko] = useState('');
  const [category_ru, setCategory_ru] = useState('');
  const [category_uz, setCategory_uz] = useState('');

  const [price, setPrice] = useState(null);
  const [fixed_price, setFixedPrice] = useState(null);
  const [sale, setSale] = useState(0.0);

  const [avail, setAvail] = useState(0);
  
  


  const [files, setFiles] = useState({
    img1: null,
    img2: null,
    img3: null,
  });
  
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const name = e.target.name;
    console.log(file)
    const formData = new FormData();
    
      if(name == 'img1'){
        formData.append(name, file)
        formData.append('id', product._id)
        formData.append('image', product.images[0])
        try {
            const response = await axios.post(`${base_url}admin/edit/image`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
              }
            });
        
            // handle response from the server
            if (response.status === 200) {
              // Navigate back or perform some other action
              console.log(response.status)
              getProduct();
            }
          } catch (error) {
            // handle error
            console.error(error);
            navigate('/login')
          }
      }
      if(name==='img2'){
        formData.append(name, file)
        formData.append('id', product._id)
        formData.append('image', product.images[1])
        try {
            const response = await axios.post(`${base_url}admin/edit/image`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
              }
            });
        
            // handle response from the server
            if (response.status === 200) {
              // Navigate back or perform some other action
              console.log(response.status)
              getProduct();
            }
          } catch (error) {
            // handle error
            console.error(error);
            navigate('/login')
          }
      }
      if(name==='img3'){
        formData.append(name, file)
        formData.append('id', product._id)
        formData.append('image', product.images[2])
        try {
            const response = await axios.post(`${base_url}admin/edit/image`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
              }
            });
        
            // handle response from the server
            if (response.status === 200) {
              // Navigate back or perform some other action
              console.log(response.status)
              getProduct();
            }
          } catch (error) {
            // handle error
            console.error(error);
            navigate('/login')
          }
      }
      
    
  };

  const handleRemove = (name) => {
    setFiles(prev => ({ ...prev, [name]: null }));
  }

  const [formValues, setFormValues] = useState({
    avail: "",
  });
  
  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: parseInt(event.target.value),
    });
    console.log(formValues);
  };


  
  


  const getProduct = async () => {
    try {
      const response = await axios.get(`${base_url}admin/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProduct(response.data);
      setIsLoading(false);
      
    } catch (error) {
      console.error('Failed to fetch product:', error);
      navigate('/login')
    }
  };

    const updateTitle_en = async (id, newTitle) => {
        try {
            const response = await axios.post(
                `${base_url}admin/update/product/title_en`, 
                { 
                    id: id,
                    title_en: newTitle
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            getProduct();

            // You may want to do something with the response
            console.log(response.data);
        } catch (error) {
            console.error(error);
            navigate('/login')
        }
    }
    const updateTitle_uz = async (id, newTitle) => {
        try {
            const response = await axios.post(
                `${base_url}admin/update/product/title_uz`, 
                { 
                    id: id,
                    title_uz: newTitle
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            getProduct();

            // You may want to do something with the response
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    const updateTitle_ru = async (id, newTitle) => {
        try {
            const response = await axios.post(
                `${base_url}admin/update/product/title_ru`, 
                { 
                    id: id,
                    title_ru: newTitle
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            getProduct();

            // You may want to do something with the response
            console.log(response.data);
        } catch (error) {
            console.error(error);
            navigate('/login')
        }
    }
    const updateTitle_ko = async (id, newTitle) => {
        try {
            const response = await axios.post(
                `${base_url}admin/update/product/title_ko`, 
                { 
                    id: id,
                    title_ko: newTitle
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            getProduct();

            // You may want to do something with the response
            console.log(response.data);
        } catch (error) {
            console.error(error);
            navigate('/login')
        }
    }
    const updatePrice = async (id, newPrice, newFixedPrice) => {
        let s =
          100 - ((newFixedPrice || product.fixed_price) * 100) /
          (newPrice || product.price);
        setSale(s);
        try {
          const response = await axios.post(
            `${base_url}admin/update/product/price`,
            {
              id: id,
              price: newPrice || product.price,
              fixed_price: newFixedPrice || product.fixed_price,
              sale: s,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          getProduct();
          // You may want to do something with the response
          console.log(response.data);
        } catch (error) {
          console.error(error);
          navigate('/login')
        }
      };
     
    

      const updateAvail = async (id, avail) => {
        try {
            const response = await axios.post(
                `${base_url}admin/update/product/avail`, 
                { 
                    id: id,
                    avail: avail,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            getProduct();
            console.log(response.data);
        } catch (error) {
            console.error(error);
            navigate('/login')
        }
    };

   
    
    
    


    useEffect(() => {
        
      
        getProduct();
      }, [id, token]);

      if (isLoading) {
        return <div>Loading...</div>;
      }
      

  return (
    <div className="mx-auto bg-white w-full  ml-64 mt-8 mb-8">
        <h2 className='font-bold text-2xl px-4'>Add Product</h2>
        
        <h2 className='px-4 font-semibold'>Images</h2>
        <div className="px-4 grid grid-cols-3 gap-0">
        <div  className="justify-center relative overflow-auto rounded-lg border-dotted bg-gray-200 border-gray-200 border-2 px-4 py-2 w-[350px] h-56 shadow-md my-3">
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <img src={product.images[0]} alt="" className="object-cover w-full h-full" />                     
                    </div>
                   
        </div>
        <div  className="justify-center relative overflow-auto rounded-lg border-dotted bg-gray-200 border-gray-200 border-2 px-4 py-2 w-[350px] h-56 shadow-md my-3">
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <img src={product.images[1]} alt="" className="object-cover w-full h-full" />                     
                    </div>
                   
        </div>
        <div  className="justify-center relative overflow-auto rounded-lg border-dotted bg-gray-200 border-gray-200 border-2 px-4 py-2 w-[350px] h-56 shadow-md my-3">
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <img src={product.images[2]} alt="" className="object-cover w-full h-full" />                     
                    </div>
                   
        </div>
        </div>
        
        
        <div className="px-4 grid grid-cols-3 gap-0">
          {/* File inputs */}
          {['img1', 'img2', 'img3'].map((name, i) => (
            <div key={i} className="justify-center relative overflow-auto rounded-lg border-dotted bg-gray-200 border-gray-200 border-2 px-4 py-2 w-[350px] h-56 shadow-md my-3">
              <label htmlFor={name} className="absolute inset-0 cursor-pointer">
                <input 
                  id={name} 
                  name={name} 
                  type="file" 
                  className="sr-only" 
                  onChange={handleFileChange} 
                />
                
                    <span className="absolute inset-0 flex flex-col items-center justify-center text-gray-600">
                      <i className="fas fa-upload text-blue-500"></i>
                      <span className="mt-2 text-sm font-medium">Click to upload files</span>
                    </span>
                  
                
              </label>
            </div>
          ))}
        </div>
          {/* Product names in different languages */}
    <div  className="space-y-10">
      <h2 className='px-4 font-semibold'>Product Name</h2>
      <div className='flex justify-between px-4'>
          <input type="text"  className="px-4 w-full py-2 mr-2 rounded-md shadow-sm border border-gray-300 focus:border-blue-500 focus:outline-none" name="title_en" placeholder='Name in English' value={title_en || product.title_en} onChange={(e) => setTitle_en(e.target.value)} />
          <button onClick={()=> updateTitle_en(product._id, title_en)} className='p-2 px-4 bg-green-300 rounded-md shadow-sm hover:bg-green-400'>Update</button>
      </div>
      <div className='flex justify-between px-4'>
      <input type="text"  className="px-4 w-full py-2 mr-2 rounded-md shadow-sm border border-gray-300 focus:border-blue-500 focus:outline-none" name="title_uz" placeholder='Name in Uzbek' value={title_uz || product.title_uz} onChange={(e) => setTitle_uz(e.target.value)}  />
      <button onClick={()=> updateTitle_uz(product._id, title_uz)} className='p-2 px-4 bg-green-300 rounded-md shadow-sm hover:bg-green-400'>Update</button>
      </div>
      <div className='flex justify-between px-4'>
      <input type="text"  className="px-4 w-full py-2 mr-2 rounded-md shadow-sm border border-gray-300 focus:border-blue-500 focus:outline-none" name="title_ru" placeholder='Name in Russian'  value={title_ru || product.title_ru} onChange={(e) => setTitle_ru(e.target.value)} />
      <button onClick={()=> updateTitle_ru(product._id, title_ru)} className='p-2 px-4 bg-green-300 rounded-md shadow-sm hover:bg-green-400'>Update</button>
      </div>
      <div className='flex justify-between px-4'>
        <input type="text"  className="px-4 w-full py-2 mr-2 rounded-md shadow-sm border border-gray-300 focus:border-blue-500 focus:outline-none" name="title_ko" placeholder='Name in Korean' value={title_ko || product.title_ko} onChange={(e) => {setTitle_ko(e.target.value); console.log(title_ko)}}  />
        <button onClick={()=> updateTitle_ko(product._id, title_ko)} className='p-2 px-4 bg-green-300 rounded-md shadow-sm hover:bg-green-400'>Update</button>
      </div>
      

      <h2 className='px-4 font-semibold'>Product Price & Fixed Price & Sale</h2>
      <div className='flex justify-between px-4'>
          
<input 
  type="number" 
  className="px-4 w-full py-2 mr-2 rounded-md shadow-sm border border-gray-300 focus:border-blue-500 focus:outline-none" 
  name="price" 
  placeholder='Product Price' 
  value={price !== null ? price : product.price} 
  onChange={(e) => setPrice(e.target.value)}  
/>
<input 
  type="number" 
  className="px-4 w-full py-2 mr-2 rounded-md shadow-sm border border-gray-300 focus:border-blue-500 focus:outline-none" 
  name="fixed_price" 
  placeholder='Product Fixed Price' 
  value={fixed_price !== null ? fixed_price : product.fixed_price} 
  onChange={(e) => {setFixedPrice(e.target.value)}}  
/>
          <input type="number"  className="px-4 w-full py-2 mr-2 rounded-md shadow-sm border border-gray-300 focus:border-blue-500 focus:outline-none" name="sale" placeholder='Sale' value={sale || product.sale}  readOnly />
          <button onClick={() => updatePrice(product._id, price, fixed_price, sale)} className='p-2 px-4 bg-green-300 rounded-md shadow-sm hover:bg-green-400' >Update</button>
      </div>

      
      <h2 className='px-4 font-semibold'>In Stock & in Sale & in New & in Feature & in Best</h2>
        <div className='flex justify-between px-10'>
            <p>Is Available</p>
            <div className='flex'>  
                <button onClick={()=> updateAvail(product._id, 1)} className={product.avail === 1 ? 'bg-green-300 p-1 px-4 rounded-md shadow-sm mr-2' : 'bg-gray-200' + ' p-1 px-4 rounded-md shadow-sm mr-2'}>Yes</button>
                <button onClick={()=> updateAvail(product._id, 0)} className={product.avail === 0 ? 'bg-green-300 p-1 px-4 rounded-md shadow-sm ml-2' : 'bg-gray-200' + ' p-1 px-4 rounded-md shadow-sm ml-2'}>No</button>   
            </div>
        </div> 
        



    </div>
    </div>

  )
}
