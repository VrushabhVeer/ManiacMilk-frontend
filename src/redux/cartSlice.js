import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const findProduct = (cart, productId, size) =>
  cart.find((item) => item._id === productId && item.selectedSize.size === size.size);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      const product = action.payload;

      const existingProduct = findProduct(
        state.cart,
        product._id,
        product.selectedSize
      );

      if (existingProduct) {
        existingProduct.quantity += product.quantity || 1;
      } else {
        state.cart.push({ ...product, quantity: product.quantity || 1 });
      }
    },

    deleteProduct: (state, action) => {
      const { productId, size } = action.payload;
      state.cart = state.cart.filter(
        (item) => !(item._id === productId && item.selectedSize.size === size.size)
      );
    },    

    clearCart: (state) => {
      state.cart = [];
    },

    incrementQuantity: (state, action) => {
      const { productId, size } = action.payload;
      const product = findProduct(state.cart, productId, size);
      if (product) product.quantity += 1;
    },
    
    decrementQuantity: (state, action) => {
      const { productId, size } = action.payload;
      const product = findProduct(state.cart, productId, size);
      if (product) {
        if (product.quantity > 1) {
          product.quantity -= 1;
        } else {
          state.cart = state.cart.filter(
            (item) => !(item._id === productId && item.selectedSize.size === size.size)
          );
        }
      }
    },    
  },
});

export const {
  setCart,
  deleteProduct,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
