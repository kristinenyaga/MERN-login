import React from 'react'
import profile from '../assets/profile.png'
import {Link} from 'react-router-dom'
import styles from '../styles/username.css'
const Password = () => {
  return (
    <div className='container mx-auto'>
      <div className='flex justify-center items-center h-screen'>
        <div className= 'glass'>
          <div className='flex flex-col items-center'>
            <h1 className='text-4xl font-bold'>Recovery!</h1>
            <p className='text-md max-w-[1/4] py-4 font-medium'>Enter OTP to recover password</p>
          </div>

          <form className='pt-20'>

            <div className='flex flex-col items-center gap-6'>
              <div className="text-center flex flex-col">
                <span className='text-center text-md text-gray-500'>Enter 6 digit OTP sent to you email</span>
                <input type='password' placeholder='OTP' className='shadow-md border-0 py-4 px-5 text-start rounded-lg text-md text-gray-700 focus:outline-none' />
              </div>

              <button className='border bg-indigo-600 w-[14em] py-3 rounded-lg text-gray-50 text-xl shadow-md text-center hover:bg-indigo-700'>Sign In</button>
            </div>
            <div className='text-center py-4'>
              <span className='text-md'>Can't get OTP ? <button className='text-red-500 underline underline-offset-4'> Resend</button></span>

            </div>
          </form>
       </div>
     </div>
    </div>
  )
}

export default Password