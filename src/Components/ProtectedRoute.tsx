import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import userModel from '../Interfaces/userModel'
import { RootState } from '../Storage/Redux/store'

const ProtectedRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {

  
  const [loading, setLoading] = useState(true);
  const userData: userModel = useSelector((state: RootState) => state.userAuthStore);
  const auth = localStorage.getItem("token");

  useEffect(() => {
      // Once component mounts, check if user data is available
      if (auth && userData.role) {
          setLoading(false); // Set loading to false once user data is available
      }
      else {
        setLoading(false); // Set loading to false even if there's no user data
    }
  }, [auth, userData]);

  // If loading, return null (no redirection until user data is loaded)
  if (loading) {
      return null;
  }
  // If there's no token, redirect to login
  if (!auth) {
    return <Navigate to="/login" />;
}
  // If there's no token or user role is invalid, redirect to login
  if ( !userData.role || !allowedRoles.includes(userData.role)) {
      return <Navigate to="/login" />;
  }

  // If user is authenticated and has allowed role, render the protected route
  return <Outlet />;
};


export default ProtectedRoute
