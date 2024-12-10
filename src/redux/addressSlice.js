// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   address: {
//     fullname: "",
//     mobile: "",
//     email: "",
//     house: "",
//     area: "",
//     city: "",
//     pincode: "",
//     state: "",
//   },
// };

// const addressSlice = createSlice({
//   name: "address",
//   initialState,
//   reducers: {
//     setAddress: (state, action) => {
//       state.address = action.payload;
//     },

//     deleteAddress: (state, action) => {

//     },

//     editAddress: () => {

//     },
//   },
// });

// export const { setAddress, deleteAddress, editAddress } = addressSlice.actions;

// export default addressSlice.reducer;

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
      // Replace the entire address object
      state.address = action.payload;
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
    },

    editAddress: (state, action) => {
      // Update specific fields of the address object
      state.address = { ...state.address, ...action.payload };
    },
  },
});

export const { setAddress, deleteAddress, editAddress } = addressSlice.actions;

export default addressSlice.reducer;
