import React from 'react'
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const nav = useNavigate()
  const goHome = () => {
    nav('/')
  }

  return (
    <div className='max-w-full flex justify-around mb-9 pt-5 bg-slate-50'>
      <p className='text-xl font-medium text-indigo-600'>Authentication app</p>
      <p className='text-lg cursor-pointer' onClick={goHome}>Home</p>
      
    </div>
  )
}

export default Navbar