import { createSlice } from "@reduxjs/toolkit";

const localStorageKey = "guestAddress";

// Load address from localStorage for guest users
const loadGuestAddress = () => {
  const savedAddress = localStorage.getItem(localStorageKey);
  return savedAddress
    ? JSON.parse(savedAddress)
    : {
        fullname: "",
        mobile: "",
        email: "",
        house: "",
        area: "",
        city: "",
        pincode: "",
        state: "",
      };
};

// Helper function to persist address for guest users
const saveGuestAddress = (address) => {
  localStorage.setItem(localStorageKey, JSON.stringify(address));
};

const initialState = {
  address: loadGuestAddress(),
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setAddress: (state, action) => {
      // Replace the entire address object
      state.address = action.payload;

      // Save address to localStorage for guest users
      saveGuestAddress(state.address);
    },

    deleteAddress: (state) => {
      // Clear the address object by resetting to initial structure
      state.address = {
        fullname: "",
        mobile: "",
        email: "",
        house: "",
        area: "",
        city: "",
        pincode: "",
        state: "",
      };

      // Remove address from localStorage for guest users
      saveGuestAddress(state.address);
    },

    editAddress: (state, action) => {
      // Update specific fields of the address object
      state.address = { ...state.address, ...action.payload };

      // Save updated address to localStorage for guest users
      saveGuestAddress(state.address);
    },
  },
});

export const { setAddress, deleteAddress, editAddress } = addressSlice.actions;

export default addressSlice.reducer;
