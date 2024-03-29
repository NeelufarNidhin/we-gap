import React from 'react'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

 
const auth =  createApi({
    reducerPath : "auth",
    baseQuery : fetchBaseQuery({
      baseUrl : `${process.env.REACT_APP_API_URL}/`,
    }),
      endpoints : (builder) => ({
          registerUser: builder.mutation({
            query : (userData) => ({
              url : "auth/signup",
              method : "POST",
              headers:{
                "Content-type" : "application/json",
              },
              body : userData
            }),
          }),

          loginUser :builder.mutation({
            query : (userCredentials) =>({
              url : "auth/login",
              method : "POST",
              headers :{
                "Content-type" : "application/json",
              },
              body :userCredentials
            }),
          }),
          otpLoginUser :builder.mutation({
            query : (otpvalues) =>({
              url : "auth/login-2FA",
              method : "POST",
              headers :{
                "Content-type" : "application/json",
              },
              body :otpvalues
             
            }),
            
          }),
          resendOtp :builder.mutation({
            query : (otpvalue) =>({
              url : "Auth/resend-otp",
              method : "POST",
              headers :{
                "Content-type" : "application/json",
              },
              body :otpvalue
             
            }),
            
          }),
      }),
  });
  
export const {useRegisterUserMutation,useOtpLoginUserMutation , useLoginUserMutation ,useResendOtpMutation } = auth;
export default auth;
