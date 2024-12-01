import { useEffect, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { Link } from "react-router-dom";
import { singleOrder } from "../utils/apis";
import leftArrow from "../assets/icons/leftArrow.png";

const Placed = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await singleOrder();
        setOrders(fetchedOrders);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p>Error: {error}</p>
      </div>
    );
  }

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
            Orders Placed
          </h2>
          <p className="text-lg text-center text-gray-600 mt-2">
            Thank you for shopping with us!
          </p>
        </div>

        <div className="mt-10 border p-3">
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <div
                key={order._id || index}
                className="mb-5 border-b pb-3"
              >
                <h4 className="font-semibold">
                  Order #{index + 1}
                </h4>
                <p className="text-gray-600">
                  Payment: {order.paymentMethod || "N/A"}
                </p>
                <p className="text-gray-600">
                  Total: ₹{order.total || 0}
                </p>
                <p className="text-gray-600">
                  Address: {order.address?.fullName || "N/A"}
                </p>
                <p className="text-gray-600">
                  Items: {order.cartItems?.length || 0}
                </p>
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
