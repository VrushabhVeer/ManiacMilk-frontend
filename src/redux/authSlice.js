import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  token: null,
  email: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSucess: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.email = action.payload.email;
    },

    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.email = null;
    },
  },
});


export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
