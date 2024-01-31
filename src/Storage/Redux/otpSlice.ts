import { createSlice } from "@reduxjs/toolkit";
import otpModel from "../../Interfaces/otpModel";

export const emptyOtpState: otpModel = {
  Otp:"",
  Email:""
};

export const otpSlice = createSlice({
  name: "otpAuth",
  initialState: emptyOtpState,
  reducers: {
    setOtpLogged: (state, action) => {
      state.Otp = action.payload.otp;
      state.Email = action.payload.username;
      
    },
  },
});

export const { setOtpLogged } = otpSlice.actions;
export const otpAuthReducer = otpSlice.reducer;
