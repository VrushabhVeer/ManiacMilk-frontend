// redux/profileSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProfile, editProfile, deleteAccount } from "../utils/apis";

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getProfile();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch profile");
    }
  }
);

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (formData, { rejectWithValue }) => {
    try {
      await editProfile(formData);
      const updatedProfile = await getProfile();
      return updatedProfile.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update profile"
      );
    }
  }
);

export const deleteUserAccount = createAsyncThunk(
  "profile/deleteAccount",
  async (_, { rejectWithValue }) => {
    try {
      await deleteAccount();
      return true;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to delete account"
      );
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  },
  reducers: {
    resetProfile: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(deleteUserAccount.fulfilled, (state) => {
        state.data = null;
      });
  },
});

export const { resetProfile } = profileSlice.actions;
export default profileSlice.reducer;
