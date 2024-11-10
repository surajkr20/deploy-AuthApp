import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {ToastContainer} from 'react-toastify'
import { handleSuccess } from '../utils';

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState();
  const navigate = useNavigate();

  useEffect(()=>{
    setLoggedInUser(localStorage.getItem('loggedInUser'))
  },[])

  const handleLogout = (e) =>{
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser')
    handleSuccess('user logout')
    setTimeout(()=>{
      navigate('/login')
    },1000)
  }

  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center bg-black text-white'>
      <h1 className='text-3xl w-[200px] font-serif bg-red-700 rounded-md p-2 text-center'>{loggedInUser}</h1>
      <button onClick={handleLogout} className='mt-4 bg-white text-black rounded-md p-2 font-serif'>Logout</button>
      <ToastContainer/>
    </div>
  )
}

export default Home;