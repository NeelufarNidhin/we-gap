import React from 'react'

import { createApi , fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const  userApi =  createApi({
  reducerPath : "userApi",
  baseQuery : fetchBaseQuery({
    baseUrl : "http://localhost:8000/api/"
  }),
  tagTypes : ["users"],
endpoints : (builder) =>  ({
    getAllUsers : builder.query({
            query : ()=> ({
              url : "user"
            }),
            providesTags:["users"]
    }),
}),
});

export const { useGetAllUsersQuery} = userApi;
