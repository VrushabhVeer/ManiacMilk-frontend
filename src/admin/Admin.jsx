import { useEffect, useState } from "react";
import { getAllUsers, getAllOrders } from "../utils/apis";

const Admin = () => {
  const [view, setView] = useState("users"); // State for selected view
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

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

  return (
    <div className="w-11/12 md:w-10/12 mx-auto mb-10 md:mb-20 pt-10">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

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
          Add Products
        </button>
      </div>

      {/* Content Rendering */}
      {view === "users" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">All Users</h2>
          {users.length > 0 ? (
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr>
                  <th className="border px-4 py-2">First Name</th>
                  <th className="border px-4 py-2">Last Name</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Mobile</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className="text-center">
                    <td className="border px-4 py-2">{user.firstname || "N/A"}</td>
                    <td className="border px-4 py-2">{user.lastname || "N/A"}</td>
                    <td className="border px-4 py-2">{user.email}</td>
                    <td className="border px-4 py-2">{user.mobile || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No users found.</p>
          )}
        </div>
      )}

      {view === "orders" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">All Orders</h2>
          {orders.length > 0 ? (
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Order ID</th>
                  <th className="border px-4 py-2">User ID</th>
                  <th className="border px-4 py-2">Total</th>
                  <th className="border px-4 py-2">Status</th>
                  <th className="border px-4 py-2">Created At</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index} className="text-center">
                    <td className="border px-4 py-2">{order._id}</td>
                    <td className="border px-4 py-2">{order.userId}</td>
                    <td className="border px-4 py-2">{order.total}</td>
                    <td className="border px-4 py-2">{order.status}</td>
                    <td className="border px-4 py-2">
                      {new Date(order.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No orders found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;
