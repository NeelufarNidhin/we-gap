import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email : "",
    role : "",
    accessToken : ""
};

export const authSlice = createSlice({
    name : "Auth",
    initialState : initialState,
    reducers :{
        login :(state , action) =>{
            state.email = action.payload;
            state.role = action.payload;
            state.accessToken = action.payload;
        },
        logOut :(state ) =>{
            state.email = "";
            state.role = "";
            state.accessToken = "";
        },
    }
})


export const{ login,logOut} = authSlice.actions
export const authReducer = authSlice.reducer

export const selectCurrentUser = (state:any) => state.auth;