/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { cancelOrderById, getOrderByUserId } from "../../utils/apis"; // Import API for cancellation

const Orders = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) return;
      try {
        const response = await getOrderByUserId(userId);
        setOrders(response.data.orders || []);
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      }
    };
    fetchOrders();
  }, [userId]);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  const handleCancelOrder = async (orderId) => {
    console.log(" id------------------------", orderId);
    try {
      const response = await cancelOrderById(orderId); // Call API to cancel the order
      if (response.success) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: "Cancelled" } : order
          )
        );
        alert("Order cancelled successfully.");
      } else {
        alert("Failed to cancel the order.");
      }
    } catch (error) {
      console.error("Error cancelling order:", error.message);
      alert("An error occurred while cancelling the order.");
    }
  };

  console.log("orders", orders);
  return (
    <div className="border p-5 rounded-md">
      <p className="font-semibold mb-5">My Orders</p>
      {orders.map((order) => (
        <div key={order._id} className="border-b pb-4 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">Order ID: {order._id}</p>
              <p className="text-sm text-gray-500">Status: {order.status}</p>
              <p className="text-sm text-gray-500">Total: ₹{order.total}</p>
            </div>
            <button
              onClick={() => toggleOrderDetails(order._id)}
              className="text-blue-500 text-sm underline"
            >
              {expandedOrderId === order._id ? "Hide Details" : "View Details"}
            </button>
          </div>
          {expandedOrderId === order._id && (
            <div className="mt-4">
              <p className="font-semibold mb-2">Cart Items:</p>
              {order.cartItems.map((item) => (
                <div key={item._id} className="flex items-start gap-4 mb-3">
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
                {order.address.fullname}, {order.address.house},{" "}
                {order.address.area}, {order.address.city},{" "}
                {order.address.state} - {order.address.pincode}
              </p>
              <p className="font-semibold mt-2">
                Payment Method: {order.paymentMethod.toUpperCase()}
              </p>
              <p className="text-sm text-gray-600">
                Placed On:{" "}
                {new Date(order.createdAt).toLocaleString([], {
                  weekday: "long",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>
              {/* Cancel Order Button */}
              <button
                onClick={() =>
                  order.status === "Pending" && handleCancelOrder(order._id)
                }
                className={`mt-4 px-4 py-2 text-white text-sm rounded ${
                  order.status === "Cancelled"
                    ? "bg-gray-500 cursor-not-allowed"
                    : order.status === "Pending"
                    ? "bg-red-500 hover:bg-red-600"
                    : order.status === "Completed"
                    ? "bg-green-500 cursor-not-allowed"
                    : ""
                }`}
                disabled={order.status !== "Pending"} // Disable button for statuses other than Pending
              >
                {order.status === "Cancelled"
                  ? "Cancelled"
                  : order.status === "Pending"
                  ? "Cancel Order"
                  : order.status === "Completed"
                  ? "Completed"
                  : ""}
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Orders;
