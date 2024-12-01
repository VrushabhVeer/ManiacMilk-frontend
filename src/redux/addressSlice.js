import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  address: {
    fullname: "",
    mobile: "",
    email: "",
    house: "",
    area: "",
    city: "",
    pincode: "",
    state: "",
  },
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload;
    },

    deleteAddress: (state, action) => {
      const addressId = action.payload;
      state.address = state.address.filter((item) => item._id !== addressId);
    },

    editAddress: () => {
        
    },
  },
});

export const { setAddress, deleteAddress, editAddress } = addressSlice.actions;

export default addressSlice.reducer;
