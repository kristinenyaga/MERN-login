import React, { useState } from 'react'
import profile from '../assets/profile.png'
import {Link} from 'react-router-dom'
import styles from '../styles/username.css'
import { useFormik } from 'formik'
import toast, { Toaster } from 'react-hot-toast'
import { registerValidate } from '../helper/validate'
import { registerUser } from '../helper/helper'
import convert from '..//helper/convert'
import { useNavigate } from 'react-router-dom'
const Register = () => {
  const nav = useNavigate()
  const [file,setFile] = useState()
    const formik = useFormik({
    // specify initial values
      initialValues: {
        email: "",
        username: "",
        password: "" 
      
    },
    validate:registerValidate,
    // when you want to validate onsubmit
    validateOnBlur: false,
    validateOnChange: false,
      onSubmit: async values => {
        // object.assign copies values from a source to a target object
      values = await Object.assign(values,{profile:file || ''})
        console.log(values)
        let registerPromise = registerUser(values)
        toast.promise(registerPromise, {
          loading: "creating...",
          success: <b>Registered successfully....!</b>,
          error:<b>Could not load</b>
        })
        registerPromise.then(() => nav('/'))
          .catch(error => {
            toast.error(error.error.response.data.error)
          })
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
            <h1 className='text-4xl font-bold'>Register</h1>
            <p className='text-md max-w-[1/4] py-4 font-lg'>Happy to join you</p>
          </div>

          <form onSubmit={formik.handleSubmit}>
            <div className='flex justify-center py-4'>
              <label htmlFor='profile'>
                <img src={file || profile} alt='profile' className='border-4 border-gray-100 w-[170px]  rounded-md shadow-lg cursor-pointer' />
              </label>
              <input type='file' id='profile' name='profile' onChange={upload}  />

            </div>
            <div className='flex flex-col items-center gap-6'>
              <input type='text' placeholder='username' className='shadow-md border-0 py-4 px-8 text-start rounded-lg text-md text-gray-700 focus:outline-none' {...formik.getFieldProps('username')} />
              <input type='email' placeholder='Email' className='shadow-md border-0 py-4 px-8 text-start rounded-lg text-md text-gray-700 focus:outline-none' {...formik.getFieldProps('email')} />
              <input type='password' placeholder='Password' className='shadow-md border-0 py-4 px-8 text-start rounded-lg text-md text-gray-700 focus:outline-none' {...formik.getFieldProps('password')} />
              <button className='border bg-indigo-600 w-[15em] py-3 rounded-lg text-gray-50 text-xl shadow-md text-center hover:bg-indigo-700'>Register</button>
            </div>
            <div className='text-center py-4'>
              <span className='text-md'>Already registered? <Link to='/password' className='text-red-500 underline underline-offset-4'>Log in</Link></span>

            </div>
          </form>
       </div>
     </div>
    </div>
  )
}

export default Register