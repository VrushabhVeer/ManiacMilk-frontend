import { useEffect, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { Link, useParams } from "react-router-dom";
import leftArrow from "../assets/icons/leftArrow.png";
import Loader from "../components/common/Loader";
import { singleOrder } from "../utils/apis";

const Placed = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { orderId } = useParams();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await singleOrder(orderId);
        setOrders(response.data.orders || []);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [orderId]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

console.log("first", orders)

  return (
    <div className="hero w-full pb-20 pt-1">
      <div className="w-11/12 md:w-5/12 mx-auto">
        <div>
          <div className="w-3/12 md:w-2/12 mx-auto">
            <Player
              autoplay
              loop
              src="https://assets8.lottiefiles.com/private_files/lf30_dfspihm8.json"
              className="max-w-full"
            />
          </div>
          <h2 className="text-4xl text-center font-bold text-[#1a1d20] mt-6">
            Order Summary
          </h2>
          <p className="text-lg text-center text-gray-600 mt-2">
            Thank you for shopping with us!
          </p>
        </div>

        <div className="mt-10 border p-3">
          {Array.isArray(orders) && orders.length > 0 ? (
            orders.map((order, index) => (
              <div key={order._id || index} className="mb-5 border-b pb-5">
                <h4 className="font-semibold">Order #{index + 1}</h4>
                <p className="text-gray-600">
                  Payment Method: {order.paymentMethod || "N/A"}
                </p>
                <p className="text-gray-600">Total: ₹{order.total || 0}</p>
                <p className="text-gray-600">
                  Address: {order.address?.fullname || "N/A"},{" "}
                  {order.address?.house}, {order.address?.area},{" "}
                  {order.address?.city}, {order.address?.state},{" "}
                  {order.address?.pincode}
                </p>
                <h5 className="font-semibold mt-3">Items in Order:</h5>
                {order.cartItems?.map((item, itemIndex) => (
                  <div
                    key={item._id || itemIndex}
                    className="mt-2 border rounded p-3"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.frontImage}
                        alt={item.name}
                        className="w-16 h-16 rounded"
                        loading="lazy"
                      />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-gray-600">
                          Size: {item.selectedSize?.size || "N/A"}
                        </p>
                        <p className="text-gray-600">
                          Price: ₹{item.selectedSize?.price || 0}
                        </p>
                        <p className="text-gray-600">
                          Quantity: {item.quantity || 0}
                        </p>
                        <p className="text-gray-600">
                          Subtotal: ₹
                          {(item.selectedSize?.price || 0) *
                            (item.quantity || 0)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p>No orders found.</p>
          )}
        </div>

        <Link to="/products">
          <button className="bg-green-900 text-white px-10 py-3 rounded-full font-medium tracking-wide mt-8 flex items-center justify-center gap-2">
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
  );
};

export default Placed;
