/* eslint-disable react/prop-types */
import { useState } from "react";

const CompletedOrders = ({ orders, formatDate }) => {
    const completedOrders = orders.filter((order) => order.status === "Completed");

    const itemsPerPage = 20;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(completedOrders.length / itemsPerPage);
    const currentOrders = completedOrders.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const getPaginationButtons = () => {
        const range = 3; // Number of pagination buttons
        let start = Math.max(1, currentPage - Math.floor(range / 2));
        let end = Math.min(totalPages, start + range - 1);

        if (end - start + 1 < range) {
            start = Math.max(1, end - range + 1);
        }

        return Array.from({ length: end - start + 1 }, (_, index) => start + index);
    };

    return (
        <div className="w-full">
            <h2 className="text-xl font-semibold mb-4 text-center">Completed Orders</h2>
            {completedOrders.length > 0 ? (
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
                                    <th className="border px-4 py-2">Completed At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentOrders.map((order, index) => (
                                    <tr key={index} className="text-center">
                                        <td className="border px-4 py-2">
                                            {order.address.firstname} {order.address.lastname}
                                        </td>
                                        <td className="border px-4 py-2">{order.address.email}</td>
                                        <td className="border px-4 py-2 text-sm">{order._id}</td>
                                        <td className="border px-4 py-2 text-sm">{order.userId}</td>
                                        <td className="border px-4 py-2">₹ {order.total}</td>
                                        <td className="border px-4 py-2">{order.status}</td>
                                        <td className="border px-4 py-2 text-sm">
                                            {order.createdAt ? formatDate(order.createdAt) : "N/A"}
                                        </td>
                                        <td className="border px-4 py-2 text-sm">
                                            {order.updatedAt ? formatDate(order.updatedAt) : "N/A"}
                                        </td>
                                    </tr>
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
                <p className="text-gray-500 text-center">No completed orders found.</p>
            )}
        </div>
    );
};

export default CompletedOrders;
