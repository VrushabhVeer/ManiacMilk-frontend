import { createSlice } from "@reduxjs/toolkit";

const localStorageKey = "guestAddress";

// Load guest address from localStorage
const loadGuestAddress = () => {
  const savedAddress = localStorage.getItem(localStorageKey);
  return savedAddress ? JSON.parse(savedAddress) : {};
};

// Save guest address to localStorage
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
      state.address = action.payload;
      if (!localStorage.getItem("token")) saveGuestAddress(state.address);
    },
    deleteAddress: (state) => {
      state.address = {};
      localStorage.removeItem(localStorageKey);
    },
  },
});

export const { setAddress, deleteAddress } = addressSlice.actions;
export default addressSlice.reducer;
