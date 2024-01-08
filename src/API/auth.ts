import React from 'react'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

 
const auth =  createApi({
    reducerPath : "auth",
    baseQuery : fetchBaseQuery({
      baseUrl : "http://localhost:8000/api/",
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
      }),
  });
  
export const {useRegisterUserMutation , useLoginUserMutation  } = auth;
export default auth;
