import React from 'react'
import profile from '../assets/profile.png'
import {Link} from 'react-router-dom'
import styles from '../styles/username.css'
import { useFormik } from 'formik'
import toast,{ Toaster } from 'react-hot-toast'
import { resetpasswordValidate } from '../helper/validate'
import { resetPassword } from '../helper/helper'
import { useAuthStore } from '../store/store'
import { useNavigate,Navigate } from 'react-router-dom'
import useFetch from '../hooks/fetch.hook'

const Reset = () => {
  const { username } = useAuthStore(state => state.auth)
  const nav = useNavigate()
  const [{isLoading,apiData,serverError,status}]=useFetch('createResetSession')
    const formik = useFormik({
    // specify initial values
    initialValues: {
        password: '',
      confirmpassword:''
    },
    validate:resetpasswordValidate,
    // when you want to validate onsubmit
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      console.log(values)
      let resetPromise = resetPassword({ username, password: values.password })
      toast.promise(resetPromise, {
        loading: "Updating....",
        success: <b>Password reset was successful</b>,
        error:<b>Could not change password</b>
      })
      resetPromise.then(() => {
        nav('/')
      })
    }
    })
 if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
  if (status && status !== 201) return <Navigate to={'/password'} replace={true}></Navigate>
  

  return (
    <div className='container mx-auto'>
      <Toaster position='top-center' reverseOrder='false'></Toaster>
      <div className='flex justify-center items-center h-screen'>
        <div className= 'glass'>
          <div className='flex flex-col items-center'>
            <h1 className='text-4xl font-bold'>Reset Password!</h1>
            <p className='text-md max-w-[1/4] py-4 font-medium'>Enter new paswword</p>
          </div>

          <form onSubmit={formik.handleSubmit} className='py-20'>

            <div className='flex flex-col items-center gap-6'>
              <input type='password' placeholder='new password' className='shadow-md border-0 py-5 px-4 text-start rounded-lg text-md text-gray-700 focus:outline-none' {...formik.getFieldProps('password')} />
              <input type='password' placeholder='confirm password' className='shadow-md border-0 py-5 px-4 text-start rounded-lg text-md text-gray-700 focus:outline-none' {...formik.getFieldProps('confirmpassword')} />
              <button className='border bg-indigo-600 w-[13em] py-3 rounded-lg text-gray-50 text-xl shadow-md text-center hover:bg-indigo-700' type='submit'>Confirm</button>
            </div>

          </form>
       </div>
     </div>
    </div>
  )
}

export default Reset