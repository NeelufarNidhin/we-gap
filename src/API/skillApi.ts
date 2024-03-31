import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



const skillApi = createApi({
    reducerPath : "skillApi",
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
    tagTypes :["Skills"],
    endpoints : (builder) =>({
        getSkill : builder.query({
            query: () =>({
                url : "skill",
                method : "GET",
               
            }),
            providesTags : ["Skills"]
           
        }),

        getSkillById : builder.query({
            query : (id) => ({
                url : `skill/${id}`,
                method:"GET"
            }),
            providesTags : ["Skills"]
        }),
        getEmployeeSkill:builder.query({
            query:(id) =>({
                url : `skill/employee/${id}`,
                method:"GET"
            }),
            providesTags:  ["Skills"]
        }),
        createSkill : builder.mutation({
            query: (skillData) =>({
                url : "skill",
                method : "POST",
                
                body : skillData
            }),
            invalidatesTags : ["Skills"]
        }),
        updateSkill : builder.mutation({
            query: (skillData) =>({
                url : `skill/${skillData.id}`,
                method : "PUT",
                
                body : skillData
            }),
            invalidatesTags : ["Skills"]
        }),
        deleteSkill : builder.mutation({
            query: (id) =>({
                url : `skill/${id}`,
                method : "DELETE",
                // headers : {
                //     "Content-type" : "application/json"
                // },
                body : id
            }),
            invalidatesTags : ["Skills"]
        })
        
        
    })
}
    
)

export default  skillApi

export const { useCreateSkillMutation ,useDeleteSkillMutation ,useUpdateSkillMutation , 
    useGetSkillQuery, useGetSkillByIdQuery ,useGetEmployeeSkillQuery} = skillApi