import React, { useEffect } from 'react';
import '../Container/App'
import '../index.css';
import {  Route, Routes } from 'react-router-dom';
import { Footer, Header } from '../Components/Layout';
import { About, AdminPanel, Home, Login, SignUp ,EmployeeProfile,
  EmployerProfile,Employer,AccessDenied,Dashboard, EmployeeForm ,
  EmployeeCard, NotFound, JobList, EmployeeList, Jobskill, JobType, OTP,
   EmployerForm, Employee, ProfileCard, JobForm, UserBlock, ExperienceForm, EducationForm, SkillForm, JobDetail, ResumeBuilder,
   Chat,
   Confirmation,
   JobApplicationList,
   JobApplicationDetail,
   VideoChat,
   Video,
   VideoPage,
   JobAppEmployeeList,
   JobAppEmployeeDetail} from '../Pages';
import {  useDispatch } from 'react-redux';

import userModel from '../Interfaces/userModel';
import { jwtDecode } from 'jwt-decode';
import { setLoggedInUser } from '../Storage/Redux/userAuthSlice';
import Loader from '../Components/Loader';

import ProtectedRoute from '../Components/ProtectedRoute';




function App() {
const dispatch = useDispatch();

useEffect(()=>{
  const localToken = localStorage.getItem("token");
  if(localToken){
    const { id, firstName, email, role } : userModel = jwtDecode(localToken);
   dispatch(setLoggedInUser({ id, firstName, email, role }));
   
  }
},[]) 

  return (
    <div>
     
      <Header/>
      <Routes>
      <Route element= {<ProtectedRoute allowedRoles ={["admin"]}/>}>
      <Route path="/AdminPanel" element= {<AdminPanel/>}/> 
      <Route path="/ProfileCard" element= {<ProfileCard/>}/> 
      <Route path="/DashBoard" element= {<Dashboard/>}/> 
      </Route>
      <Route element= {<ProtectedRoute allowedRoles ={["employee"]}/>}>
      <Route path="/EmployeeProfile/:id" element= {<EmployeeProfile/>}/> 
      <Route path="/EmployeeProfile" element= {<EmployeeProfile/>}/> 
      <Route path="/EmployeeCard" element= {<EmployeeCard/>}/> 
      <Route path="/Employee" element= {<Employee/>}/> 
      <Route path="/EmployeeForm/:employeeId" element= {<EmployeeForm/>}/> 
      <Route path="/EmployeeForm" element= {<EmployeeForm/>}/> 
      <Route path="/ExperienceForm/:experienceId" element= {<ExperienceForm/>}/> 
      <Route path="/ExperienceForm" element= {<ExperienceForm/>}/> 
      <Route path="/EducationForm/:educationId" element= {<EducationForm/>}/> 
      <Route path="/EducationForm" element= {<EducationForm/>}/> 
      <Route path="/SkillForm/:skillId" element= {<SkillForm/>}/> 
      <Route path="/SkillForm" element= {<SkillForm/>}/> 
      <Route path="/ResumeBuilder" element= {<ResumeBuilder/>}/> 
      <Route path='/JobAppEmployeeList' element= {<JobAppEmployeeList/>}/> 
      <Route path="/jobEmpApplication/:jobAppId/:employer/:jobId" element= {<JobAppEmployeeDetail/>}/> 
      </Route>
      <Route element= {<ProtectedRoute allowedRoles ={["employer"]}/>}>
      <Route path="/EmployerProfile/:id" element= {<EmployerProfile/>}/> 
      <Route path="/EmployerProfile" element= {<EmployerProfile/>}/> 
      <Route path="/Employer" element= {<Employer/>}/> 
      <Route path="/EmployerForm" element= {<EmployerForm/>}/> 
      <Route path="/EmployerForm/:employerId" element= {<EmployerForm/>}/> 
      <Route path="/JobForm" element= {<JobForm/>}/> 
      <Route path="/Job-Application/:jobAppId/:employeeId/:jobId" element= {<JobApplicationDetail/>}/> 
      <Route path="/JobForm/:jobId" element= {<JobForm/>}/> 
      <Route path='/JobApplicationList' element= {<JobApplicationList/>}/> 
      </Route>
      <Route element= {<ProtectedRoute allowedRoles ={["employer","employee"]}/>}>
      <Route path='/JobList' element= {<JobList/>}/> 
      
      <Route path="/Job/:jobId/:employerId" element= {<JobDetail/>}/> 
      <Route path="/Confirmation" element= {<Confirmation/>}/> 
      <Route path="/EmployeeList" element= {<EmployeeList/>}/> 
      <Route path="/Chat" element= {<Chat/>}> </Route>
      <Route path="/Video" element= {<Video/>}> </Route>
      <Route path="/room/:roomId" element= {<VideoPage/>}> </Route>
      </Route>
      <Route element= {<ProtectedRoute allowedRoles ={["admin","employer"]}/>}>
      <Route path='/JobSkill' element= {<Jobskill  />}/> 
      <Route path='/JobType' element= {<JobType />}/> 
      <Route path='/JobSkill/:id' element= {<Jobskill  />}/> 
      <Route path='/JobType/:id' element= {<JobType />}/> 
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
