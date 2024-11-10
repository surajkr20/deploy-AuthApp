import React, { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Refresh from './Refresh';

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({element}) =>{
    return isAuthenticated ? element : <Navigate to={'/login'}/>
  }

  return (
    <div>
      <Refresh setIsAuthenticated={setIsAuthenticated}/>
      <Routes>
        <Route path='/' element={<Navigate to={'/login'}/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/home' element={<PrivateRoute element={<Home/>}/>}/>
      </Routes>
    </div>
  )
}

export default App;