import { useSelector } from "react-redux";
import AuthCart from "../components/cart/AuthCart";
import GuestCart from "../components/cart/GuestCart";

const Cart = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return <div className="hero">{isAuthenticated ? <AuthCart /> : <GuestCart />}</div>;
};

export default Cart;
