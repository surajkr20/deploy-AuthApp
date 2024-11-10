import { ToastContainer } from "react-toastify";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import "../App.css";

const Login = () => {
  const [LoginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handlechange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyLoginInfo = { ...LoginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };
  console.log(LoginInfo);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = LoginInfo;
    if (!email || !password) {
      return handleError("Email and Password are required");
    }
    try {
      const url = "https://deploy-auth-app-backend.vercel.app//auth/login";
      const response = await fetch(url, {
        method: "POST", // use uppercase
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(LoginInfo),
      });
      const result = await response.json();
      const { success, message,jwtToken, name, error} = result;
      console.log(result)
      if (success) {
        handleSuccess(message);
        localStorage.setItem('token',jwtToken);
        localStorage.setItem('loggedInUser',name);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if(error){
        handleError(error)
      } else if(!success){
        handleError(message)
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="login-container h-screen w-screen flex flex-col items-center justify-center">
      <h1 className="text-red-900 font-serif text-[30px]">Login</h1>
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-5 border-2 shadow-md p-8 mt-2"
      >
        <div className="flex flex-col gap-3">
          <label htmlFor="name">Email</label>
          <input
            onChange={handlechange}
            className="p-1 rounded-md border-2 w-[300px]"
            placeholder="Enter your email"
            name="email"
            autoFocus
            type="email"
            value={LoginInfo.email}
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
            value={LoginInfo.password}
          />
        </div>
        <button className="bg-green-900 p-2 rounded-md text-white text-[17px] font-serif">
          Login
        </button>
        <span>
          don't have an account,
          <Link to={"/signup"} className="text-blue-900 ml-2">
            signup
          </Link>
        </span>
        <ToastContainer />
      </form>
    </div>
  );
};

export default Login;
