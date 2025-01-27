import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCartAPI, mergeCartAPI } from "../utils/apis";

const localStorageKey = "guestCart";

// Helper function to load cart from localStorage for guest users
const loadGuestCart = () => {
  const savedCart = localStorage.getItem(localStorageKey);
  return savedCart ? JSON.parse(savedCart) : [];
};

// Helper function to persist cart for guest users
const saveGuestCart = (cart) => {
  localStorage.setItem(localStorageKey, JSON.stringify(cart));
};

// Helper function to clear guest cart from localStorage
export const clearGuestCart = () => {
  localStorage.removeItem(localStorageKey);
};

// Async thunk to fetch cart data for logged-in users
export const fetchLoggedInCart = createAsyncThunk(
  "cart/fetchLoggedInCart",
  async (userId) => {
    const response = await getCartAPI(userId);
    return response.data.items || [];
  }
);

// Async thunk to merge guest cart with logged-in user's cart
export const mergeGuestCart = createAsyncThunk(
  "cart/mergeGuestCart",
  async ({ userId, guestCart }, { rejectWithValue }) => {
    try {
      const response = await mergeCartAPI({ userId, items: guestCart });
      clearGuestCart(); // Clear the guest cart after successful merge
      return response.data.items; // Return the merged cart items
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  cart: loadGuestCart(),
  isAuthenticated: false,
  userId: null,
  isLoading: false,
  error: null,
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

      if (!state.isAuthenticated) {
        saveGuestCart(state.cart); // Save guest cart to localStorage
      }
    },

    clearCart: (state) => {
      state.cart = [];
      if (!state.isAuthenticated) {
        saveGuestCart(state.cart); // Save guest cart to localStorage
      }
    },

    incrementQuantity: (state, action) => {
      const { productId, size } = action.payload;
      const product = findProduct(state.cart, productId, size);
      if (product) product.quantity += 1;

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

      if (!state.isAuthenticated) {
        saveGuestCart(state.cart); // Save guest cart to localStorage
      }
    },

    // Set authentication and user data to switch cart view between guest and logged-in
    setAuth: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.userId = action.payload.userId;

      if (state.isAuthenticated) {
        const guestCart = state.cart;
        state.cart = []; // Clear the local state cart to sync with the server
        saveGuestCart([]); // Clear guest cart from localStorage

        // Dispatch actions to fetch logged-in cart and merge the guest cart
        fetchLoggedInCart(action.payload.userId);
        mergeGuestCart({ userId: action.payload.userId, guestCart });
      }
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
      })
      .addCase(mergeGuestCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(mergeGuestCart.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

// Selectors
export const selectCartDetails = (state) => {
  const cart = state.cart.cart;
  const subtotal = cart.reduce((total, item) => {
    return total + parseFloat((item.selectedSize?.price || 0) * item.quantity);
  }, 0);
  const shipping = cart.length > 0 ? 0 : 0;
  const total = subtotal + shipping;
  const totalItemsInCart = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

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
