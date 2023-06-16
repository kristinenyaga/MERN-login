import React from 'react'
import profile from '../assets/profile.png'
import {Link} from 'react-router-dom'
import styles from '../styles/username.css'
import { useFormik } from 'formik'
import { Toaster } from 'react-hot-toast'
import { passwordValidate } from '../helper/validate'

const Password = () => {

  const formik = useFormik({
    // specify initial values
    initialValues: {
      password:""
    },
    validate:passwordValidate,
    // when you want to validate onsubmit
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      console.log(values)
    }
  })
  return (
    <div className='container mx-auto'>
      <Toaster position='top-center' reverseOrder='false'></Toaster>
      <div className='flex justify-center items-center h-screen'>
        <div className= 'glass'>
          <div className='flex flex-col items-center'>
            <h1 className='text-4xl font-bold'>Hello Again!</h1>
            <p className='text-sm max-w-[1/4] py-4 font-medium'>Explore more by connecting with us</p>
          </div>

          <form onSubmit={formik.handleSubmit}>
            <div className='flex justify-center py-4'>
              <img src={profile} alt='profile' className='border-4 border-gray-100 w-[150px] rounded-full shadow-lg cursor-pointer' />
            </div>
            <div className='flex flex-col items-center gap-6'>
              <input type='password' placeholder='password' className='shadow-md border-0 py-5 px-4 text-start rounded-lg text-md text-gray-700 focus:outline-none' {...formik.getFieldProps('password')} />
              <button className='border bg-indigo-600 w-[13em] py-3 rounded-lg text-gray-50 text-xl shadow-md text-center hover:bg-indigo-700' type='submit'>Sign In</button>
            </div>
            <div className='text-center py-4'>
              <span className='text-md'>Forgot Password? <Link to='/recovery' className='text-red-500 underline underline-offset-4'>Recover Now</Link></span>

            </div>
          </form>
       </div>
     </div>
    </div>
  )
}

export default Password