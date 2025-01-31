import { useEffect, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { Link, useParams } from "react-router-dom";
import { getOrderByOrderId } from "../utils/apis";
import leftArrow from "../assets/icons/leftArrow.png";
import copy from "../assets/icons/copy.png";
import check from "../assets/icons/check.png";
import Loader from "../components/common/Loader";

const Placed = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { orderId } = useParams();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(order.razorpayPaymentId)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset to "Copy" after 2 seconds
      })
      .catch(() => alert("Failed to copy Payment ID"));
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await getOrderByOrderId(orderId);
        setOrder(response.data.orders?.[0] || null);
      } catch (error) {
        console.error("Error fetching order:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p>No order details found.</p>
      </div>
    );
  }

  const { address, paymentMethod, subtotal, shipping, total, cartItems } = order;

  return (
    <div className="hero w-full pb-20 pt-10">
      <div className="w-11/12 md:w-10/12 mx-auto">
        {/* Header Section */}
        <div className="flex flex-row items-center gap-3">
          <div className="w-12 md:w-20">
            <Player
              autoplay
              loop
              src="https://assets8.lottiefiles.com/private_files/lf30_dfspihm8.json"
              className="max-w-full"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#1a1d20]">Order Placed</h1>
            <h3>Thank you <span className="text-orange-500 font-medium text-lg">{address?.firstname} {address?.lastname}</span>, for shopping with us!</h3>
          </div>
        </div>

        {/* Order Details Section */}
        <h4 className="font-semibold mt-10">Order Details</h4>
        <div className="flex justify-between flex-col md:flex-row gap-10 md:gap-20 mt-2">
          {/* Left Section */}
          <div className="border p-5 w-full">
            <div className="text-gray-600">
              <p className="text-[#1a1d20] font-semibold">Payment Method</p>
              <p className="mt-1">
                {paymentMethod === "cod"
                  ? "Cash On Delivery"
                  : "Online Payment (Razorpay)"}
              </p>
              {paymentMethod === "razorpay" && (
                <p className="flex items-center">
                  Payment ID:{" "}
                  <span className="text-[#1a1d20] font-semibold">
                    {order.razorpayPaymentId}
                  </span>
                  <button className="ml-4" onClick={handleCopy}>
                    {copied ? (
                      <img
                        src={check}
                        alt="Check"
                        className="w-5"
                        loading="lazy"
                      />
                    ) : (
                      <img
                        src={copy}
                        alt="copy"
                        className="w-4"
                        loading="lazy"
                      />
                    )}
                  </button>
                </p>
              )}
              <p className="mt-1">
                Total:{" "}
                <span className="text-[#1a1d20] font-semibold">₹ {total}</span>
              </p>
            </div>

            {/* Contact Details */}
            <div className="text-gray-600 mt-4">
              <p className="text-[#1a1d20] font-semibold">Contact Details</p>
              <p className="mt-1">{address?.email}</p>
              <p>+91 {address?.mobile}</p>
            </div>

            {/* Address Details */}
            <div className="text-gray-600 mt-4">
              <p className="text-[#1a1d20] font-semibold">Address Details</p>
              <p className="mt-1">{address?.firstname} {address?.lastname},</p>
              <p>
                {address?.house}, {address?.area},
              </p>
              <p>{address?.city},</p>
              <p>
                {address?.state}, {address?.pincode},
              </p>
              <p>India</p>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full">
            <div>
              {cartItems?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-5 border-b border-gray-200 pb-4"
                >
                  <div className="relative">
                    <img
                      src={item.frontImage}
                      alt={item.name}
                      className="w-20 h-24 object-cover rounded border"
                    />
                    <span className="absolute top-[-8px] right-[-10px] bg-black text-white bg-opacity-50 pt-0.5 font-semibold rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Size: {item.selectedSize.size}
                    </p>
                    <p className="text-sm mt-1 text-gray-900 font-medium">
                      ₹ {item.selectedSize.price}
                    </p>
                  </div>
                </div>
              ))}

              {/* Summary Section */}
              <div className="space-y-4 mt-4">
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p>₹ {subtotal}</p>
                </div>
                <div className="flex justify-between">
                  <p>Shipping</p>
                  <p>{shipping === 0 ? "Free" : `₹ ${shipping}`}</p>
                </div>
                <div className="flex justify-between border-t pt-4">
                  <div>
                    <p className="font-semibold">Total</p>
                    <p className="text-[13px] font-light text-gray-600">
                      Including ₹0.00 in taxes
                    </p>
                  </div>
                  <p className="font-semibold">
                    <span className="text-[13px] font-light text-gray-600">
                      INR
                    </span>{" "}
                    ₹ {total}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Shopping Button */}
        <div className="mt-8 flex">
          <Link to="/products">
            <button className="bg-green-900 text-white px-10 py-3 rounded-full font-medium tracking-wide flex items-center justify-center gap-2">
              <img
                src={leftArrow}
                alt="Continue Shopping"
                className="w-4"
                loading="lazy"
              />
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Placed;
