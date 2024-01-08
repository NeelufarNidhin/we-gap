import React, { useEffect } from 'react';
import '../Container/App'
import '../index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Footer, Header } from '../Components/Layout';
import { About, AdminPanel, Home, Login, SignUp } from '../Pages';
import {  useDispatch } from 'react-redux';

import userModel from '../Interfaces/userModel';
import { jwtDecode } from 'jwt-decode';
import { setLoggedInUser } from '../Storage/Redux/userAuthSlice';



function App() {
const dispatch = useDispatch();

useEffect(()=>{
  const localToken = localStorage.getItem("token");
  if(localToken){
    const { id, firstName, email, role } : userModel = jwtDecode(localToken);
    dispatch(setLoggedInUser({ id, firstName, email, role }))
  }
}) 

  return (
    <div>
     
      <Header/>
      <Routes>
      <Route path="/" element= {<Home/>}> </Route>
      <Route path="/AdminPanel" element= {<AdminPanel/>}> </Route>
      <Route path="/About" element= {<About/>}> </Route>
      <Route path="/Login" element= {<Login/>}> </Route>
      <Route path="/SignUp" element= {<SignUp/>}> </Route>
      </Routes>
      <Footer/>
     
    </div>
  );
}

export default App;
