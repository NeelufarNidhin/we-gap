import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



const employerApi = createApi({
    reducerPath : "employerApi",
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
    tagTypes :["employers"],
    endpoints : (builder) =>({
        createEmployer : builder.mutation({
            query : (employerData) =>({
                url : "employer",
              method : "POST",
              // headers:{
              //   "Content-type" : "application/json",
              // },
              body : employerData
            }),
            invalidatesTags:["employers"],
        }),
        updateEmployer : builder.mutation({
          query : (employerData) =>({
              url : `employer/${employerData.id}`,
            method : "PUT",
           
            body : employerData
          }),
          invalidatesTags : ["employers"]
      }),
      deleteEmployer : builder.mutation({
          query : (id) =>({
              url : `employer/${id}`,
            method : "DELETE",
           
            body : id
          }),
          invalidatesTags : ["employers"]
      }),

        getEmployers : builder.query({
            query : () =>({
                url : "employer",
              method : "GET",
                     
            }),
            providesTags : ["employers"]
        }),
        getEmployerById : builder.query({
            query : (id) =>({
                url : `employer/${id}`,
             
              }),
              providesTags : ["employers"]
            }),

            getEmployerExists : builder.query({
              query : (userId) =>({
                  url : `employer/exists/${userId}`,
                  method : "GET"
                }),
                providesTags : ["employers"]
              }),
        }),

       
    })

export const {useGetEmployerByIdQuery,useGetEmployersQuery,useGetEmployerExistsQuery,
  useCreateEmployerMutation,useUpdateEmployerMutation,useDeleteEmployerMutation }= employerApi

export default employerApi