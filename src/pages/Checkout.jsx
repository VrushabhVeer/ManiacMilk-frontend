import { useEffect, useRef, useState } from "react";
import rightUpArrow from "../assets/icons/rightUpArrow.png";
import down from "../assets/icons/down.png";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setAddress } from "../redux/addressSlice";
import { Link, useNavigate } from "react-router-dom";
import CartItems from "../components/common/CartItems";
import { addAddress, createUser, getAddress } from "../utils/apis";
import { logout, restoreSession } from "../redux/authSlice";
import { clearCart } from "../redux/cartSlice";

const Checkout = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
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
  const { isAuthenticated, userEmail, userId } = useSelector(
    (state) => state.auth
  );
  const savedAddress = useSelector((state) => state.address.address);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const saveAddressRef = useRef(null);

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  useEffect(() => {
    const loadAddress = async () => {
      if (isAuthenticated) {
        try {
          const response = await getAddress(userId);
          if (response.status === 200 && response.data) {
            dispatch(setAddress(response.data)); // Save data to Redux
          }
        } catch (error) {
          console.error("Failed to fetch address for logged-in user:", error);
        }
      } else {
        // For guest users, the `savedAddress` is already loaded from `localStorage` by the Redux slice.
      }
    };

    loadAddress();
  }, [isAuthenticated, userId, dispatch]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false); // Close dropdown when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    if (savedAddress) {
      setFirstname(savedAddress.firstname || "");
      setLastname(savedAddress.lastname || "");
      setMobile(savedAddress.mobile || "");
      setEmail(savedAddress.email || "");
      setHouse(savedAddress.house || "");
      setArea(savedAddress.area || "");
      setCity(savedAddress.city || "");
      setPincode(savedAddress.pincode || "");
      setState(savedAddress.state || "");
    }
  }, [savedAddress]);

  const validateInputs = () => {
    const errors = {};

    // Name validation
    if (!firstname.trim()) {
      errors.firstname = "Firstname is required.";
    }

    if (!lastname.trim()) {
      errors.lastname = "Lastname is required.";
    }

    // Mobile validation
    const mobileRegex = /^[6-9]\d{9}$/; // Indian mobile number format
    if (!mobile.trim()) {
      errors.mobile = "Mobile number is required.";
    } else if (!mobileRegex.test(mobile)) {
      errors.mobile = "Please enter a valid 10-digit mobile number.";
    }

    if (!isAuthenticated) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.trim()) {
        errors.email = "Email address is required.";
      } else if (!emailRegex.test(email)) {
        errors.email = "Please enter a valid email address.";
      }
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
      firstname,
      lastname,
      mobile,
      email: isAuthenticated ? userEmail : email,
      house,
      area,
      city,
      pincode,
      state,
    };

    const userData = {
      firstname,
      lastname,
      mobile,
      email,
    };

    // const saveAddressCheckbox = document.getElementById("saveAddress").checked;
    const saveAddressCheckbox = saveAddressRef.current
      ? saveAddressRef.current.checked
      : false;

    try {
      let currentUserId = userId;

      // Create a user only if not logged in
      if (!isAuthenticated || !userId) {
        const userResponse = await createUser(userData);
        if (userResponse.status === 200) {
          currentUserId = userResponse.data._id;
        } else {
          throw new Error("User creation failed.");
        }
      }

      // Proceed with saving the address
      if (saveAddressCheckbox || isAuthenticated) {
        const addressResponse = await addAddress({
          ...addressData,
          userId: currentUserId,
        });

        if (addressResponse.status === 201) {
          toast.success("Address saved successfully!");
          dispatch(setAddress({ ...addressData, userId: currentUserId }));
          navigate("/confirmation");
        } else {
          throw new Error("Failed to save the address.");
        }
      } else {
        // If address saving is not requested, proceed to confirmation
        dispatch(setAddress({ ...addressData, userId: currentUserId }));
        navigate("/confirmation");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Unable to proceed. Please try again.");
    }
  };

  const handleLogout = () => {
    try {
      dispatch(logout());
      dispatch(clearCart());
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch {
      toast.error("Failed to log out.");
    }
  };

  return (
    <div className="hero w-full pb-20 pt-10">
      <div className="w-11/12 md:w-10/12 mx-auto">
        <h1 className="text-2xl md:text-4xl font-extrabold text-[#1a1d20]">Checkout</h1>
        <p className="text-gray-600 mt-1">
          Enter your address & contact details below.
        </p>

        <div className="flex justify-between flex-col md:flex-row gap-10 md:gap-20 mt-10">
          <div className="w-full">
            {/* <form onSubmit={handleSubmit}> */}
            {isAuthenticated ? (
              <div>
                <p>Account</p>
                <div className="flex items-center justify-between">
                  <p className="text-gray-600">{userEmail}</p>

                  <div className="relative" ref={dropdownRef}>
                    <button className="bg-orange-50 px-2 py-1 rounded-md">
                      <img
                        className="w-5"
                        src={down}
                        alt="down-arrow"
                        loading="lazy"
                        onClick={handleDropdownToggle}
                      />
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-md rounded-md">
                        <p
                          className="block font-medium cursor-pointer text-orange-500 px-4 py-2 text-sm underline"
                          onClick={handleLogout}
                        >
                          Logout
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-between">
                  <h2 className="text-lg font-semibold">Contact Details</h2>
                  <p className="text-sm underline font-medium mt-2">
                    <Link
                      className="text-blue-500"
                      to="/login"
                      state={{ from: "/checkout" }}
                    >
                      Login
                    </Link>
                  </p>
                </div>
                <div className="mt-4">
                  <input
                    placeholder="Email Address"
                    className={`w-full bg-inherit rounded-md border outline-none px-5 py-3 ${
                      errors.email ? "border-red-500" : "border-gray-400"
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
            )}

            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>

              <div className="mt-4 flex flex-col md:flex-row items-center gap-4">
                <div className="w-full">
                  <input
                    placeholder="Firstname"
                    className={`w-full bg-inherit rounded-md border outline-none px-5 py-3 ${
                      errors.firstname ? "border-red-500" : "border-gray-400"
                    }`}
                    type="text"
                    name="firstname"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
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
                    className={`w-full bg-inherit rounded-md border outline-none px-5 py-3 ${
                      errors.lastname ? "border-red-500" : "border-gray-400"
                    }`}
                    type="text"
                    name="lastname"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
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
                  className={`w-full bg-inherit rounded-md border outline-none px-5 py-3 ${
                    errors.mobile ? "border-red-500" : "border-gray-400"
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
                  className={`w-full bg-inherit rounded-md border outline-none px-5 py-3 ${
                    errors.house ? "border-red-500" : "border-gray-400"
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
                  className={`w-full bg-inherit rounded-md border outline-none px-5 py-3 ${
                    errors.area ? "border-red-500" : "border-gray-400"
                  }`}
                  type="text"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                />
                {errors.area && (
                  <p className="text-red-500 text-sm mt-1">{errors.area}</p>
                )}
              </div>

              <div className="mt-4 flex flex-col md:flex-row items-center gap-4">
                <div className="w-full">
                  <input
                    placeholder="City"
                    className={`w-full bg-inherit rounded-md border outline-none px-5 py-3 ${
                      errors.city ? "border-red-500" : "border-gray-400"
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
                    className={`w-full bg-inherit rounded-md border outline-none px-5 py-3 ${
                      errors.pincode ? "border-red-500" : "border-gray-400"
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
                  className={`w-full bg-inherit rounded-md border outline-none px-5 py-3 ${
                    errors.state ? "border-red-500" : "border-gray-400"
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

            <div className="flex items-center gap-2 mt-5">
              {isAuthenticated && savedAddress && savedAddress.userId ? (
                <p className="text-orange-500">
                  We&lsquo;ve prefilled your details with your saved address.
                </p>
              ) : (
                <>
                  <input
                    type="checkbox"
                    id="saveAddress"
                    name="saveAddress"
                    className="bg-inherit w-5 h-5"
                    ref={saveAddressRef}
                  />
                  <label htmlFor="saveAddress">
                    Save address for next time.
                  </label>
                </>
              )}
            </div>

            {/* Button */}
            <button
              className="w-full bg-green-900 text-white py-3 rounded-full tracking-wide font-medium mt-8 flex items-center justify-center gap-2"
              type="submit"
              onClick={handleSubmit}
            >
              Continue To Payment
              <img className="w-5" src={rightUpArrow} alt="right-up-arrow" />
            </button>
            {/* </form*/}
          </div>

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
