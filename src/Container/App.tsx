import React, { useEffect } from 'react';
import '../Container/App'
import '../index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Footer, Header } from '../Components/Layout';
import { About, AdminPanel, Home, Login, SignUp ,EmployeeProfile,
  GetEmployers,EmployerProfile,Employer,AccessDenied,Dashboard, EmployeeForm ,EmployeeCard, NotFound, JobList, EmployeeList, Jobskill, JobType, OTP} from '../Pages';
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
      <Route path="/EmployeeForm" element= {<EmployeeForm/>}> </Route>
      <Route path="/EmployeeProfile/:id" element= {<EmployeeProfile/>}> </Route>
      <Route path="/EmployeeCard" element= {<EmployeeCard/>}> </Route>
      <Route path="/EmployeeList" element= {<EmployeeList/>}> </Route>
      <Route path='*' element= {<NotFound/>}> </Route>
      <Route path='/OTP' element= {<OTP/>}> </Route>
      <Route path='/JobList' element= {<JobList/>}> </Route>
      <Route path='/Jobskill' element= {<Jobskill  />}> </Route>
      <Route path='/JobType' element= {<JobType />}> </Route>
      <Route path="/EmployerProfile/:id" element= {<EmployerProfile/>}> </Route>
      <Route path="/GetEmployers" element= {<GetEmployers/>}> </Route>
      <Route path="/Employer" element= {<Employer/>}> </Route>
      <Route path="/About" element= {<About/>}> </Route>
      <Route path="/Login" element= {<Login/>}> </Route>
      <Route path="/SignUp" element= {<SignUp/>}> </Route>
      <Route path="/DashBoard" element= {<Dashboard/>}> </Route>
      <Route path="/AccessDenied" element= {<AccessDenied/>}> </Route>
      </Routes>
      {/* <Footer/> */}
     
    </div>
  );
}

export default App;
