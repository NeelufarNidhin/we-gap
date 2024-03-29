import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



const jobSkillApi = createApi({
    reducerPath : "jobSkillApi",
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
    tagTypes :["JobSkills"],
    endpoints : (builder) =>({
        getJobSkill : builder.query({
            query: () =>({
                url : "jobSkill",
                method : "GET",
               
            }),
            providesTags : ["JobSkills"]
           
        }),

        getJobSkillById : builder.query({
            query : (id) => ({
                url : `jobSkill/${id}`,
                method:"GET"
            }),
            // providesTags : ["JobSkills"]
        }),
        createJobSkill : builder.mutation({
            query: (jobskillData) =>({
                url : "jobSkill",
                method : "POST",
                // headers : {
                //     "Content-type" : "application/json"
                // },
                body : jobskillData
            }),
            invalidatesTags : ["JobSkills"]
        }),
        updateJobSkill : builder.mutation({
            query: (jobskillData) =>({
                url : `jobSkill/${jobskillData.id}`,
                method : "PUT",
                // headers : {
                //     "Content-type" : "application/json"
                // },
                body : jobskillData
            }),
            invalidatesTags : ["JobSkills"]
        }),
        deleteJobSkill : builder.mutation({
            query: ({id}) =>({
                url : `jobSkill/${id}`,
                method : "DELETE",
                // headers : {
                //     "Content-type" : "application/json"
                // },
                body : id
            }),
            invalidatesTags : ["JobSkills"]
        })
        
        
    })
}
    
)

export default  jobSkillApi

export const { useCreateJobSkillMutation ,useDeleteJobSkillMutation ,useUpdateJobSkillMutation , useGetJobSkillQuery, useGetJobSkillByIdQuery } = jobSkillApi