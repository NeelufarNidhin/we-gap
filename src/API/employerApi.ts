import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



const employerApi = createApi({
    reducerPath : "employerApi",
    baseQuery : fetchBaseQuery({
        baseUrl : "http://localhost:8000/api/",
    }),
    tagTypes :["employers"],
    endpoints : (builder) =>({
        createEmployer : builder.mutation({
            query : (employerData) =>({
                url : "employer",
              method : "POST",
              headers:{
                "Content-type" : "application/json",
              },
              body : employerData
            }),
        }),
        getEmployers : builder.query({
            query : () =>({
                url : "employer",
              method : "GET",
              
             providesTags : ["employers"]
            }),
        }),
        getEmployerById : builder.query({
            query : (id) =>({
                url : `employer/${id}`,
             
              }),
              providesTags : ["employers"]
            }),
        }),

       
    })

export const {useGetEmployerByIdQuery,useGetEmployersQuery }= employerApi
export const { useCreateEmployerMutation} = employerApi;
export default employerApi