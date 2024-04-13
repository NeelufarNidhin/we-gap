import React from 'react'
import { useSelector } from 'react-redux'

import { Navigate, Outlet } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import userModel from '../Interfaces/userModel'
import { RootState } from '../Storage/Redux/store'

const ProtectedRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {

    const userData: userModel = useSelector(
        (state: RootState) => state.userAuthStore
      );
      let role = userData.role;
      let auth =  localStorage.getItem("token");
      if (!auth) {
        // Redirect to login if authentication token is missing
        return <Navigate to="/login" />;
      }
    
      
    
      if (!role || !allowedRoles.includes(role)) {
        // Redirect to login if user role is invalid or not allowed
        return <Navigate to="/login" />;
      }
    
      return <Outlet />;
    };


export default ProtectedRoute
