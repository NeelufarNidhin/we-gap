import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation} from 'react-router-dom'
import userModel from '../Interfaces/userModel';
import { RootState } from '../Storage/Redux/store';


const PrivateRoute = () => {
    const userData: userModel = useSelector(
        (state: RootState) => state.userAuthStore
      );
      let role = userData.role;
      let auth =  localStorage.getItem("token");
     
  return(
    auth ? <Outlet/>
   : <Navigate to='/login'/>
  )  
}

export default PrivateRoute
