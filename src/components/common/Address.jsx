import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editAddress } from "../../redux/addressSlice";
import toast from "react-hot-toast";
import editImage from "../../assets/icons/pen.png";

const Address = () => {
  const { address } = useSelector((state) => state.address);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Local state for the form inputs
  const [formData, setFormData] = useState({
    fullname: address.fullname || "",
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

    if (!formData.fullname.trim()) {
      errors.fullname = "Fullname is required.";
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

  // Handle edit button click
  const onEdit = () => {
    setFormData(address); // Prefill with current address
    setIsModalOpen(true); // Open the modal
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    dispatch(editAddress(formData)); // Dispatch edit action
    setIsModalOpen(false); // Close the modal
    toast.success("Address updated successfully!");
  };

  return (
    <div>
      {/* Address Display */}
      <div className="flex items-center justify-between mb-4 w-full">
        <h4 className="font-semibold text-lg">Address</h4>
        <img
          className="w-5 mt-2 cursor-pointer"
          src={editImage}
          alt="edit-image"
          loading="lazy"
          onClick={onEdit}
        />
      </div>
      <p>{address.fullname || "N/A"}</p>
      <p className="text-gray-600">{address.email || "N/A"}</p>
      <p className="text-gray-600">
        {address.house}, {address.area}, {address.city}
      </p>
      <p className="text-gray-600">
        {address.state}, {address.pincode}
      </p>
      <p className="text-gray-600">+91 {address.mobile || "N/A"}</p>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Edit Address</h3>
            <form onSubmit={handleSubmit}>
              <div className="mt-4">
                <input
                  placeholder="Fullname"
                  className={`w-full bg-inherit rounded-md border outline-none px-5 py-3 ${errors.fullname ? "border-red-500" : "border-gray-400"}`}
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                />
                {errors.fullname && <p className="text-red-500 text-sm mt-1">{errors.fullname}</p>}
              </div>

              <div className="mt-4">
                <input
                  placeholder="Mobile No"
                  className={`w-full bg-inherit rounded-md border outline-none px-5 py-3 ${errors.mobile ? "border-red-500" : "border-gray-400"}`}
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                />
                {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
              </div>

              <div className="mt-4">
                <input
                  placeholder="Email Address"
                  className={`w-full bg-inherit rounded-md border outline-none px-5 py-3 ${errors.email ? "border-red-500" : "border-gray-400"}`}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div className="mt-4">
                <input
                  placeholder="House/Flat No"
                  className={`w-full bg-inherit rounded-md border outline-none px-5 py-3 ${errors.house ? "border-red-500" : "border-gray-400"}`}
                  type="text"
                  name="house"
                  value={formData.house}
                  onChange={handleChange}
                />
                {errors.house && <p className="text-red-500 text-sm mt-1">{errors.house}</p>}
              </div>

              <div className="mt-4">
                <input
                  placeholder="Area/Colony"
                  className={`w-full bg-inherit rounded-md border outline-none px-5 py-3 ${errors.area ? "border-red-500" : "border-gray-400"}`}
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                />
                {errors.area && <p className="text-red-500 text-sm mt-1">{errors.area}</p>}
              </div>

              <div className="mt-4 flex flex-col md:flex-row items-center gap-4">
                <div className="w-full">
                  <input
                    placeholder="City"
                    className={`w-full bg-inherit rounded-md border outline-none px-5 py-3 ${errors.city ? "border-red-500" : "border-gray-400"}`}
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>

                <div className="w-full">
                  <input
                    placeholder="Pin Code"
                    className={`w-full bg-inherit rounded-md border outline-none px-5 py-3 ${errors.pincode ? "border-red-500" : "border-gray-400"}`}
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                  />
                  {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
                </div>
              </div>

              <div className="mt-4">
                <input
                  placeholder="State"
                  className={`w-full bg-inherit rounded-md border outline-none px-5 py-3 ${errors.state ? "border-red-500" : "border-gray-400"}`}
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
                {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
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
    </div>
  );
};

export default Address;

