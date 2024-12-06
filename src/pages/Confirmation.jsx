import { useState } from "react";
import rightUpArrow from "../assets/icons/rightUpArrow.png";
import logo from "../assets/icons/cow.png";
import CartItems from "../components/common/CartItems";
import Address from "../components/common/Address";
import {
  CALLBACK_URL,
  getPayment,
  makePayment,
  paymentVerification,
  placeOrder,
} from "../utils/apis.js";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import useRazorpayScript from "../utils/razorpayScript.js";
import { useNavigate } from "react-router-dom";

const Confirmation = () => {
  // Load Razorpay script
  useRazorpayScript();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const { cart } = useSelector((state) => state.cart);
  const { address } = useSelector((state) => state.address);

  const subtotal = cart.reduce((total, item) => {
    return total + parseFloat((item.selectedSize?.price || 0) * item.quantity);
  }, 0);
  const shipping = cart.length > 0 ? 20 : 0;
  const total = subtotal + shipping;

  const handlePaymentVerification = async (response) => {
    try {
      const payload = {
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
      };
      const { data } = await paymentVerification(payload);
      if (!data.success) {
        throw new Error("Payment verification failed.");
      }
      toast.success("Payment verified successfully!");
    } catch (error) {
      console.error("Payment verification error:", error);
      throw error;
    }
  };

  console.log("Subtotal:", subtotal, "Total:", total);

  const handleCheckout = async () => {
    try {
      const orderDetails = {
        userId: address.userId,
        cartItems: cart,
        address,
        paymentMethod,
        subtotal,
        shipping,
        total,
      };

      if (paymentMethod === "cod") {
        const response = await placeOrder(orderDetails);

        if (response?.data?.success) {
          const { order } = response.data;
          navigate(`/placed/${order._id}`)
        } else {
          throw new Error(response?.data?.message || "Order placement failed.");
        }
        return;
      }

      if (!window.Razorpay) {
        toast.error("Payment service unavailable. Please try later.");
        return;
      }

      const { data: paymentData } = await getPayment();
      const { data: paymentOrder } = await makePayment(total);

      if (!paymentOrder || !paymentOrder.order) {
        throw new Error("Failed to create Razorpay order.");
      }

      const options = {
        key: paymentData.key,
        amount: paymentOrder.order.amount,
        currency: "INR",
        name: "Maniac Milk Store",
        description: "Order Confirmation",
        image: logo,
        order_id: paymentOrder.order.id,
        callback_url: CALLBACK_URL,
        prefill: {
          name: address.fullName,
          email: address.email,
          contact: address.mobile,
        },
        notes: { address: "Maniac Milk Store Headquarters" },
        theme: { color: "#000000" },
        handler: async (response) => {
          try {
            await handlePaymentVerification(response);
            orderDetails.razorpayPaymentId = response.razorpay_payment_id;
            orderDetails.razorpayOrderId = response.razorpay_order_id;

            const { data } = await placeOrder(orderDetails);
            if (data.success) {
              navigate(`/placed/${data.order._id}`)
            }
          } catch (error) {
            console.error("Payment verification failed:", error);
            toast.error("Payment verification failed.");
          }
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error("Checkout error:", error.message);
      toast.error("Checkout failed. Please try again.");
    }
  };

  console.log("address", address);
  console.log("cart", cart);

  return (
    <div className="hero w-full">
      <div className="w-11/12 md:w-10/12 lg:w-10/12 mx-auto pt-10 pb-10 md:pb-20">
        <h1 className="text-4xl font-extrabold text-[#1a1d20]">
          Order Confirmation
        </h1>

        <div className="w-full flex flex-col justify-between md:flex-row mt-10 gap-10 md:gap-20">
          <div className="w-full">
            <Address />

            <div className="mt-10">
              <h2 className="text-xl font-semibold">Payment</h2>
              <p className="text-gray-600 mt-1">
                All transactions are secure and encrypted.
              </p>

              <div className="mt-3 border border-orange-300 p-5 rounded-md space-y-4">
                {/* Razorpay Option */}
                <div
                  className={`flex items-center w-full p-4 border rounded-md cursor-pointer ${paymentMethod === "razorpay"
                    ? "bg-green-100 border-green-500"
                    : "hover:bg-gray-100"
                    }`}
                  onClick={() => setPaymentMethod("razorpay")}
                >
                  {/* Radio Button */}
                  <div className="mr-3">
                    <input
                      type="radio"
                      id="razorpay"
                      name="payment"
                      value="razorpay"
                      checked={paymentMethod === "razorpay"}
                      onChange={() => setPaymentMethod("razorpay")}
                      className="w-5 h-5 text-green-500 border-gray-300 focus:ring-green-500 cursor-pointer"
                    />
                  </div>
                  {/* Payment Option Text */}
                  <div>
                    <p className="font-semibold">Razorpay Secure</p>
                    <p className="text-sm text-gray-600">
                      After clicking &quot;Pay Now,&quot; you will be redirected
                      to Razorpay Secure (UPI, Cards, Wallets, NetBanking) to
                      complete your purchase securely.
                    </p>
                  </div>
                </div>

                {/* Cash on Delivery Option */}
                <div
                  className={`flex items-center w-full p-4 border rounded-md cursor-pointer ${paymentMethod === "cod"
                    ? "bg-green-100 border-green-500"
                    : "hover:bg-gray-100"
                    }`}
                  onClick={() => setPaymentMethod("cod")}
                >
                  <div className="mr-3">
                    <input
                      type="radio"
                      id="cod"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="w-5 h-5 text-green-500 border-gray-300 focus:ring-green-500 cursor-pointer"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">Cash On Delivery</p>
                  </div>
                </div>

                {/* Button */}
                <button
                  className="w-full bg-green-900 text-white py-3 rounded-full tracking-wide font-medium mt-10 flex items-center justify-center gap-2"
                  type="submit"
                  onClick={() => handleCheckout()}
                >
                  {paymentMethod === "razorpay" ? "Pay Now" : "Complete Order"}

                  <img
                    className="w-5"
                    src={rightUpArrow}
                    alt="right-up-arrow"
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="w-full">
            <CartItems />
          </div>
        </div>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default Confirmation;
