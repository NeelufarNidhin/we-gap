import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



const jobApi= createApi({
    reducerPath : "jobApi",
    baseQuery : fetchBaseQuery({
        baseUrl : `${process.env.REACT_APP_API_URL}/`,
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
            url : "job",
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