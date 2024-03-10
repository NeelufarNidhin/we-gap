import { createSlice } from "@reduxjs/toolkit";
import employeeModel from "../../Interfaces/employeeModel";

export const emptyEmployeeState: employeeModel = {
  id   : "",
  firstName : "",
  lastName : "",
  email: "",
  applicationUserId: "",
  dob: new Date(),
  gender: "",
  address: "",
  state: "",
  city: "",
  pincode: 0,
  mobileNumber: 0,
  bio: "",
  imageName: ""
}


export const employeeSlice = createSlice({
  name: "employeeAuth",
  initialState: emptyEmployeeState,
  reducers: {
    setLoggedInEmployee: (state, action) => {
      state.id = action.payload.id;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
    //  state.applicationUserId = action.payload.applicationUserId,
      state.dob= action.payload.dob
 // state.gender= action.payload.gender,
  state.address= action.payload.address,
  state.state =  action.payload.state,
  state.city = action.payload.city,
  state.pincode= action.payload.pincode,
  state.mobileNumber= action.payload.mobileNumber,
  state.bio= action.payload.bio,
  state.imageName= action.payload.imageName
    },
  },
});

export const { setLoggedInEmployee } = employeeSlice.actions;
export const employeeAuthReducer = employeeSlice.reducer;
