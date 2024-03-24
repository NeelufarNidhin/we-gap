import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users : [],
};

export const userSlice = createSlice({
    name : "Users ",
    initialState : initialState,
    reducers :{
        setUsers :(state , action) => {
            state.users = action.payload
        }
    }
})


export const{ setUsers} = userSlice.actions;
export const usersReducer = userSlice.reducer;