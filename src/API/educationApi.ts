import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const educationApi = createApi({

    reducerPath : "educationApi",
    baseQuery : fetchBaseQuery({
        baseUrl : "http://localhost:8000/api/",
    }),
    tagTypes : ["Education"],
    endpoints:(builder) =>({
        addEducation : builder.mutation({
            query: (educationData) =>({
                url : "education",
                method:"POST",
                headers:{
                    "Content-type" : "application/json"
                },
                body : educationData
            }),
            invalidatesTags: ["Education"]
        }),
        updateEducation : builder.mutation({
            query: (educationData) =>({
                url : `education/${educationData.id}`,
                method:"PUT",
                headers:{
                    "Content-type" : "application/json"
                },
                body : educationData
            }),
            invalidatesTags: ["Education"]
        }),
        deleteEducation : builder.mutation({
            query: ({id}) =>({
                url : `education/${id}`,
                method:"DELETE",
                headers:{
                    "Content-type" : "application/json"
                },
                body : id
            }),
            invalidatesTags:["Education"]
        }),
        getAllEducation:builder.query({
            query:() =>({
                url : "education",
                method:"GET"
            }),
            providesTags:  ["Education"]
        }),
        getEducationById:builder.query({
            query:({id}) =>({
                url : `education/${id}`,
                method:"GET"
            }),
        })
    })

})


export const {useGetEducationByIdQuery, useGetAllEducationQuery,useAddEducationMutation,useUpdateEducationMutation,useDeleteEducationMutation} = educationApi
export default educationApi