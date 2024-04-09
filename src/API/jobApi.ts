import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



const jobApi= createApi({
    reducerPath : "jobApi",
    baseQuery : fetchBaseQuery({
        baseUrl : `${process.env.REACT_APP_API_URL}/`,
        prepareHeaders : (headers) => {
            const token = localStorage.getItem("token");
            if(token){
              headers.set('Authorization' , `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes : ["Jobs"],
    endpoints : builder => ({
        getJobs :  builder.query({
            query : ({searchString,jobType,jobSkill, pageNumber,pageSize}) =>({
                url :  "job",
                method : "GET",
                params : {
                    ...(searchString && {searchString}),
                    ...(jobType && {jobType}),
                    ...(jobSkill && {jobSkill}),
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
            providesTags : ["Jobs"]
        }),
        getJobById : builder.query({
            query :(id) =>({
                url : `job/${id}`,
                method : "GET"

            }),
            providesTags :["Jobs"]
        }),
        getJobByEmployerId : builder.query({
            query :(id) =>({
                url : `job/employer/${id}`,
                method : "GET"

            }),
            providesTags :["Jobs"]
        }),
        createJob : builder.mutation({
            query : (postJob) =>({
            url : "job",
            method : "POST",
            headers :{
                "content-type" : "application/json"},
                body : postJob
            }),
            invalidatesTags :["Jobs"]
            
        }),
        updateJob : builder.mutation({
            query : (jobData) =>({
            url : `job/${jobData.id}`,
            method : "PUT",
            headers :{
                "content-type" : "application/json"},
                body : jobData
            }),
            invalidatesTags :["Jobs"]
        }),
        deleteJob : builder.mutation({
            query : (id) =>({
            url : `job/${id}`,
            method : "DELETE",
            headers :{
                "content-type" : "application/json"},
                body :id
            }),
            invalidatesTags :["Jobs"]
        })
    })
})


export const { useGetJobsQuery, useGetJobByIdQuery ,useCreateJobMutation,useGetJobByEmployerIdQuery,
    useDeleteJobMutation,useUpdateJobMutation} = jobApi;

export default jobApi;