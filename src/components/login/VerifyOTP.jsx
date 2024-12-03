/* eslint-disable react/prop-types */
import { useState } from "react";
import { otpVerification } from "../../utils/apis";

const VerifyOTP = ({ email }) => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const verifyOtp = async () => {
    try {
      const response = await otpVerification({ email, otp });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error verifying OTP");
    }
  };

  return (
    <div>
      <h3>Verify OTP</h3>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={verifyOtp}>Verify OTP</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default VerifyOTP;
