import { configureStore } from "@reduxjs/toolkit";
import auth from "../../API/auth";
import { userAuthReducer } from "./userAuthSlice";


const store = configureStore({
    reducer :{
        userAuthStore : userAuthReducer,
        [auth.reducerPath]: auth.reducer
    },
    middleware: (getDefaultMiddleware)=>
    getDefaultMiddleware()
        .concat(auth.middleware)
    
});

export type RootState = ReturnType<typeof store.getState>;

export default store;