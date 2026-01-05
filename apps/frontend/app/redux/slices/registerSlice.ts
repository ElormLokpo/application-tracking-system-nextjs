import { createSlice } from "@reduxjs/toolkit";

interface RegisterState {
  fullname: string;
  email: string;
  password: string;
  role: string;
}

const initialState: RegisterState = {
  fullname: "",
  email: "",
  password: "",
  role: "",
};

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    storeRegisterData: (state, action) => {
      state.fullname = action.payload.fullname;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.role = action.payload.role;
    },
    clearRegisterData: (state) => {
      state.fullname = "";
      state.email = "";
      state.password = "";
      state.role = "";
    },
  },
});

export const { storeRegisterData, clearRegisterData } = registerSlice.actions;
export default registerSlice.reducer;
