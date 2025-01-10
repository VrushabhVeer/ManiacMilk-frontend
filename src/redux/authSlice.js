import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, otpVerification } from "../utils/apis";
import { toast } from "react-hot-toast";
import { fetchLoggedInCart } from "./cartSlice";
import Cookies from "js-cookie";

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
  async ({ email, otp }, { dispatch, rejectWithValue }) => {
    try {
      const response = await otpVerification({ email, otp });
      const { token, user } = response.data;

      // Save to cookies
      Cookies.set("token", token, { secure: true, sameSite: "Strict" });
      Cookies.set("userId", user._id, { secure: true, sameSite: "Strict" });
      Cookies.set("userEmail", user.email, {
        secure: true,
        sameSite: "Strict",
      });
      toast.success(response.data.message);

      dispatch(fetchLoggedInCart(user._id));
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
      Cookies.remove("token");
      Cookies.remove("userId");
      Cookies.remove("userEmail");
      state.email = null;
      state.user = null;
      state.token = null;
      state.userId = null;
      state.isAuthenticated = false;
    },
    restoreSession: (state) => {
      const token = Cookies.get("token");
      const userId = Cookies.get("userId");
      const userEmail = Cookies.get("userEmail");

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
      .addCase(fetchLoggedInCart.pending, (state) => {
        state.isLoading = true;
      })
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
