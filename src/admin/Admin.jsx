// 


import { useEffect, useState } from "react";
import { getAllUsers, getAllOrders, updateOrderStatusAPI } from "../utils/apis";
import Users from "./Users";
import AllOrders from "./AllOrders";
import CompletedOrders from "./CompletedOrders";

const Admin = () => {
  const [view, setView] = useState("users");
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  // Format date utility
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  // Fetch users or orders based on the current view
  useEffect(() => {
    if (view === "users") {
      const fetchUsers = async () => {
        try {
          const response = await getAllUsers();
          setUsers(response.data.users || []);
        } catch (error) {
          console.error("Error fetching users:", error.message);
        }
      };
      fetchUsers();
    } else if (view === "orders" || view === "completedOrders") {
      const fetchOrders = async () => {
        try {
          const response = await getAllOrders();
          setOrders(response.data.orders || []);
        } catch (error) {
          console.error("Error fetching orders:", error.message);
        }
      };
      fetchOrders();
    }
  }, [view]);

  // Toggle order completion
  const handleToggleCompletion = async (orderId) => {
    try {
      const updatedOrder = await updateOrderStatusAPI(orderId); // API call to update order status
      const updatedStatus = updatedOrder.data.order.status;

      // Update orders state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? { ...order, status: updatedStatus }
            : order
        )
      );

      console.log(`Order status updated to ${updatedStatus}`);
    } catch (error) {
      console.error("Error updating order status:", error.message);
    }
  };

  return (
    <div className="w-11/12 md:w-10/12 mx-auto mb-10 md:mb-20 pt-10">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Navigation Buttons */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${view === "users" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          onClick={() => setView("users")}
        >
          Users
        </button>
        <button
          className={`px-4 py-2 rounded ${view === "orders" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          onClick={() => setView("orders")}
        >
          Pending Orders
        </button>
        <button
          className={`px-4 py-2 rounded ${view === "completedOrders" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          onClick={() => setView("completedOrders")}
        >
          Completed Orders
        </button>

        <button
          className={`px-4 py-2 rounded ${view === "" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          onClick={() => setView("")}
        >
          Products
        </button>
      </div>

      {/* Content Rendering */}
      {view === "users" && <Users users={users} />}
      {view === "orders" && (
        <AllOrders
          orders={orders.filter((order) => order.status !== "Completed")}
          formatDate={formatDate}
          handleToggleCompletion={handleToggleCompletion}
        />
      )}
      {view === "completedOrders" && (
        <CompletedOrders
          orders={orders.filter((order) => order.status === "Completed")}
          formatDate={formatDate}
        />
      )}
    </div>
  );
};

export default Admin;
