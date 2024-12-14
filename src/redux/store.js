import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./orderSlice.js";
import cartReducer from "./cartSlice.js";
import addressReducer from "./addressSlice.js";
import authReducer from "./authSlice.js";

const store = configureStore({
  reducer: {
    order: orderReducer,
    cart: cartReducer,
    address: addressReducer,
    auth: authReducer,
  },
});

export default store;
