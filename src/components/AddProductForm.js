import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { base_url } from '../config';

const ProductForm = () => {
  const navigate = useNavigate();
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

  const [price, setPrice] = useState(0);
  const [fixed_price, setFixedPrice] = useState(0);
  const [sale, setSale] = useState(0.0);

  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [origin, setOrigin] = useState('');
  const [brand, setBrand] = useState('');
  const [avail, setAvail] = useState(0);
  const [inSale, setinSale] = useState(0);
  const [inNew, setinNew] = useState(0);
  const [inBest, setinBest] = useState(0);
  const [inFeatured, setinFeatured] = useState(0);
  

 
  const fetchCategory = async () => {
      try {
          const response = await axios.get(`${base_url}admin/category`, {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          });
          setCategories(response.data);
          setSelectedCategory(response.data[0]);
      } catch (error) {
          console.error('Failed to fetch category:', error);
          navigate('/login')
      }
  }

  useEffect(()=>{
    fetchCategory(token)
  },[])

  const [files, setFiles] = useState({
    img1: null,
    img2: null,
    img3: null,
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

  const [formValues, setFormValues] = useState({
    avail: ""
  });
  
  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: parseInt(event.target.value),
    });
    console.log(formValues);
  };

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
  
    // Validate files
    if (!files.img1 || !files.img2 || !files.img3) {
      newErrors.files = 'All images are required.';
    }
  
    // Validate title
    if (!title_en || !title_ru || !title_uz || !title_ko) {
      newErrors.title = 'Title in all languages is required.';
    }
  
    // Validate category
    if (!category_en || !category_ko || !category_ru || !category_uz) {
      newErrors.category = 'Category in all languages is required.';
    }
  
    // Validate price
    if (price === 0) {
      newErrors.price = 'Price is required and should be greater than 0.';
    }
  
    // Validate fixed price
    if (fixed_price === 0) {
      newErrors.fixed_price = 'Fixed price is required and should be greater than 0.';
    }
  
    // Validate weight
    if (!weight) {
      newErrors.weight = 'Weight is required.';
    }
  
    // Validate unit
    if (!unit) {
      newErrors.unit = 'Unit is required.';
    }
  
  
    // Validate origin
    if (!origin) {
      newErrors.origin = 'Origin is required.';
    }
  
    // Validate brand
    if (!brand) {
      newErrors.brand = 'Brand is required.';
    }
  
    setErrors(newErrors);
  
    // If no errors, return true
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let s = 100 - ((fixed_price*100)/price)
    setSale(s);
    console.log(s)
  
    if (validateForm()) {
      const formData = new FormData();
      formData.append('title_en', title_en);
      formData.append('title_ru', title_ru);
      formData.append('title_uz', title_uz);
      formData.append('title_ko', title_ko);
  
      formData.append('category_en', category_en);
      formData.append('category_ru', category_ru);
      formData.append('category_uz', category_uz);
      formData.append('category_ko', category_ko);
  
      formData.append('price', price);
      formData.append('fixed_price', fixed_price);
      
      formData.append('sale', s);
      formData.append('weight', weight);
      formData.append('unit', unit);
      formData.append('origin', origin);
      formData.append('brand', brand);
      
      
  
      // Adding formValues data as integers
      Object.entries(formValues).forEach(([key, value]) => {
        if (value !== "") {
          formData.append(key, parseInt(value));
        }
      });
  
      // Adding image data
      Object.entries(files).forEach(([key, file]) => {
        if (file) {
          formData.append(key, file);
        }
      });
      
  
      try {
        const response = await axios.post(`${base_url}admin/product`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        if(response.status == 200) {
          navigate(-1)
        }
        console.log(response.data);
      } catch (error) {
        console.error('Failed to submit form:', error);
        navigate('/login')
      }
    }
  };
  


const [selectedCategory, setSelectedCategory] = useState('');

