/* eslint-disable react/prop-types */
import { useState } from "react";

const PendingOrders = ({ orders, formatDate, handleToggleCompletion }) => {
    const itemsPerPage = 20;
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedOrderId, setExpandedOrderId] = useState(null);

    // Pagination Logic
    const totalPages = Math.ceil(orders.length / itemsPerPage);
    const currentOrders = orders.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const toggleExpand = (orderId) => {
        setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
    };

    // Generate pagination buttons with dynamic range
    const getPaginationButtons = () => {
        const range = 3; // Minimum number of buttons to display
        let start = Math.max(1, currentPage - Math.floor(range / 2));
        let end = Math.min(totalPages, start + range - 1);

        if (end - start + 1 < range) {
            start = Math.max(1, end - range + 1);
        }

        return Array.from({ length: end - start + 1 }, (_, index) => start + index);
    };

    return (
        <div className="w-full">
            <h2 className="text-xl font-semibold mb-4 text-center">All Orders</h2>
            {orders.length > 0 ? (
                <>
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full border-collapse border border-gray-200">
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2">User</th>
                                    <th className="border px-4 py-2">Email</th>
                                    <th className="border px-4 py-2">Order ID</th>
                                    <th className="border px-4 py-2">User ID</th>
                                    <th className="border px-4 py-2">Total Amount</th>
                                    <th className="border px-4 py-2">Status</th>
                                    <th className="border px-4 py-2">Created At</th>
                                    <th className="border px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentOrders.map((order, index) => (
                                    <>
                                        <tr key={index} className="text-center mb-10">
                                            <td className="border px-4 py-2">
                                                {order.address.firstname} {order.address.lastname}
                                                <div className="mt-2">
                                                    <button
                                                        className="text-blue-500 underline text-[12px]"
                                                        onClick={() => toggleExpand(order._id)}
                                                    >
                                                        {expandedOrderId === order._id
                                                            ? "Hide Address"
                                                            : "View Address"}
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="border px-4 py-2">
                                                {order.address.email}
                                            </td>
                                            <td className="border px-4 py-2 text-sm">{order._id}</td>
                                            <td className="border px-4 py-2 text-sm">
                                                {order.userId}
                                            </td>
                                            <td className="border px-4 py-2">₹ {order.total}</td>
                                            <td className="border px-4 py-2">{order.status}</td>
                                            <td className="border px-4 py-2 text-sm">
                                                {formatDate(order.createdAt)}
                                            </td>
                                            <td className="border px-4 py-2">
                                                <button
                                                    className={`px-4 py-2 rounded-full text-[12px] font-medium tracking-wide ${order.status === "Completed"
                                                            ? "bg-green-500 text-white"
                                                            : order.status === "Cancelled"
                                                                ? "bg-red-500 text-white cursor-not-allowed"
                                                                : "bg-black text-white hover:bg-gray-700"
                                                        }`}
                                                    onClick={() => {
                                                        if (
                                                            order.status !== "Completed" &&
                                                            order.status !== "Cancelled"
                                                        ) {
                                                            handleToggleCompletion(order._id);
                                                        }
                                                    }}
                                                    disabled={
                                                        order.status === "Completed" ||
                                                        order.status === "Cancelled"
                                                    }
                                                >
                                                    {order.status === "Completed"
                                                        ? "Completed"
                                                        : order.status === "Cancelled"
                                                            ? "Cancelled"
                                                            : "Mark Complete"}
                                                </button>
                                            </td>
                                        </tr>
                                        {/* Expanded Address Row */}
                                        {expandedOrderId === order._id && (
                                            <tr>
                                                <td
                                                    colSpan="8"
                                                    className="border px-4 pb-4 pt-2 text-left bg-gray-50"
                                                >
                                                    <p className="text-sm">Address:</p>
                                                    <p className="text-sm text-gray-700 mt-1">
                                                        Area: {order.address?.house}, {order.address?.area},
                                                    </p>
                                                    <p className="text-sm text-gray-700">
                                                        City: {order.address.city},
                                                    </p>
                                                    <p className="text-sm text-gray-700">{`${order.address.state}, ${order.address.pincode}`}</p>
                          <p className="text-sm text-gray-700">+91 {order.address.mobile}</p>

                                                </td>
                                            </tr>
                                        )}
                                    </>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center items-center mt-10 space-x-2">
                        <button
                            className="px-4 py-2 bg-gray-300 font-medium text-sm rounded disabled:opacity-50"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Prev
                        </button>
                        {getPaginationButtons().map((page) => (
                            <button
                                key={page}
                                className={`px-4 py-2 rounded text-sm ${currentPage === page
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-300 hover:bg-gray-400"
                                    }`}
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            className="px-4 py-2 bg-gray-300 font-medium text-sm rounded disabled:opacity-50"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </>
            ) : (
                <p className="text-gray-500 text-center">No pending orders found.</p>
            )}
        </div>
    );
};

export default PendingOrders;