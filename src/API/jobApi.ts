import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



const jobApi= createApi({
    reducerPath : "jobApi",
    baseQuery : fetchBaseQuery({
        baseUrl : "http://localhost:8000/api/",
    }),
    tagTypes : ["Jobs"],
    endpoints : builder => ({
        getJobs :  builder.query({
            query : () =>({
                url :  "/job ",
                method : "GET"
            }),
            providesTags : ["Jobs"]
        }),
        getJobById : builder.query({
            query :(id) =>({
                url : `/job/${id}`,
                method : "GET"

            }),
            providesTags :["Jobs"]
        }),
        createJob : builder.mutation({
            query : (postJob) =>({
            url : "jobs",
            method : "POST",
            headers :{
                "content-type" : "application/json"},
                body : postJob
            }),
            
        })
    })
})


export const { useGetJobsQuery, useGetJobByIdQuery ,useCreateJobMutation} = jobApi;

export default jobApi;