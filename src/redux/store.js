import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./orderSlice.js";
import cartReducer from "./cartSlice.js";
import addressReducer from "./addressSlice.js";

const store = configureStore({
  reducer: {
    order: orderReducer,
    cart: cartReducer,
    address: addressReducer,
  },
});

export default store;
