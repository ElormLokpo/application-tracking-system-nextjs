import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
    token:string | undefined,
}

const initialState: AuthState = {
    token: undefined,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
        },
        removeToken: (state) => {
            state.token = undefined
        }
    }
})

export const { setToken, removeToken } = authSlice.actions
export default authSlice.reducer