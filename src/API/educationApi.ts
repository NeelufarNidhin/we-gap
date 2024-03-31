import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const educationApi = createApi({

    reducerPath : "educationApi",
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
    tagTypes : ["Education"],
    endpoints:(builder) =>({
        addEducation : builder.mutation({
            query: (educationData) =>({
                url : "education",
                method:"POST",
                // headers:{
                //     "Content-type" : "application/json"
                // },
                body : educationData
            }),
            invalidatesTags: ["Education"]
        }),
        updateEducation : builder.mutation({
            query: (educationData) =>({
                url : `education/${educationData.id}`,
                method:"PUT",
                
                body : educationData
            }),
            invalidatesTags: ["Education"]
        }),
        deleteEducation : builder.mutation({
            query: (id) =>({
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
            query:(id) =>({
                url : `education/${id}`,
                method:"GET"
            }),
            providesTags:  ["Education"]
        }),
        getEmployeeEducation:builder.query({
            query:(id) =>({
                url : `education/employee/${id}`,
                method:"GET"
            }),
            providesTags:  ["Education"]
        })
    })

})


export const {useGetEducationByIdQuery,useGetEmployeeEducationQuery,useGetAllEducationQuery
     ,useAddEducationMutation,useUpdateEducationMutation,useDeleteEducationMutation} = educationApi
export default educationApi