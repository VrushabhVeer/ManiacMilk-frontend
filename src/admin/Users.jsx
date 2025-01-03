import { useState } from "react";
import Orders from "../components/profile/Orders";

/* eslint-disable react/prop-types */
const Users = ({ users }) => {
  const [expandedUserId, setExpandedUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const totalPages = Math.ceil(users.length / itemsPerPage);

  // Get users for the current page
  const currentUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleExpand = (userId) => {
    setExpandedUserId((prev) => (prev === userId ? null : userId));
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
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
    <div>
      <h2 className="text-xl font-semibold mb-6 text-center">All Users</h2>
      {users.length > 0 ? (
        <>
          <ul className="">
            {currentUsers.map((user, index) => (
              <li key={index} className={`p-4 mt-4 border border-gray-300 ${expandedUserId === user._id ? "bg-gray-50" : ""}`}>
                {/* User Summary */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {user.firstname || "N/A"} {user.lastname || ""}
                    </h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <p className="mt-1">
                      <span className="font-semibold">Mobile:</span> +91{" "}
                      {user.mobile || "N/A"}
                    </p>
                  </div>
                  <button
                    className="text-blue-500 underline text-sm"
                    onClick={() => toggleExpand(user._id)}
                  >
                    {expandedUserId === user._id ? "Collapse" : "Expand"}
                  </button>
                </div>

                {/* Expanded Details */}
                {expandedUserId === user._id && (
                  <div className="mt-4 text-gray-700">
                    <div className="mt-3">
                      <Orders userId={user._id} />
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>

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
        <p className="text-gray-500 text-center">No users found.</p>
      )}
    </div>
  );
};

export default Users;
