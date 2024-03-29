import React, { useEffect } from 'react';
import '../Container/App'
import '../index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Footer, Header } from '../Components/Layout';
import { About, AdminPanel, Home, Login, SignUp ,EmployeeProfile,
  EmployerProfile,Employer,AccessDenied,Dashboard, EmployeeForm ,
  EmployeeCard, NotFound, JobList, EmployeeList, Jobskill, JobType, OTP, EmployerForm, Employee, ProfileCard, JobForm, UserBlock} from '../Pages';
import {  useDispatch } from 'react-redux';

import userModel from '../Interfaces/userModel';
import { jwtDecode } from 'jwt-decode';
import { setLoggedInUser } from '../Storage/Redux/userAuthSlice';
import Loader from '../Components/Loader';
import PrivateRoute from '../Components/PrivateRoute';
import ProtectedRoute from '../Components/ProtectedRoute';



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
      
      
      <Route element= {<ProtectedRoute allowedRoles ={["admin"]}/>}>
      <Route path="/AdminPanel" element= {<AdminPanel/>}/> 
      <Route path="/ProfileCard" element= {<ProfileCard/>}/> 
      <Route path="/DashBoard" element= {<Dashboard/>}/> 
      <Route path='/Jobskill' element= {<Jobskill  />}/> 
      <Route path='/JobType' element= {<JobType />}/> 
      </Route>

     
      <Route element= {<ProtectedRoute allowedRoles ={["employee"]}/>}>
      <Route path="/EmployeeProfile/:id" element= {<EmployeeProfile/>}/> 
      <Route path="/EmployeeCard" element= {<EmployeeCard/>}/> 
      <Route path="/Employee" element= {<Employee/>}/> 
      <Route path="/EmployeeForm" element= {<EmployeeForm/>}/> 
      
      </Route>
      <Route element= {<ProtectedRoute allowedRoles ={["employer"]}/>}>
      <Route path="/EmployerProfile/:id" element= {<EmployerProfile/>}/> 
      <Route path="/Employer" element= {<Employer/>}/> 
      <Route path="/EmployerForm" element= {<EmployerForm/>}/> 
     
      </Route>
      <Route element= {<ProtectedRoute allowedRoles ={["employer","employee"]}/>}>
      <Route path='/JobList' element= {<JobList/>}/> 
      <Route path="/EmployeeList" element= {<EmployeeList/>}/> 
      </Route>


      <Route path="/" element= {<Home/>}> </Route>
      <Route path='*' element= {<NotFound/>}> </Route>
      <Route path="/OTP/:email" element= {<OTP/>}> </Route>
      <Route path="/About" element= {<About/>}> </Route>
      <Route path="/Login" element= {<Login/>}> </Route>
      <Route path="/SignUp" element= {<SignUp/>}> </Route>
      <Route path="/Loader" element= {<Loader/>}> </Route>
      <Route path="/UserBlock" element= {<UserBlock/>}> </Route>
      <Route path="/AccessDenied" element= {<AccessDenied/>}> </Route>
      </Routes>
      {/* <Footer/> */}
     
    </div>
  );
}

export default App;
