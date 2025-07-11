import { createSlice } from "@reduxjs/toolkit";

// Load user data from localStorage
const initialUser = JSON.parse(localStorage.getItem("user")) || null;
const initialToken = localStorage.getItem("token") || null;


const authSlice = createSlice({
    name: "auth",
    initialState:{
        user: initialUser,
        token: initialToken,
    },
    reducers:{
        // Login reducer: store user and token
        login: (state,action) =>{
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        // Logout reducer: clear state and localStorage
        logout: (state,action) =>{
            state.user = null;
            state.token = null;
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        }
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;