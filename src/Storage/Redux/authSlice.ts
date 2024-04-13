import { createSlice } from "@reduxjs/toolkit";

const localAuth  = localStorage.getItem("auth");
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
            localStorage.setItem("auth", JSON.stringify(state));
        },
        logOut :(state ) =>{
            state.email = "";
            state.role = "";
            state.accessToken = "";
            localStorage.setItem("auth", JSON.stringify(state));
        },
    }
})


export const{ login,logOut} = authSlice.actions
export const authReducer = authSlice.reducer

export const selectCurrentRole = (state:any) => state.auth.role;
export const selectCurrentToken = (state:any) => state.auth.accessToken;