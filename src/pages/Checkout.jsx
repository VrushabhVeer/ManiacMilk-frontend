import { useState } from "react";
import rightUpArrow from "../assets/icons/rightUpArrow.png";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAddress } from "../redux/addressSlice";
import { Link, useNavigate } from "react-router-dom";
import CartItems from "../components/common/CartItems";
import { createUser } from "../utils/apis";

const Checkout = () => {
  const [fullname, setFullname] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [house, setHouse] = useState("");
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateInputs = () => {
    const errors = {};

    // Fullname validation
    if (!fullname.trim()) {
      errors.fullname = "Fullname is required.";
    }

    // Mobile validation
    const mobileRegex = /^[6-9]\d{9}$/; // Indian mobile number format
    if (!mobile.trim()) {
      errors.mobile = "Mobile number is required.";
    } else if (!mobileRegex.test(mobile)) {
      errors.mobile = "Please enter a valid 10-digit mobile number.";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errors.email = "Email address is required.";
    } else if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email address.";
    }

    // Address validations
    if (!house.trim()) {
      errors.house = "House/Flat number is required.";
    }
    if (!area.trim()) {
      errors.area = "Area/Colony is required.";
    }
    if (!city.trim()) {
      errors.city = "City is required.";
    }

    // Pincode validation
    const pincodeRegex = /^\d{6}$/; // Indian pincode format
    if (!pincode.trim()) {
      errors.pincode = "Pin code is required.";
    } else if (!pincodeRegex.test(pincode)) {
      errors.pincode = "Please enter a valid 6-digit pin code.";
    }

    // State validation
    if (!state.trim()) {
      errors.state = "State is required.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      toast.error("Please correct the errors before submitting.");
      return;
    }

    const addressData = {
      fullname,
      mobile,
      email,
      house,
      area,
      city,
      pincode,
      state,
    };

    const userData = {
      fullname,
      mobile,
      email,
    };

    try {
      // Call the API to create or fetch the user
      const response = await createUser(userData);

      if (response.status === 200) {
        const user = response.data;
        dispatch(setAddress({ ...addressData, userId: user._id }));
        navigate("/confirmation");
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Unable to proceed. Please try again.");
    }
  };

  return (
    <div className="hero w-full pb-20 pt-10">
      <div className="w-11/12 md:w-10/12 mx-auto">
        <h1 className="text-4xl font-extrabold text-[#1a1d20]">Checkout</h1>
        <p className="text-gray-600 mt-1">
          Enter your address & contact details below.
        </p>

        <div className="flex justify-between flex-col md:flex-row gap-10 md:gap-20 mt-10">
          <form onSubmit={handleSubmit} className="w-full">
            <div>
              <div className="flex justify-between ">
                <h2 className="text-lg font-semibold">Contact Details</h2>
                <p className="text-sm underline font-medium mt-2">
                  <Link className="text-blue-500" to="/login">
                    Login
                  </Link>
                </p>
              </div>
              <div className="mt-4">
                <input
                  placeholder="Email Address"
                  className={`w-full bg-inherit rounded-md border outline-none px-5 py-3 ${errors.email ? "border-red-500" : "border-gray-400"
                    }`}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>

              <div className="mt-4">
                <input
                  placeholder="Fullname"
                  className={`w-full bg-inherit rounded-md border outline-none px-5 py-3 ${errors.fullname ? "border-red-500" : "border-gray-400"
                    }`}
                  type="text"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
                {errors.fullname && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullname}</p>
                )}
              </div>

              <div className="mt-4">
                <input
                  placeholder="Mobile No"
                  className={`w-full bg-inherit rounded-md border outline-none px-5 py-3 ${errors.mobile ? "border-red-500" : "border-gray-400"
                    }`}
                  type="text"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
                {errors.mobile && (
                  <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
                )}
              </div>

              <div className="mt-4">
                <input
                  placeholder="House/Flat No"
                  className={`w-full bg-inherit rounded-md border outline-none px-5 py-3 ${errors.house ? "border-red-500" : "border-gray-400"
                    }`}
                  type="text"
                  value={house}
                  onChange={(e) => setHouse(e.target.value)}
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
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                />
                {errors.area && (
                  <p className="text-red-500 text-sm mt-1">{errors.area}</p>
                )}
              </div>

              <div className="mt-4 flex items-center gap-4">
                <div className="w-full">
                  <input
                    placeholder="City"
                    className={`w-full bg-inherit rounded-md border outline-none px-5 py-3 ${errors.city ? "border-red-500" : "border-gray-400"
                      }`}
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
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
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
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
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
                {errors.state && (
                  <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                )}
              </div>
            </div>
            {/* Button */}
            <button
              className="w-full bg-green-900 text-white py-3 rounded-full tracking-wide font-medium mt-8 flex items-center justify-center gap-2"
              type="submit"
            >
              Continue To Payment
              <img className="w-5" src={rightUpArrow} alt="right-up-arrow" />
            </button>
          </form>

          <div className="w-full">
            <CartItems />
          </div>
        </div>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default Checkout;
