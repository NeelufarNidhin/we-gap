

import { createApi , fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const  userApi =  createApi({
  reducerPath : "userApi",
  baseQuery : fetchBaseQuery({
    baseUrl :  `${process.env.REACT_APP_API_URL}/`,
    prepareHeaders : (headers) => {
      
      const token = localStorage.getItem("token");
      if(token){
        headers.set('Authorization' , `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes : ["users"],
endpoints : (builder) =>  ({
  getAllUsers : builder.query({
    query : () => ({
        url : "user",
      method : "GET",
             
    }),
    providesTags : ["users"]
  }),
    getUserById : builder.query({
      query : (id)=> ({
        url : `user/${id}`,
        
      }),
      providesTags:["users"] 
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
  invalidatesTags : ["users"]
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
  invalidatesTags : ["users"]
}), 

    blockUser : builder.mutation({
      query : (id)=>({
        url : `/user/block/${id}`,
        method : "POST",
        headers : {
          "Content-type" : "application/json"
      },
      body : id
      }),
      invalidatesTags : ["users"]
    })
}),


});

export const { useGetAllUsersQuery,useGetUserByIdQuery,useDeleteUserMutation,
  useUpdateUserMutation,useBlockUserMutation} = userApi;
