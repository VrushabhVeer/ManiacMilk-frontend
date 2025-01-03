import { useEffect, useState } from "react";
import { getAllUsers, getAllOrders } from "../utils/apis";
import Users from "./Users";
import AllOrders from "./AllOrders";

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

  // Fetch all users
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
    }
  }, [view]);

  // Fetch all orders
  useEffect(() => {
    if (view === "orders") {
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

  const updateOrderStatus = async (orderId) => {
    const url = `http://localhost:8000/orders/complete/${orderId}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) {
      throw new Error(`Failed to update order status: ${response.status}`);
    }
  
    const data = await response.json(); // Read response body only once
    console.log("Response data:", data);
  
    // Update the orders state to reflect the changes immediately
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId ? { ...order, status: "Completed" } : order
      )
    );
  
    return data;
  };  

  const handleToggleCompletion = async (orderId) => {
    try {
      const status = completedOrders[orderId] ? "pending" : "completed";
      const updatedCompletedOrders = {
        ...completedOrders,
        [orderId]: !completedOrders[orderId],
      };
      setCompletedOrders(updatedCompletedOrders);

      const response = await updateOrderStatus(orderId, status);
      console.log("Order status updated:", response);
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
          Orders
        </button>
        <button
          className={`px-4 py-2 rounded ${view === "products" ? "bg-blue-500 text-white" : "bg-gray-200"
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
