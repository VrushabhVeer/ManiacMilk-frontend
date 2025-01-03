import { useEffect, useState } from "react";
import { getAllUsers, getAllOrders } from "../utils/apis";
import Users from "./Users";
import AllOrders from "./AllOrders";
import { updateOrderStatusAPI } from "../utils/apis"; // Import API

const Admin = () => {
  const [view, setView] = useState("users");
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState({});

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
    } else if (view === "orders") {
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

  const handleToggleCompletion = async (orderId) => {
    try {
      const updatedCompletedOrders = {
        ...completedOrders,
        [orderId]: !completedOrders[orderId],
      };

      setCompletedOrders(updatedCompletedOrders);

      // Call the new API
      const response = await updateOrderStatusAPI(orderId);

      // Update state immediately
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? {
                ...order,
                status: updatedCompletedOrders[orderId]
                  ? "Completed"
                  : "Pending",
              }
            : order
        )
      );

      console.log("Order status updated:", response.data);
    } catch (error) {
      console.error("Error updating order status:", error.message);
    }
  };

  return (
    <div className="w-11/12 md:w-10/12 mx-auto mb-10 md:mb-20 pt-10">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Breadcrumb Navigation */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            view === "users" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setView("users")}
        >
          Users
        </button>
        <button
          className={`px-4 py-2 rounded ${
            view === "orders" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setView("orders")}
        >
          Orders
        </button>
        <button
          className={`px-4 py-2 rounded ${
            view === "products" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setView("products")}
        >
          Products
        </button>
      </div>

      {/* Content Rendering */}
      {view === "users" && <Users users={users} />}
      {view === "orders" && (
        <AllOrders
          orders={orders}
          formatDate={formatDate}
          handleToggleCompletion={handleToggleCompletion}
          completedOrders={completedOrders}
        />
      )}
    </div>
  );
};

export default Admin;
