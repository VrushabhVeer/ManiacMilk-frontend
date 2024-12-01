import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedProduct: {},
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

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },

    setAddress: (state, action) => {
      state.address = action.payload;
    },
  },
});

export const { setSelectedProduct, setAddress } = orderSlice.actions;

export default orderSlice.reducer;
