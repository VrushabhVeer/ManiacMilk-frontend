import axios from "axios";
import toast from "react-hot-toast";
import { baseURL } from "./data";

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token to Authorization header
    }
    return config;
  },
  (error) => {
    // Handle request errors
    toast.error("Request error occurred. Please try again.");
    return Promise.reject(error);
  }
);

// // Add interceptors for centralized success and error handling
// axiosInstance.interceptors.response.use(
//   (response) => {
//     // Show success toast if the response contains a message
//     if (response?.data?.message) {
//       toast.success(response.data.message);
//     }
//     return response;
//   },
//   (error) => {
//     // Extract and show error message
//     const errorMessage =
//       error?.response?.data?.message ||
//       error.message ||
//       "Something went wrong.";
//     toast.error(errorMessage);
//     return Promise.reject(error);
//   }
// );

// User APIs
export const login = (payload) =>
  axiosInstance.post("/users/send_otp", payload);
export const otpVerification = (payload) =>
  axiosInstance.post("users/otp_verification", payload);
export const getProfile = () => axiosInstance.get("/users/profile");

// Product APIs
export const getAllProducts = () => axiosInstance.get("/products/allproducts");
export const singleProduct = (id) => axiosInstance.get(`/products/${id}`);

// Contact API
export const contactUs = (payload) => axiosInstance.post("/contact", payload);

// Address APIs
export const addAddress = (payload) =>
  axiosInstance.post("/address/create", payload);

export const getAddress = (userId) =>
  axiosInstance.get(`/address/${userId}`);

export const deleteAddress = (id) => {
  return axiosInstance.delete(`/address/${id}`); // Adjust the endpoint based on your backend.
};

export const updateAddress = (id, updatedData) => {
  return axiosInstance.put(`/address/${id}`, updatedData); // Adjust the endpoint based on your backend.
};

// Payment APIs
export const makePayment = (amount) =>
  axiosInstance.post("/payment/checkout", { amount });

export const getPayment = () => axiosInstance.get("/getKey");

export const paymentVerification = (payload) =>
  axiosInstance.post("/payment/paymentverification", payload);

// Callback URL (constant)
export const CALLBACK_URL = `${axiosInstance.defaults.baseURL}/payment/paymentverification`;

// Orders APIs
export const placeOrder = (payload) =>
  axiosInstance.post("/orders/place", payload);

export const getAllOrders = () => axiosInstance.get("/orders/allorders");
export const getOrderByOrderId = (orderId) => axiosInstance.get(`/orders/order/${orderId}`);
export const getOrderByUserId = (userId) => axiosInstance.get(`/orders/user/${userId}`);
export const cancelOrderById = (orderId) => axiosInstance.put(`/orders/cancel/${orderId}`);

// Cart APIs
export const addToCart = (payload) => axiosInstance.post("/cart/add", payload);

export const getCart = () => axiosInstance.get("/cart");

export const updateCartItem = (itemId, payload) =>
  axiosInstance.put(`/cart/update/${itemId}`, payload);

export const removeFromCart = (itemId) =>
  axiosInstance.delete(`/cart/remove/${itemId}`);

/// create user API for guest users
export const createUser = (payload) =>
  axiosInstance.post("/users/create", payload);

export const editProfile = (payload) => {
  axiosInstance.put("/users/edit_profile", payload);
}

export const deleteAccount = (payload) => {
  axiosInstance.delete("/users/delete_account", payload);
}