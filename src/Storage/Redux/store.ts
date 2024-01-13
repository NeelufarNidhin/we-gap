import { configureStore } from "@reduxjs/toolkit";
import auth from "../../API/auth";
import { userAuthReducer } from "./userAuthSlice";
import { usersReducer } from "./userSlice";
import { userApi } from "../../API/userApi";


const store = configureStore({
    reducer :{
        userAuthStore : userAuthReducer,
        usersStore : usersReducer,
        [auth.reducerPath]: auth.reducer
    },
    middleware: (getDefaultMiddleware)=>
    getDefaultMiddleware()
        .concat(auth.middleware)
      
});

export type RootState = ReturnType<typeof store.getState>;

export default store;