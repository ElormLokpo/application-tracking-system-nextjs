import { createSlice } from "@reduxjs/toolkit";
import { IUserRedux } from "../../../../../packages/types";

interface AuthState {
  token: string | undefined;
  user: IUserRedux | undefined;
}

const initialState: AuthState = {
  token: undefined,
  user: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    removeToken: (state) => {
      state.token = undefined;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = undefined;
    },
  },
});

export const { setToken, removeToken, setUser, removeUser } = authSlice.actions;
export default authSlice.reducer;
