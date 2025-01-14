/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import rightArrow from "../../assets/icons/rightArrow.png";
import { verifyOtp } from "../../redux/authSlice";
import { mergeGuestCart } from "../../redux/cartSlice";

const VerifyOTP = ({ redirectPath, email }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const validateInputs = () => {
    const errors = {};

    // OTP validation
    if (otp.some((digit) => digit === "")) {
      errors.otp = "All fields are required.";
    } else if (otp.some((digit) => isNaN(digit))) {
      errors.otp = "Please enter valid digits.";
    }

    setErrors(errors);

    if (Object.keys(errors).length > 0) {
      toast.error("Please correct the errors before submitting.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    const fullOtp = otp.join("");
    const resultAction = await dispatch(verifyOtp({ email, otp: fullOtp }));

    if (verifyOtp.fulfilled.match(resultAction)) {
      // Trigger the mergeGuestCart thunk if user logs in successfully
      const userId = resultAction.payload.user._id;
      const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
      if (guestCart.length) {
        await dispatch(mergeGuestCart({ userId, guestCart }));
        localStorage.removeItem("guestCart"); // Clear guest cart from localStorage
      }
      navigate(redirectPath, { replace: true });
    }
  };

  const handleInputChange = (e, index) => {
    const value = e.target.value;

    if (!isNaN(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next field if available
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d{6}$/.test(pasteData)) {
      setOtp(pasteData.split(""));
      inputRefs.current[5].focus();
    }
    e.preventDefault();
  };

  return (
    <div className="hero w-full h-[80vh] flex items-center justify-center pb-20 pt-10">
      <div className="w-11/12 md:w-6/12 lg:w-4/12 mx-auto">
        <h1 className="text-4xl font-extrabold text-[#1a1d20]">Enter Code</h1>
        <p className="text-gray-600 mt-2">Sent to {email}</p>

        <form onSubmit={handleSubmit} className="mt-8">
          <div className="flex justify-between">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                value={digit}
                onChange={(e) => handleInputChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className={`w-12 md:w-16 h-12 md:h-16 text-center text-lg bg-inherit rounded-md border ${errors.otp ? "border-red-500" : "border-gray-400"
                  } outline-none`}
                maxLength="1"
              />
            ))}
          </div>
          {errors.otp && (
            <p className="text-red-500 text-sm mt-2">{errors.otp}</p>
          )}

          <button
            className="w-full bg-green-900 text-white py-3 rounded-full tracking-wide font-medium mt-8 flex items-center justify-center gap-2"
            type="submit"
          >
            Submit <img className="w-5" src={rightArrow} alt="right-up-arrow" />
          </button>
        </form>
        <p className="text-red-500 text-sm mt-4">
          The OTP is valid for 15 minutes and will expire thereafter.
        </p>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default VerifyOTP;
