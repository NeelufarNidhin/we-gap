import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const experienceApi = createApi({

    reducerPath : "experienceApi",
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
    tagTypes : ["Experience"],
    endpoints:(builder) =>({
        addExperience : builder.mutation({
            query: (experienceData) =>({
                url : "experience",
                method:"POST",
                headers:{
                    "Content-type" : "application/json"
                },
                body : experienceData
            }),
            invalidatesTags: ["Experience"]
        }),
        updateExperience : builder.mutation({
            query: (experienceData) =>({
                url : `experience/${experienceData.id}`,
                method:"PUT",
                // headers:{
                //     "Content-type" : "application/json"
                // },
                body : experienceData
            }),
            invalidatesTags: ["Experience"]
        }),
        deleteExperience : builder.mutation({
            query: (id) =>({
                url : `experience/${id}`,
                method:"DELETE",
                headers:{
                    "Content-type" : "application/json"
                },
                body : id
            }),
            invalidatesTags: ["Experience"]
        }),
        getAllExperience:builder.query({
            query:() =>({
                url : "experience",
                method:"GET"
            }),
            providesTags:  ["Experience"]
        }),
        getExperienceById:builder.query({
            query:(id) =>({
                url : `experience/${id}`,
                method:"GET"
            }),
            providesTags:  ["Experience"]
        }),
        getEmployeeExperience:builder.query({
            query:(id) =>({
                url : `experience/employee/${id}`,
                method:"GET"
            }),
            providesTags:  ["Experience"]
        }),
    })

})


export const {useGetExperienceByIdQuery, useGetAllExperienceQuery,
    useAddExperienceMutation,useUpdateExperienceMutation,
    useDeleteExperienceMutation,useGetEmployeeExperienceQuery} = experienceApi
export default experienceApi