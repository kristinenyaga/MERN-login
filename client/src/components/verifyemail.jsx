import React,{useEffect,useState} from 'react'
import toast,{ Toaster } from 'react-hot-toast'
import { useAuthStore } from '../store/store'
import { generateOTP, verifyOTP } from '../helper/helper'
import { useNavigate } from 'react-router-dom'
const VerifyEmail = () => {
  const { username } = useAuthStore(state => state.auth)
  const [otp, setOtp] = useState()
  const nav = useNavigate()
  useEffect(() => {
    generateOTP(username).then((OTP) => {
      console.log(OTP)
      if(OTP) return toast.success('OTP has been send to your email!');
      return toast.error('Problem while generating OTP!')
    })
  }, [username]);

  async function onSubmit(e){
    e.preventDefault();
    try {
      let { status } = await verifyOTP({ username, code : otp })
      if(status === 201){
        toast.success('Email verified successfully!')
        return nav('/')
      }  
    } catch (error) {
      return toast.error('Wront OTP! Check email again!')
    }
  }
  function resendOTP(){

    let sentPromise = generateOTP(username);

    toast.promise(sentPromise ,
      {
        loading: 'Sending...',
        success: <b>OTP has been send to your email!</b>,
        error: <b>Could not Send it!</b>,
      }
    );

    sentPromise.then((OTP) => {
      console.log(OTP)
    });
    
  }
  function goToUpdate(){
    nav('/profile')
  }
  return (
    <div className='container mx-auto'>
     <Toaster position='top-center' reverseOrder='false'></Toaster>
      <div className='flex justify-center items-center h-screen'>
        <div className= 'glass'>
          <div className='flex flex-col items-center'>
            <h1 className='text-4xl font-bold'>Email verification</h1>
            <p className='text-md max-w-[1/4] py-4 font-medium'>Enter OTP sent to your email</p>
          </div>

          <form className='pt-20' onSubmit={onSubmit}>

            <div className='flex flex-col items-center gap-6'>
              <div className="text-center flex flex-col">
                <span className='text-center text-md text-gray-500'>Enter 6 digit OTP sent to you email</span>
                <input type='text' placeholder='OTP' className='shadow-md border-0 py-4 px-5 text-start rounded-lg text-md text-gray-700 focus:outline-none'onChange={(e)=>setOtp(e.target.value)} />
              </div>

              <button className='border bg-indigo-600 w-[14em] py-3 rounded-lg text-gray-50 text-xl shadow-md text-center hover:bg-indigo-700' type='submit'>Proceed</button>
            </div>

          </form>
          <div className='text-center py-4'>
            <span className='text-md'>Can't get OTP ? <button className='text-red-500 underline underline-offset-4' onClick={resendOTP}> Resend</button></span>
            <p className='text-md'>if you entered wrong email address <button className='text-red-500 underline underline-offset-4' onClick={goToUpdate}> update details</button></p>

          </div>
       </div>
     </div>
    </div>
  )
}

export default VerifyEmail