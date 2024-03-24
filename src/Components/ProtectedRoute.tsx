import React from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../Storage/Redux/authSlice'
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
    return  auth &&  allowedRoles.includes(role) ? 
    <Outlet />
 
: (
    <Navigate to="/login" />
);
}

export default ProtectedRoute
