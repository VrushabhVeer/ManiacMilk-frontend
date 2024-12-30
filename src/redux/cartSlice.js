import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCartAPI } from "../utils/apis";

const localStorageKey = "guestCart";

// Load cart from localStorage for guest users
const loadGuestCart = () => {
  const savedCart = localStorage.getItem(localStorageKey);
  return savedCart ? JSON.parse(savedCart) : [];
};

// Async thunk to fetch cart data for logged-in users
export const fetchLoggedInCart = createAsyncThunk(
  "cart/fetchLoggedInCart",
  async (userId) => {
    const response = await getCartAPI(userId);
    return response.data.items || [];
  }
);

const initialState = {
  cart: loadGuestCart(),
  isAuthenticated: false,
  userId: null,
  isLoading: false,
  error: null,
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
      // saveGuestCart(state.cart);

      if (!state.isAuthenticated) {
        saveGuestCart(state.cart); // Save guest cart to localStorage
      }
    },

    deleteProduct: (state, action) => {
      const { productId, size } = action.payload;
      state.cart = state.cart.filter(
        (item) =>
          !(item._id === productId && item.selectedSize.size === size.size)
      );

      // Save cart to localStorage for guest users
      // saveGuestCart(state.cart);
      if (!state.isAuthenticated) {
        saveGuestCart(state.cart); // Save guest cart to localStorage
      }
    },

    clearCart: (state) => {
      state.cart = [];
      // saveGuestCart(state.cart); // Clear localStorage for guest users

      if (!state.isAuthenticated) {
        saveGuestCart(state.cart); // Save guest cart to localStorage
      }
    },

    incrementQuantity: (state, action) => {
      const { productId, size } = action.payload;
      const product = findProduct(state.cart, productId, size);
      if (product) product.quantity += 1;

      // saveGuestCart(state.cart); // Save updated cart for guest users
      if (!state.isAuthenticated) {
        saveGuestCart(state.cart); // Save guest cart to localStorage
      }
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
      // saveGuestCart(state.cart); // Save updated cart for guest users
      if (!state.isAuthenticated) {
        saveGuestCart(state.cart); // Save guest cart to localStorage
      }
    },

    // Set authentication and user data to switch cart view between guest and logged-in
    setAuth: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.userId = action.payload.userId;
    },
  },

  // Fetch logged-in cart items when user logs in
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLoggedInCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload;
      })
      .addCase(fetchLoggedInCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
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
  setAuth,
} = cartSlice.actions;

export default cartSlice.reducer;
