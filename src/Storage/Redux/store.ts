import { configureStore } from "@reduxjs/toolkit";
import auth from "../../API/auth";
import { userAuthReducer } from "./userAuthSlice";
import { usersReducer } from "./userSlice";
import { userApi } from "../../API/userApi";
import  employeeApi from "../../API/employeeApi"
import  employerApi from "../../API/employerApi"

const store = configureStore({
    reducer :{
        userAuthStore : userAuthReducer,
        usersStore : usersReducer,
        [employeeApi.reducerPath] : employeeApi.reducer,
        [employerApi.reducerPath] : employerApi.reducer,
        [auth.reducerPath]: auth.reducer
    },
    middleware: (getDefaultMiddleware)=>
    getDefaultMiddleware()
        .concat(auth.middleware)
        .concat(employeeApi.middleware)
        .concat(employerApi.middleware)
      
});

export type RootState = ReturnType<typeof store.getState>;

export default store;