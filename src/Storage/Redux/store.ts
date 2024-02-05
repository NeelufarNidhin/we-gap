import { configureStore } from "@reduxjs/toolkit";
import auth from "../../API/auth";
import { userAuthReducer } from "./userAuthSlice";
import { employeeAuthReducer } from "./employeeSlice";
import { usersReducer } from "./userSlice";
import { userApi } from "../../API/userApi";
import  employeeApi from "../../API/employeeApi"
import  employerApi from "../../API/employerApi"
import jobApi from "../../API/jobApi";
import jobSkillApi from "../../API/jobskillApi";
import jobTypeApi from "../../API/jobTypeApi";
import experienceApi from "../../API/experienceApi";
import educationApi from "../../API/educationApi";

const store = configureStore({
    reducer :{
        userAuthStore : userAuthReducer,
        usersStore : usersReducer,
      //  employeeAuthStore : employeeAuthReducer,
        [userApi.reducerPath] : userApi.reducer,
        [employeeApi.reducerPath] : employeeApi.reducer,
        [employerApi.reducerPath] : employerApi.reducer,
        [experienceApi.reducerPath] : experienceApi.reducer,
        [educationApi.reducerPath] : educationApi.reducer,
        [jobSkillApi.reducerPath] : jobSkillApi.reducer,
        [jobTypeApi.reducerPath] : jobTypeApi.reducer,
        [jobApi.reducerPath] : jobApi.reducer,
        [auth.reducerPath]: auth.reducer
    },
    middleware: (getDefaultMiddleware)=>
    getDefaultMiddleware()
        .concat(auth.middleware)
        .concat(userApi.middleware)
        .concat(employeeApi.middleware)
        .concat(employerApi.middleware)
        .concat(experienceApi.middleware)
        .concat(educationApi.middleware)
        .concat(jobApi.middleware)
        .concat(jobSkillApi.middleware)
        .concat(jobTypeApi.middleware)
      
});

export type RootState = ReturnType<typeof store.getState>;

export default store;