import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



const jobApplicationApi = createApi({
    reducerPath : "jobApplicationApi",
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
    tagTypes :["JobApplications"],
    endpoints : (builder) =>({
        getJobApplication : builder.query({
            query: () =>({
                url : "jobApplication",
                method : "GET",
               
            }),
            
            providesTags : ["JobApplications"]
           
        }),

        getJobApplicationById : builder.query({
            query : (id) => ({
                url : `jobApplication/${id}`,
                method:"GET"
            }),
            providesTags : ["JobApplications"]
        }),
        
        createJobApplication : builder.mutation({
            query: (jobApplicationData) =>({
                url : "jobApplication",
                method : "POST",
                // headers : {
                //     "Content-type" : "application/json"
                // },
                body : jobApplicationData
            }),
            invalidatesTags : ["JobApplications"]
        }),
        updateJobApplication : builder.mutation({
            query: (jobApplicationData) =>({
                url : `jobApplication/${jobApplicationData.id}`,
                method : "PUT",
                // headers : {
                //     "Content-type" : "application/json"
                // },
                body : jobApplicationData
            }),
            invalidatesTags : ["JobApplications"]
        }),
        deleteJobApplication : builder.mutation({
            query: (id) =>({
                url : `jobApplication/${id}`,
                method : "DELETE",
                // headers : {
                //     "Content-type" : "application/json"
                // },
                body : id
            }),
            invalidatesTags : ["JobApplications"]
        })
        
        
    })
}
    
)

export default  jobApplicationApi

export const { useCreateJobApplicationMutation ,useDeleteJobApplicationMutation ,useUpdateJobApplicationMutation ,
     useGetJobApplicationQuery, useGetJobApplicationByIdQuery } = jobApplicationApi