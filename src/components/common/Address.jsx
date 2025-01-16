/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setAddress,
  deleteAddress as clearReduxAddress,
} from "../../redux/addressSlice";
import toast from "react-hot-toast";
import editImage from "../../assets/icons/pen.png";
import closeImage from "../../assets/icons/close.png";
import {
  addAddress,
  deleteAddress,
  getAddress,
  updateAddress,
} from "../../utils/apis";
import Modal from "./Modal";

const Address = ({ isConfirmation }) => {
  const { address } = useSelector((state) => state.address);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { userId } = useSelector((state) => state.auth);
  const localStorageKey = "guestAddress";
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for delete confirmation modal

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.removeItem(localStorageKey);
    }
  }, [isAuthenticated]);

  // Local state for the form inputs
  const [formData, setFormData] = useState({
    firstname: address.firstname || "",
    lastname: address.lastname || "",
    mobile: address.mobile || "",
    email: address.email || "",
    house: address.house || "",
    area: address.area || "",
    city: address.city || "",
    pincode: address.pincode || "",
    state: address.state || "",
  });

  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    const errors = {};

    if (!formData.firstname.trim()) {
      errors.firstname = "Firstname is required.";
    }

    if (!formData.lastname.trim()) {
      errors.lastname = "Lastname is required.";
    }

    const mobileRegex = /^[6-9]\d{9}$/; // Indian mobile number format
    if (!formData.mobile.trim()) {
      errors.mobile = "Mobile number is required.";
    } else if (!mobileRegex.test(formData.mobile)) {
      errors.mobile = "Please enter a valid 10-digit mobile number.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = "Email address is required.";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!formData.house.trim()) {
      errors.house = "House/Flat number is required.";
    }
    if (!formData.area.trim()) {
      errors.area = "Area/Colony is required.";
    }
    if (!formData.city.trim()) {
      errors.city = "City is required.";
    }
    const pincodeRegex = /^\d{6}$/; // Indian pincode format
    if (!formData.pincode.trim()) {
      errors.pincode = "Pin code is required.";
    } else if (!pincodeRegex.test(formData.pincode)) {
      errors.pincode = "Please enter a valid 6-digit pin code.";
    }
    if (!formData.state.trim()) {
      errors.state = "State is required.";
    }

    return errors;
  };

  // Fetch address for logged-in user
  useEffect(() => {
    if (isAuthenticated && userId) {
      getAddress(userId)
        .then((response) => {
          if (response.data) {
            dispatch(setAddress(response.data)); // Update Redux state
          }
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false); // For guests, no API call is needed
    }
  }, [isAuthenticated, userId, dispatch, address]);

  // Handle edit button click
  const onEdit = () => {
    setFormData(address); // Prefill with current address
    setIsModalOpen(true); // Open the modal
  };

  // Handle delete button click
  const handleDelete = (id) => {
    const addressId = id;
    if (isAuthenticated && addressId) {
      deleteAddress(addressId)
        .then(() => {
          dispatch(clearReduxAddress());
          toast.success("Address deleted successfully!");
        })
        .catch((error) => {
          console.error("Error deleting address:", error);
          toast.error("Failed to delete address.");
        });
    } else {
      // Guest user: clear localStorage
      localStorage.removeItem(localStorageKey);
      // dispatch(setAddress({})); // Clear local state for guests
      dispatch(clearReduxAddress());
      toast.success("Address deleted successfully!");
    }

    setIsDeleteModalOpen(false);
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const addressPayload = { ...formData }; // Address data from the form
    if (isAuthenticated) {
      addressPayload.userId = userId; // Add userId for logged-in users
    }

    if (isAuthenticated) {
      // Check if address exists (if it has an _id), then update or add accordingly
      if (formData._id) {
        // If address exists, update it
        updateAddress(formData._id, addressPayload)
          .then((response) => {
            dispatch(setAddress(response.data)); // Update Redux state
            toast.success("Address updated successfully!");
          })
          .catch((error) => {
            console.error("Error updating address:", error);
            toast.error("Failed to update address.");
          });
      } else {
        // Otherwise, add new address
        addAddress(addressPayload)
          .then((response) => {
            dispatch(setAddress(response.data)); // Update Redux state
            toast.success("Address added successfully!");
          })
          .catch((error) => {
            console.error("Error adding address:", error);
            toast.error("Failed to add address.");
          });
      }
    } else {
      dispatch(setAddress(formData)); // Update local state for guests
      toast.success("Address updated successfully!");
    }

    setIsModalOpen(false);
    getAddress(userId);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Address Display */}
      <div className="flex items-center gap-20 md:gap-40 mb-2 w-full">
        <h4 className="font-semibold">Address</h4>
        <div>
          {isAuthenticated && address.firstname ? (
            <img
              className="w-4 cursor-pointer"
              src={editImage}
              alt="edit-image"
              onClick={onEdit}
            />
          ) : isAuthenticated ? (
            <button
              className="px-4 py-1 bg-inherit hover:bg-orange-50 text-orange-500 border border-orange-500 rounded-md"
              onClick={() => setIsModalOpen(true)}
            >
              + Add
            </button>
          ) : (
            <img
              className="w-4 cursor-pointer"
              src={editImage}
              alt="edit-image"
              onClick={onEdit}
            />
          )}
        </div>
      </div>

      {address.firstname ? (
        <>
          <div>
            <div className="text-gray-600">
              <p>
                {address.firstname} {address.lastname}
              </p>
              <p>{address.email}</p>
              <p>
                {address.house}, {address.area},
              </p>
              <p>
                {address.city}, {address.state}, {address.pincode}
              </p>
              <p>India</p>
              <p>+91 {address.mobile}</p>
            </div>
            {isConfirmation ? (
              ""
            ) : (
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-md mt-3 text-sm"
              >
                Delete
              </button>
            )}
          </div>
        </>
      ) : (
        <p className="text-sm">No address available. Please add one.</p>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold">Edit Address</h3>
              <img
                className="w-5 cursor-pointer"
                src={closeImage}
                alt="close-image"
                loading="lazy"
                onClick={() => setIsModalOpen(false)}
              />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mt-4 flex flex-col md:flex-row items-center gap-4">
                <div className="w-full">
                  <input
                    placeholder="Firstname"
                    className={`w-full bg-inherit rounded-md border outline-none px-5 py-3 ${errors.firstname ? "border-red-500" : "border-gray-400"
                      }`}
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                  />
                  {errors.firstname && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.firstname}
                    </p>
                  )}
                </div>

                <div className="w-full">
                  <input
                    placeholder="Lastname"
                    className={`w-full bg-inherit rounded-md border outline-none px-5 py-3 ${errors.lastname ? "border-red-500" : "border-gray-400"
                      }`}
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                  />
                  {errors.lastname && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.lastname}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <input
                  placeholder="Mobile No"
                  className={`w-full bg-inherit rounded-md border outline-none px-5 py-3 ${errors.mobile ? "border-red-500" : "border-gray-400"
                    }`}
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                />
                {errors.mobile && (
                  <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
                )}
              </div>

              <div className="mt-4">
                <input
                  placeholder="Email Address"
                  className={`w-full bg-inherit rounded-md border outline-none px-5 py-3 ${errors.email ? "border-red-500" : "border-gray-400"
                    }`}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div className="mt-4">
                <input
                  placeholder="House/Flat No"
                  className={`w-full bg-inherit rounded-md border outline-none px-5 py-3 ${errors.house ? "border-red-500" : "border-gray-400"
                    }`}
                  type="text"
                  name="house"
                  value={formData.house}
                  onChange={handleChange}
                />
                {errors.house && (
                  <p className="text-red-500 text-sm mt-1">{errors.house}</p>
                )}
              </div>

              <div className="mt-4">
                <input
                  placeholder="Area/Colony"
                  className={`w-full bg-inherit rounded-md border outline-none px-5 py-3 ${errors.area ? "border-red-500" : "border-gray-400"
                    }`}
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                />
                {errors.area && (
                  <p className="text-red-500 text-sm mt-1">{errors.area}</p>
                )}
              </div>

              <div className="mt-4 flex flex-col md:flex-row items-center gap-4">
                <div className="w-full">
                  <input
                    placeholder="City"
                    className={`w-full bg-inherit rounded-md border outline-none px-5 py-3 ${errors.city ? "border-red-500" : "border-gray-400"
                      }`}
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                  )}
                </div>

                <div className="w-full">
                  <input
                    placeholder="Pin Code"
                    className={`w-full bg-inherit rounded-md border outline-none px-5 py-3 ${errors.pincode ? "border-red-500" : "border-gray-400"
                      }`}
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                  />
                  {errors.pincode && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.pincode}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <input
                  placeholder="State"
                  className={`w-full bg-inherit rounded-md border outline-none px-5 py-3 ${errors.state ? "border-red-500" : "border-gray-400"
                    }`}
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
                {errors.state && (
                  <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                )}
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-black rounded-md"
                  onClick={() => setIsModalOpen(false)} // Close modal on cancel
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-md"
                >
                  Update Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <Modal
          isOpen={isDeleteModalOpen}
          title="Delete Address"
          message="Are you sure you want to delete this address?"
          onConfirm={() => handleDelete(address._id)}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Address;
