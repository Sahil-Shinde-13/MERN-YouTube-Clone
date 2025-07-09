import { createSlice } from "@reduxjs/toolkit";

const initialUser = JSON.parse(localStorage.getItem("user")) || null;
const initialToken = localStorage.getItem("token") || null;


const authSlice = createSlice({
    name: "auth",
    initialState:{
        user: initialUser,
        token: initialToken,
    },
    reducers:{
        login: (state,action) =>{
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
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