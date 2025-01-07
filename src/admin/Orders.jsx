/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getOrderByUserId } from "../utils/apis";

const Orders = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  // Fetch orders when the component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) return;
      try {
        const response = await getOrderByUserId(userId);
        setOrders(response.data.orders || []); // Populate orders
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      }
    };
    fetchOrders();
  }, [userId]);

  // Toggle order details
  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  return (
    <div className=" rounded-md">
      <p className="font-semibold mb-5 text-xl">Orders</p>
      {orders.length === 0 ? (
        <div className="text-center mt-10">
          <p className="font-semibold text-lg">
            You haven&lsquo;t placed any orders yet.
          </p>
          <p className="text-orange-500 mt-2">
            <Link to="/products">
              <span className="underline">Explore</span>
            </Link>{" "}
            our products and place your first order!
          </p>
        </div>
      ) : (
        [...orders].reverse().map((order) => (
          <div key={order._id} className="border-b pb-4 mb-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">Order ID: {order._id}</p>
                <p
                  className={`text-sm ${
                    order.status === "Completed"
                      ? "text-green-500"
                      : order.status === "Pending"
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  Status: {order.status}
                </p>
                <p className="text-sm text-gray-500">Total: ₹{order.total}</p>
              </div>
              <button
                onClick={() => toggleOrderDetails(order._id)}
                className="text-blue-500 text-sm underline"
              >
                {expandedOrderId === order._id
                  ? "Hide Details"
                  : "View Details"}
              </button>
            </div>
            {expandedOrderId === order._id && (
              <div className="mt-4">
                <p className="font-semibold mb-2">Cart Items:</p>
                {order.cartItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 mb-3">
                    <img
                      src={item.frontImage}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded border"
                    />
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Size: {item.selectedSize.size}
                      </p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-500">
                        Price: ₹{item.selectedSize.price * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
                <p className="font-semibold mt-4">Shipping Address:</p>
                <p className="text-sm text-gray-600">
                  {order.address.firstname} {order.address.lastname},
                  <br />
                  {order.address.house}, {order.address.area},
                  <br />
                  {order.address.city}, {order.address.state} -{" "}
                  {order.address.pincode}
                </p>
                <p className="font-semibold mt-2">
                  Payment Method: {order.paymentMethod.toUpperCase()}
                </p>
                <p className="text-sm text-gray-600">
                  Placed On:{" "}
                  {new Date(order.createdAt).toLocaleString([], {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
