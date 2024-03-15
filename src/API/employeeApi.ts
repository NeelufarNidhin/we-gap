import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



const employeeApi = createApi({
    reducerPath : "employeeApi",
    baseQuery : fetchBaseQuery({
        baseUrl : "http://localhost:8000/api/",
    }),
    tagTypes :["Employees"],
    endpoints : (builder) =>({
        createEmployee : builder.mutation({
            query : (employeeData) =>({
                url : "employee",
              method : "POST",
              headers:{
                "Content-type" : "application/json",
              },
              body : employeeData
            }),
        }),
        getEmployees : builder.query({
            query : () =>({
                url : "employee",
              method : "GET",
              
             providesTags : ["Employees"]
            }),
        }),
        getEmployeeById : builder.query({
            query : (id) =>({
                url : `employee/${id}`,
                method : "GET"
              }),
              providesTags : ["Employees"]
            }),
            getEmployeeExists : builder.query({
                query : (userId) =>({
                    url : `employee/exists/${userId}`,
                    method : "GET"
                  }),
                  providesTags : ["Employees"]
                }),
        }),
    })

    export const {useGetEmployeeByIdQuery,useGetEmployeesQuery,useGetEmployeeExistsQuery }= employeeApi
export const { useCreateEmployeeMutation} = employeeApi;
export default employeeApi