import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, otpVerification } from "../utils/apis";
import { toast } from "react-hot-toast";

// Thunks
export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async (email, { rejectWithValue }) => {
    try {
      const response = await login({ email });
      toast.success(response.data.message);
      return { email };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to send OTP. Try again.";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await otpVerification({ email, otp });
      const { token, user } = response.data;

      // Save to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userId", user._id);
      localStorage.setItem("userEmail", user.email);

      toast.success(response.data.message);
      return { token, user };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "OTP verification failed.";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    email: null,
    user: null,
    token: null,
    userId: null,
    isAuthenticated: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.clear();
      state.email = null;
      state.user = null;
      state.token = null;
      state.userId = null;
      state.isAuthenticated = false;
    },
    restoreSession: (state) => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const userEmail = localStorage.getItem("userEmail");

      if (token && userId) {
        state.isAuthenticated = true;
        state.userId = userId;
        state.token = token;
        state.userEmail = userEmail;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.email = action.payload.email;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.userId = action.payload.user._id;
        state.isAuthenticated = true;
      });
  },
});

export const { logout, restoreSession } = authSlice.actions;

export default authSlice.reducer;