const handleCategoryChange = (event) => {
  console.log(event.target.value)
  setSelectedCategory(event.target.value);
  let category = categories.find(item => item._id === event.target.value);
  setCategory_en(category.name_en);
  setCategory_ru(category.name_ru);
  setCategory_uz(category.name_uz);
  setCategory_ko(category.name_ko);
};

  


  return (
    
      <div className="mx-auto bg-white w-full  ml-64 mt-8 mb-8">
        <h2 className='font-bold text-2xl px-4'>Add Product</h2>
        <form onSubmit={handleSubmit} className="space-y-10">
        <h2 className='px-4 font-semibold'>Images</h2>
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

      <h2 className='px-4 font-semibold'>Product Name</h2>
      <div className='flex justify-between px-4'>
          <input type="text"  className="px-4 w-full py-2 mr-2 rounded-md shadow-sm border border-gray-300 focus:border-blue-500 focus:outline-none" name="title_en" placeholder='Name in English' value={title_en} onChange={(e) => setTitle_en(e.target.value)} />
          <input type="text"  className="px-4 w-full py-2 mr-2 rounded-md shadow-sm border border-gray-300 focus:border-blue-500 focus:outline-none" name="title_uz" placeholder='Name in Uzbek' value={title_uz} onChange={(e) => setTitle_uz(e.target.value)}  />
          <input type="text"  className="px-4 w-full py-2 mr-2 rounded-md shadow-sm border border-gray-300 focus:border-blue-500 focus:outline-none" name="title_ru" placeholder='Name in Russian'  value={title_ru} onChange={(e) => setTitle_ru(e.target.value)} />
          <input type="text"  className="px-4 w-full py-2 mr-2 rounded-md shadow-sm border border-gray-300 focus:border-blue-500 focus:outline-none" name="title_ko" placeholder='Name in Korean' value={title_ko} onChange={(e) => {setTitle_ko(e.target.value)}}  />
      </div>

      <h2 className='px-4 font-semibold'>Product Price & Fixed Price & Sale</h2>
      <div className='flex justify-between px-4'>
          <input type="number"  className="px-4 w-full py-2 mr-2 rounded-md shadow-sm border border-gray-300 focus:border-blue-500 focus:outline-none" name="price" placeholder='Product Price' value={price} onChange={(e) => setPrice(e.target.value)}  />
          <input type="number"  className="px-4 w-full py-2 mr-2 rounded-md shadow-sm border border-gray-300 focus:border-blue-500 focus:outline-none" name="fixed_price" placeholder='Product Fixed Price' value={fixed_price} onChange={(e) => setFixedPrice(e.target.value)}  />
      </div>

      <h2 className='px-4 font-semibold'>Product Quantity & Origin & Weight & Sales Unit & Brand/Meat State</h2>
      <div className='flex justify-between px-4'>
          <input type="text"  className="px-4 w-full py-2 mr-2 rounded-md shadow-sm border border-gray-300 focus:border-blue-500 focus:outline-none" name="origin" placeholder='Origin' value={origin} onChange={(e) => setOrigin(e.target.value)}  />  
          <input type="text"  className="px-4 w-full py-2 mr-2 rounded-md shadow-sm border border-gray-300 focus:border-blue-500 focus:outline-none" name="weight" placeholder='Weight' value={weight} onChange={(e) => setWeight(e.target.value)}  />
          <input type="text"  className="px-4 w-full py-2 mr-2 rounded-md shadow-sm border border-gray-300 focus:border-blue-500 focus:outline-none" name="unit" placeholder='Sales Unit' value={unit} onChange={(e) => setUnit(e.target.value)}  />
          <input type="text"  className="px-4 w-full py-2 mr-2 rounded-md shadow-sm border border-gray-300 focus:border-blue-500 focus:outline-none" name="brand" placeholder='Meat state / Brand' value={brand} onChange={(e) => setBrand(e.target.value)}  />
      </div>

      <h2 className='px-4 font-semibold'>Select Category</h2>
      <div className='flex justify-between px-4'>
        <select value={selectedCategory} onChange={handleCategoryChange} className="px-4 w-full py-2 mr-2 rounded-md shadow-sm border border-gray-300 focus:border-blue-500 focus:outline-none">
          <option value=''>Select a category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name_en}
            </option>
          ))}
        </select>
      </div>
      
      <h2 className='px-4 font-semibold'>In Stock & in Sale & in New & in Feature & in Best</h2>
    <div className='flex justify-between px-4'>
      {Object.keys(formValues).map((key, index) => (
        <div key={index} className="m-2 bg-white shadow-sm p-2 rounded-sm">
          <label>{key}</label>
          <select name={key} value={formValues[key]} onChange={handleChange} className="ml-2">
            <option value="">Select</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </div>
      ))}
    </div>
    <div className='px-4 flex flex-col justify-center'>
    {errors && Object.keys(errors).map((key, i) => (
        <p key={i} className="text-red-500">{errors[key]}</p>
    ))}
</div>
      <div className='flex px-4'>
      <button  type='submit' className='bg-gray-100 text-black hover:bg-green-300 w-full p-2 px-4 rounded-md'>Confirm</button>
      </div>
    </form>
    </div>

  );
};

export default ProductForm;
