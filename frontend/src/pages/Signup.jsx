import React, { useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handlechange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  };
  console.log(signupInfo);

  const handleSignup = async (e) =>{
    e.preventDefault();
    const {name, email, password} = signupInfo
    if(!name || !email || !password){
        return handleError('Name, Email and Password are required')
    }
    try {
        const url = 'https://deploy-auth-app-backend.vercel.app/auth/signup'
        const response = await fetch(url,{
          method: 'POST', // use uppercase
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(signupInfo)
        })
        const result = await response.json();
        // console.log(result)
        const {success, message, validationMsg, alreadyHaveAcc} = result;
        // console.log(success, message, error, already)
        if(success){
          handleSuccess(message);
          setTimeout(()=>{
            navigate('/login')
          },1000)
        }else if(validationMsg){
          handleError(validationMsg);
        }else if(!success){
          handleError(message);
        }else if(alreadyHaveAcc){
          handleError(alreadyHaveAcc);
          setTimeout(()=>{
            navigate('/login')
          })
        }
    } catch (error) {
        handleError(error)
    }
  }

  return (
    <div className="signup-container h-screen w-screen flex flex-col items-center justify-center">
      <h1 className="text-red-900 font-serif text-[30px]">Signup</h1>
      <form
        onSubmit={handleSignup}
        className="flex flex-col gap-3 shadow-md p-8 mt-2 border-2"
      >
        <div className="flex flex-col gap-3">
          <label htmlFor="name">Name</label>
          <input
            onChange={handlechange}
            className="p-1 rounded-md border-2 w-[300px]"
            placeholder="Enter your name"
            name="name"
            autoFocus
            type="text"
            value={signupInfo.name}
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="name">Email</label>
          <input
            onChange={handlechange}
            className="p-1 rounded-md border-2 w-[300px]"
            placeholder="Enter your email"
            name="email"
            autoFocus
            type="email"
            value={signupInfo.email}
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="name">Password</label>
          <input
            onChange={handlechange}
            className="p-1 rounded-md border-2 w-[300px]"
            placeholder="Enter your password"
            name="password"
            autoFocus
            type="password"
            value={signupInfo.password}
          />
        </div>
        <button type="submit" className="bg-red-700 p-2 rounded-md text-white mt-2">
          Signup
        </button>
        <span>
          Already have an account
          <Link to={"/login"} className="text-blue-900 ml-2">
            Login
          </Link>
        </span>
        <ToastContainer />
      </form>
    </div>
  );
};

export default Signup;
