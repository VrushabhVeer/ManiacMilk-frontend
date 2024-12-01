import { Link } from "react-router-dom";
import rightArrow from "../assets/icons/rightArrow.png";
import show from "../assets/icons/show.png";
import hide from "../assets/icons/hide.png";
import { useState } from "react";
import { login } from "../utils/apis";
import { Toaster, toast } from "react-hot-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const validateInputs = () => {
    const errors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email address.";
    }

    // Password validation
    if (!password.trim()) {
      errors.password = "Password is required.";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
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

    const loginData = {
      email,
      password,
    };

    try {
      const response = await login(loginData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="hero w-full pb-20 pt-10">
      <div className="w-11/12 md:w-6/12 lg:w-4/12 mx-auto">
        <h1 className="text-4xl font-extrabold text-[#1a1d20]">Welcome Back</h1>
        <p className="text-gray-600 mt-1">Login to your account.</p>

        <form onSubmit={handleSubmit} className="mt-8">
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
          <div className="mt-4 relative">
            <input
              placeholder="Password"
              className={`w-full bg-inherit rounded-md border outline-none px-5 py-3 pr-10 ${errors.password ? "border-red-500" : "border-gray-400"
                }`}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1 absolute -bottom-5">{errors.password}</p>
            )}
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <img className="w-5" src={show} alt="show-icon" />
              ) : (
                <img className="w-5" src={hide} alt="hide-icon" />
              )}
            </button>
          </div>

          <button
            className="w-full bg-green-900 text-white py-3 rounded-full tracking-wide font-medium mt-8 flex items-center justify-center gap-2"
            type="submit"
          >
            Login <img className="w-5" src={rightArrow} alt="right-up-arrow" />
          </button>
        </form>

        <p className="mt-5">
          New to Maniac Milk{" "}
          <Link className="text-blue-500" to="/signup">
            Signup.
          </Link>
        </p>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default Login;
