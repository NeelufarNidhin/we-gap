import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const chatApi = createApi({

    reducerPath : "chatApi",
    baseQuery : fetchBaseQuery({
        baseUrl :  `${process.env.REACT_APP_API_URL}/api`,
        prepareHeaders : (headers) => {
            const token = localStorage.getItem("token");
            if(token){
              headers.set('Authorization' , `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes : ["Messages"],
    endpoints:(builder) =>({
       
        getMessages:builder.query({
            query:({senderId ,receiverId} ) =>({
                url : `message/${senderId}/${receiverId}`,
                method:"GET"
            }),
            providesTags:  ["Messages"]
        }),
        
    })

})


export const {useGetMessagesQuery} = chatApi
export default chatApi