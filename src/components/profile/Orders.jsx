/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Modal from "../../components/common/Modal"; // Assuming a reusable Modal component
import { cancelOrderById, getOrderByUserId } from "../../utils/apis"; // API calls
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const Orders = ({ userId }) => {
  const [orders, setOrders] = useState([]); // Orders state
  const [expandedOrderId, setExpandedOrderId] = useState(null); // To expand/collapse order details
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [selectedOrderId, setSelectedOrderId] = useState(null); // Order ID selected for cancellation
  const [loading, setLoading] = useState(false); // Loading state for actions

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

  // Cancel order and update status dynamically
  const handleCancelOrder = async () => {
    if (!selectedOrderId) return;

    setLoading(true); // Set loading state
    try {
      const response = await cancelOrderById(selectedOrderId); // Call cancel API
      if (response.success) {
        // Update the order's status dynamically in the state
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === selectedOrderId
              ? { ...order, status: "Cancelled" }
              : order
          )
        );
        toast("Order cancelled successfully.");
      } else {
        toast("Failed to cancel the order. Please try again.");
      }
    } catch (error) {
      console.error("Error cancelling order:", error.message);
      toast("An error occurred while cancelling the order.");
    } finally {
      setLoading(false); // Reset loading
      setIsModalOpen(false); // Close modal
    }
  };

  // Open cancel confirmation modal
  const openCancelModal = (orderId) => {
    setSelectedOrderId(orderId);
    setIsModalOpen(true);
  };

  // Close modal without action
  const cancelModal = () => {
    setIsModalOpen(false);
    setSelectedOrderId(null);
  };

  return (
    <div className="border p-5 rounded-md">
      <Modal
        isOpen={isModalOpen}
        title="Cancel Order"
        message="Are you sure you want to cancel this order?"
        onConfirm={handleCancelOrder} // Confirm cancellation
        onCancel={cancelModal} // Close modal
        loading={loading} // Show loading state on confirm button
      />
      <p className="font-semibold mb-5">My Orders</p>
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
        orders.map((order) => (
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
                {expandedOrderId === order._id
                  ? "Hide Details"
                  : "View Details"}
              </button>
            </div>
            {expandedOrderId === order._id && (
              <div className="mt-4">
                <p className="font-semibold mb-2">Cart Items:</p>
                {order.cartItems.map((item) => (
                  <div key={item._id} className="flex items-center gap-4 mb-3">
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
                  {order.address.city}, {order.address.state} - {order.address.pincode}
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
                {/* Cancel Order Button */}
                <button
                  onClick={() =>
                    order.status === "Pending" && openCancelModal(order._id)
                  }
                  className={`mt-4 px-4 py-2 text-white text-sm rounded ${order.status === "Cancelled"
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
        ))
      )}

      <Toaster position="bottom-center" />
    </div>
  );
};

export default Orders;
