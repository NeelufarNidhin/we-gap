import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



const employeeApi = createApi({
    reducerPath : "employeeApi",
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
    tagTypes :["Employees"],
    endpoints : (builder) =>({
        createEmployee : builder.mutation({
            query : (employeeData) =>({
                url : "employee",
              method : "POST",
             
              body : employeeData
            }),
            invalidatesTags : ["Employees"]
        }),
        updateEmployee : builder.mutation({
            query : (employeeData) =>({
                url : `employee/${employeeData.id}`,
              method : "PUT",
             
              body : employeeData
            }),
            invalidatesTags : ["Employees"]
        }),
        deleteEmployee : builder.mutation({
            query : (id) =>({
                url : `employee/${id}`,
              method : "DELETE",
             
              body : id
            }),
            invalidatesTags : ["Employees"]
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

    export const {useGetEmployeeByIdQuery,useGetEmployeesQuery,useGetEmployeeExistsQuery,
    useCreateEmployeeMutation,useDeleteEmployeeMutation,useUpdateEmployeeMutation }= employeeApi

export default employeeApi