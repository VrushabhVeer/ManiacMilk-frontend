/* eslint-disable react/prop-types */
import { useState } from "react";
import { otpVerification } from "../../utils/apis";
import { Toaster, toast } from "react-hot-toast";
import rightArrow from "../../assets/icons/rightArrow.png";

const VerifyOTP = ({ email }) => {
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    const errors = {};

    // OTP validation
    if (!otp.trim()) {
      errors.otp = "OTP is required.";
    } else if (otp.length !== 6 || isNaN(otp)) {
      errors.otp = "Please enter a valid 6-digit OTP.";
    }

    setErrors(errors);

    // Show a toast if there are validation errors
    if (Object.keys(errors).length > 0) {
      toast.error("Please correct the errors before submitting.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Exit early if validation fails
    if (!validateInputs()) {
      return;
    }

    try {
      const response = await otpVerification({ email, otp });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error verifying OTP.");
    }
  };

  return (
    <div className="hero w-full h-[80vh] flex items-center justify-center pb-20 pt-10">
      <div className="w-11/12 md:w-6/12 lg:w-4/12 mx-auto">
        <h1 className="text-4xl font-extrabold text-[#1a1d20]">Enter Code</h1>
        <p className="text-gray-600 mt-2">Sent to {email}</p>

        <form onSubmit={handleSubmit} className="mt-8">
          <input
            type="text"
            placeholder="Enter OTP"
            className={`w-full bg-inherit rounded-md border px-5 py-3 outline-none ${errors.otp ? "border-red-500" : "border-gray-400"
              }`}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          {errors.otp && <p className="text-red-500 text-sm mt-1">{errors.otp}</p>}

          <button
            className="w-full bg-green-900 text-white py-3 rounded-full tracking-wide font-medium mt-8 flex items-center justify-center gap-2"
            type="submit"
          >
            Submit <img className="w-5" src={rightArrow} alt="right-up-arrow" />
          </button>
        </form>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default VerifyOTP;
