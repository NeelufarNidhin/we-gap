import React from 'react'

import { createApi , fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const  userApi =  createApi({
  reducerPath : "userApi",
  baseQuery : fetchBaseQuery({
    baseUrl :  `${process.env.REACT_APP_API_URL}/`,
  }),
  tagTypes : ["users"],
endpoints : (builder) =>  ({
    getAllUsers : builder.query({
            query : ({id})=> ({
              url : `user/${id}`
            }),
            providesTags:["users"]
    }),
    getUserById : builder.query({
      query : ()=> ({
        url : "user",
        method :"GET"
      }),
      
}),
updateUser: builder.mutation({
  query : (id) => ({
    url : `user/${id}`,
    method : "PUT",
    headers:{
      "Content-type" : "application/json",
    },
    body : id
  }),
}), 
deleteUser: builder.mutation({
  query : (id) => ({
    url : `user/${id}`,
    method : "DELETE",
    headers:{
      "Content-type" : "application/json",
    },
    body : id
  }),
}), 

    blockUser : builder.mutation({
      query : ({id})=>({
        url : `/user/block/${id}`,
        method : "POST",
        headers : {
          "Content-type" : "application/json"
      },
      body : id
      })
    })
}),


});

export const { useGetAllUsersQuery,useGetUserByIdQuery,useDeleteUserMutation,useUpdateUserMutation,useBlockUserMutation} = userApi;
