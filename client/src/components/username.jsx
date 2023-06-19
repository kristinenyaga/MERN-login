import React from 'react'
import profile from '../assets/profile.png'
import {Link,useNavigate} from 'react-router-dom'
import styles from '../styles/username.css'
import { useFormik } from 'formik'
import { Toaster } from 'react-hot-toast'
import { usernameValidate } from '../helper/validate'
import { useAuthStore } from '../store/store'
const Username = () => {
  // state contains the intial value and the action 
  // we need to acces the settUsername action inorder to set the username on submit of the function
  const setUsername = useAuthStore(state => state.setUsername)

  
  // useAuthStore(state)
  const nav = useNavigate()
  const formik = useFormik({
    // specify initial values
    initialValues: {
      username:""
    },
    validate:usernameValidate,
    // when you want to validate onsubmit
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      setUsername(values.username)
      nav("/password")
    }
  })
  return (
    <div className='container mx-auto'>
      <Toaster position='top-center ' reverseOrder='false'></Toaster>
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
              {/* anytime an input is provided its going to be taken to the formik obj */}
              <input type='text' placeholder='username' className='shadow-md border-0 py-5 px-4 text-start rounded-lg text-md text-gray-700 focus:outline-none' {...formik.getFieldProps('username')} />
              <button className='border bg-indigo-600 w-[13em] py-3 rounded-lg text-gray-50 text-xl shadow-md text-center hover:bg-indigo-700' type='submit'>Let's Go</button>
            </div>
            <div className='text-center py-4'>
              <span className='text-md'>Not a member <Link to='/register' className='text-red-500 underline underline-offset-4'>Register Now</Link></span>

            </div>
          </form>
       </div>
     </div>
    </div>
  )
}

export default Username