import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import About from "../pages/About";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Contact from "../pages/Contact";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Confirmation from "../pages/Confirmation";
import Placed from "../pages/Placed";
import NotFound from "../pages/NotFound";
import Admin from "../admin/Admin";
import PrivateRoute from "../components/login/PrivateRoute";
import AdminLogin from "../admin/AdminLogin";
import AdminPrivateRoute from "../admin/AdminPrivateRoute";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsAndConditions from "../pages/TermsAndConditions";
import RefundPolicy from "../pages/RefundPolicy";
import ShippingPolicy from "../pages/ShippingPolicy";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/profile"
        element={<PrivateRoute element={<Profile />} />}
      />
      <Route path="/about" element={<About />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:productId" element={<ProductDetails />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/confirmation" element={<Confirmation />} />
      <Route path="/placed/:orderId" element={<Placed />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      <Route path="/refund-policy" element={<RefundPolicy />} />
      <Route path="/shipping-policy" element={<ShippingPolicy />} />

      {/* admin routes */}
      <Route path="/admin" element={<AdminPrivateRoute element={<Admin />} />} />
      <Route path="/admin/login" element={<AdminLogin />} />
    </Routes>
  );
};

export default AllRoutes;
