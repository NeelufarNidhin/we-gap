import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



const jobTypeApi = createApi({
    reducerPath : "jobTypeApi",
    baseQuery : fetchBaseQuery({
        baseUrl :  `${process.env.REACT_APP_API_URL}/api/`,
        prepareHeaders : (headers) => {
            const token = localStorage.getItem("token");
            if(token){
              headers.set('Authorization' , `Bearer ${token}`);
            }
            return headers;
        }
        
    }),
    tagTypes :["JobTypes"],
    endpoints : (builder) =>({
        createJobType : builder.mutation({
            query: (jobTypeData) =>({
                url : "jobType",
                method : "POST",
                headers : {
                    "Content-type" : "application/json"
                },
                body : jobTypeData
            }),
            invalidatesTags : ["JobTypes"]
        }),

        getJobType : builder.query({
            query: ({pageNumber, pageSize}) =>({
                url : "jobType",
                method : "GET",
                params : {
                    ...(pageNumber && {pageNumber}),
                    ...(pageSize && {pageSize})
                }
                
            }),
            transformResponse(apiResponse: { result : any}, meta : any){
                return {
                  apiResponse,
                  totalRecords: meta.response.headers.get("X-Pagination"),
                };
              },
            providesTags : ["JobTypes"]
        }),

        getJobTypeById : builder.query({
            query : (id) => ({
                url : `jobType/${id}`,
                method:"GET"
            }),
            providesTags : ["JobTypes"]
        }),

        updateJobType : builder.mutation({
            query: (jobtypeData) =>({
                url : `jobType/${jobtypeData.id}`,
                method : "PUT",
                headers : {
                    "Content-type" : "application/json"
                },
                body : jobtypeData
            }),
            invalidatesTags : ["JobTypes"]
        }),
        deleteJobType : builder.mutation({
            query: (id) =>({
                url : `jobType/${id}`,
                method : "DELETE",
                headers : {
                    "Content-type" : "application/json"
                },
                body : id
            }),
            invalidatesTags : ["JobTypes"]
        })
    })
}
    
)

export default  jobTypeApi

export const { useCreateJobTypeMutation ,useUpdateJobTypeMutation,
    useDeleteJobTypeMutation, useGetJobTypeQuery, useGetJobTypeByIdQuery } = jobTypeApi