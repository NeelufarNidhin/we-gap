import { createSlice } from "@reduxjs/toolkit";
import userModel from "../../Interfaces/userModel";

const initialState : userModel =
 {
    email : "",
    role : ""
};


export const userAuthSlice = createSlice({
    name: "userAuth",
    initialState : initialState,
    reducers : {
        setLoggedInUser : (state,action) =>{
            state.email = action.payload.id;
            state.role = action.payload.role;
        },
    },
});


export const { setLoggedInUser} = userAuthSlice.actions;
export const userAuthReducer = userAuthSlice.reducer;