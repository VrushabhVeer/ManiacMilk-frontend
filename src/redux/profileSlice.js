import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProfile, editProfile } from "../utils/apis";

// Thunk for fetching profile data
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

// Thunk for updating profile data
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

// Profile slice
const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null,
    status: "idle", // idle, loading, succeeded, failed
    error: null,
  },
  reducers: {
    clearProfile: (state) => {
      state.profile = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearProfile } = profileSlice.actions;

export default profileSlice.reducer;
