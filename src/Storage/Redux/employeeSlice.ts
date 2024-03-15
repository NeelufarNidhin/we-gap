import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    employees : [],
};

export const userSlice = createSlice({
    name : "Users ",
    initialState : initialState,
    reducers :{
        setUsers :(state , action) =>{
            state.employees = action.payload;
        }
    }
})


export const{ setUsers} = userSlice.actions
export const usersReducer = userSlice.reducer