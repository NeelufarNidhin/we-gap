import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



const employeeApi = createApi({
    reducerPath : "employeeApi",
    baseQuery : fetchBaseQuery({
        baseUrl : "http://localhost:8000/api/",
    }),
    endpoints : (builder) =>({
        createEmployee : builder.mutation({
            query : (employeeData) =>({
                url : "employee",
              method : "POST",
              headers:{
                "Content-type" : "application/json",
              },
              body : employeeData
            })
        })
    })
})

export const { useCreateEmployeeMutation} = employeeApi;
export default employeeApi