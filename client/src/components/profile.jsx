import React, { useState } from 'react'
import profile from '../assets/profile.png'
import {Link} from 'react-router-dom'
import styles from '../styles/username.css'
import { useFormik } from 'formik'
import { Toaster } from 'react-hot-toast'
import { profileValidate } from '../helper/validate'
import convert from '..//helper/convert'
const Profile = () => {
  const [file,setFile] = useState()
    const formik = useFormik({
    // specify initial values
      initialValues: {
        email: "",
        username: "",
        password: "",
        mobile: "",
        firstname: "",
        lastname:""
      
    },
    validate:profileValidate,
    // when you want to validate onsubmit
    validateOnBlur: false,
    validateOnChange: false,
      onSubmit: async values => {
        // object.assign copies values from a source to a target object
      values = await Object.assign(values,{profile:file || ''})
      console.log(values)
    }
    })
  // formik doesn't support file upload
  const upload = async (e) => {
    console.log(e.target.files)
    const base64 = await convert(e.target.files[0])
    setFile(base64)
    
  }
  return (
    <div className='container mx-auto'>
      <Toaster position='top-center' reverseOrder='false'></Toaster>
      <div className='flex justify-center items-center h-screen'>
        <div className= 'glass'>
          <div className='flex flex-col items-center'>
            <h1 className='text-4xl font-bold'>Profile</h1>
            <p className='text-md max-w-[1/4] py-4 font-lg'>Update your details</p>
          </div>

          <form onSubmit={formik.handleSubmit}>
            <div className='flex justify-center py-4'>
              <label htmlFor='profile'>
                <img src={file || profile} alt='profile' className='border-4 border-gray-100 w-[170px]  rounded-md shadow-lg cursor-pointer' />
              </label>
              <input type='file' id='profile' name='profile' onChange={upload}  />

            </div>
            <div className='flex flex-col items-center gap-6'>
              <div className='flex gap-2'>
                 <input type='text' placeholder='firstname' className='shadow-md border-0 py-4  text-start rounded-lg text-md text-gray-700 focus:outline-none' {...formik.getFieldProps('firstname')} />
                 <input type='text' placeholder='lastname' className='shadow-md border-0 py-4 text-start rounded-lg text-md text-gray-700 focus:outline-none' {...formik.getFieldProps('lastname')} />
              </div>
              <div className='flex gap-2'>
                 <input type='number' placeholder='mobile' className='shadow-md border-0 py-4  text-start rounded-lg text-md text-gray-700 focus:outline-none' {...formik.getFieldProps('mobile')} />
                 <input type='email' placeholder='Email' className='shadow-md border-0 py-4  text-start rounded-lg text-md text-gray-700 focus:outline-none' {...formik.getFieldProps('email')} />
              </div>
                <input type='text' placeholder='Address' className='shadow-md border-0 py-4  text-start rounded-lg text-md text-gray-700 focus:outline-none' {...formik.getFieldProps('address')} />

                <button className='border bg-indigo-600 w-[15em] py-3 rounded-lg text-gray-50 text-xl shadow-md text-center hover:bg-indigo-700'>Register</button>
            </div>
            <div className='text-center py-4'>
              <span className='text-md'>Come back later? <Link to='/password' className='text-red-500 underline underline-offset-4'>Log Out</Link></span>

            </div>
          </form>
       </div>
     </div>
    </div>
  )
}

export default Profile