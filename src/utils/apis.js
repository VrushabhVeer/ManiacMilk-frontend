import axios from "axios";
import toast from "react-hot-toast";
import { baseURL } from "./data";

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptors for centralized success and error handling
axiosInstance.interceptors.response.use(
  (response) => {
    // Show success toast if the response contains a message
    if (response?.data?.message) {
      toast.success(response.data.message);
    }
    return response;
  },
  (error) => {
    // Extract and show error message
    const errorMessage =
      error?.response?.data?.message ||
      error.message ||
      "Something went wrong.";
    toast.error(errorMessage);
    return Promise.reject(error);
  }
);

// User APIs
export const login = (payload) =>
  axiosInstance.post("/users/send_otp", payload);
export const otpVerification = (payload) =>
  axiosInstance.post("users/otp_verification", payload);

// Product APIs
export const getAllProducts = () => axiosInstance.get("/products/allproducts");
export const singleProduct = (id) => axiosInstance.get(`/products/${id}`);

// Contact API
export const contactUs = (payload) => axiosInstance.post("/contact", payload);

// Address APIs
export const addAddress = (payload) =>
  axiosInstance.post("/address/create", payload);

// Payment APIs
export const makePayment = (amount) =>
  axiosInstance.post("/payment/checkout", { amount });

export const getPayment = () => axiosInstance.get("/getKey");

export const paymentVerification = (payload) =>
  axiosInstance.post("/payment/paymentverification", payload);

// Callback URL (constant)
export const CALLBACK_URL = `${axiosInstance.defaults.baseURL}/payment/paymentverification`;

// Orders APIs
export const placeOrder = (payload) => {
  const isGuest = payload.guestUser || false;
  return axiosInstance.post(`/order/place`, { ...payload, guestUser: isGuest });
};

export const getOrders = () => axiosInstance.get("/orders/allorders");
export const singleOrder = (id) => axiosInstance.get(`/orders/${id}`);

// Cart APIs
export const addToCart = (payload) => axiosInstance.post("/cart/add", payload);

export const getCart = () => axiosInstance.get("/cart");

export const updateCartItem = (itemId, payload) =>
  axiosInstance.put(`/cart/update/${itemId}`, payload);

export const removeFromCart = (itemId) =>
  axiosInstance.delete(`/cart/remove/${itemId}`);
