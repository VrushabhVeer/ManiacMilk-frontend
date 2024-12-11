import { createSlice } from "@reduxjs/toolkit";

const localStorageKey = "guestCart";

// Load cart from localStorage for guest users
const loadGuestCart = () => {
  const savedCart = localStorage.getItem(localStorageKey);
  return savedCart ? JSON.parse(savedCart) : [];
};

const initialState = {
  cart: loadGuestCart(),
};

// Helper function to persist cart for guest users
const saveGuestCart = (cart) => {
  localStorage.setItem(localStorageKey, JSON.stringify(cart));
};

const findProduct = (cart, productId, size) =>
  cart.find(
    (item) => item._id === productId && item.selectedSize.size === size.size
  );

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

      // Save cart to localStorage for guest users
      saveGuestCart(state.cart);
    },

    deleteProduct: (state, action) => {
      const { productId, size } = action.payload;
      state.cart = state.cart.filter(
        (item) =>
          !(item._id === productId && item.selectedSize.size === size.size)
      );

      // Save cart to localStorage for guest users
      saveGuestCart(state.cart);
    },

    clearCart: (state) => {
      state.cart = [];
      saveGuestCart(state.cart); // Clear localStorage for guest users
    },

    incrementQuantity: (state, action) => {
      const { productId, size } = action.payload;
      const product = findProduct(state.cart, productId, size);
      if (product) product.quantity += 1;

      saveGuestCart(state.cart); // Save updated cart for guest users
    },

    decrementQuantity: (state, action) => {
      const { productId, size } = action.payload;
      const product = findProduct(state.cart, productId, size);
      if (product) {
        if (product.quantity > 1) {
          product.quantity -= 1;
        } else {
          state.cart = state.cart.filter(
            (item) =>
              !(item._id === productId && item.selectedSize.size === size.size)
          );
        }
      }
      saveGuestCart(state.cart); // Save updated cart for guest users
    },
  },
});

// Selectors
export const selectCartDetails = (state) => {
  const cart = state.cart.cart;
  const subtotal = cart.reduce((total, item) => {
    return total + parseFloat((item.selectedSize?.price || 0) * item.quantity);
  }, 0);
  const shipping = cart.length > 0 ? 20 : 0;
  const total = subtotal + shipping;
  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  return { subtotal, shipping, total, totalItemsInCart };
};

export const {
  setCart,
  deleteProduct,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
