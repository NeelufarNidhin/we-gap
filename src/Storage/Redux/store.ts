import { configureStore } from "@reduxjs/toolkit";
import auth from "../../API/auth";
import { userAuthReducer } from "./userAuthSlice";
import { usersReducer } from "./userSlice";
import { userApi } from "../../API/userApi";
import  employeeApi from "../../API/employeeApi"
import  employerApi from "../../API/employerApi"
import jobApi from "../../API/jobApi";
import jobSkillApi from "../../API/jobskillApi";
import jobTypeApi from "../../API/jobTypeApi";
import { otpAuthReducer } from "./otpSlice";

const store = configureStore({
    reducer :{
        userAuthStore : userAuthReducer,
        otpAuthStore : otpAuthReducer,
        usersStore : usersReducer,
        [employeeApi.reducerPath] : employeeApi.reducer,
        [employerApi.reducerPath] : employerApi.reducer,
        [jobSkillApi.reducerPath] : jobSkillApi.reducer,
        [jobTypeApi.reducerPath] : jobTypeApi.reducer,
        [jobApi.reducerPath] : jobApi.reducer,
        [auth.reducerPath]: auth.reducer
    },
    middleware: (getDefaultMiddleware)=>
    getDefaultMiddleware()
        .concat(auth.middleware)
        .concat(employeeApi.middleware)
        .concat(employerApi.middleware)
        .concat(jobApi.middleware)
        .concat(jobSkillApi.middleware)
        .concat(jobTypeApi.middleware)
      
});

export type RootState = ReturnType<typeof store.getState>;

export default store;