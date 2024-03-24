import { createSlice } from "@reduxjs/toolkit";
import userModel from "../../Interfaces/userModel";

export const emptyUserState: userModel = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  role: "",
  isBlocked: false,
 
};

export const userAuthSlice = createSlice({
  name: "userAuth",
  initialState: emptyUserState,
  reducers: {
    setLoggedInUser: (state, action) => {
      state.id = action.payload.id;
      state.firstName = action.payload.firstName;
      state.firstName = action.payload.firstName;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.isBlocked = action.payload.isBlocked;
    },
    
  },
});

export const { setLoggedInUser } = userAuthSlice.actions;
export const userAuthReducer = userAuthSlice.reducer;
