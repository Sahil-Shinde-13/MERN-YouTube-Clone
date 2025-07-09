import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import commentReducer from "./commentSlice";

const store = configureStore({
    reducer:{
        auth: authReducer,
        comments: commentReducer,
    }
})

export default store;