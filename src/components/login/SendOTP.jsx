/* eslint-disable react/prop-types */
import { useState } from "react";
import { login } from "../../utils/apis";
import { Toaster, toast } from "react-hot-toast";
import rightArrow from "../../assets/icons/rightArrow.png";

const SendOTP = ({ onSuccess }) => {
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});

    const validateInputs = () => {
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email.trim()) {
            errors.email = "Email address is required.";
        } else if (!emailRegex.test(email)) {
            errors.email = "Please enter a valid email address.";
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

        try {
            const response = await login({ email });
            toast.success(response.data.message);
            onSuccess(email);
        } catch (error) {
            toast.error(error.response?.data?.message || "An unexpected error occurred.");
        }
    };

    return (
        <div className="hero w-full h-[80vh] flex items-center justify-center pb-20 pt-10">
            <div className="w-11/12 md:w-6/12 lg:w-4/12 mx-auto">
                <h1 className="text-4xl font-extrabold text-[#1a1d20]">Login</h1>
                <p className="text-gray-600 mt-2">Enter your email and we&apos;ll send you a login code.</p>

                <form onSubmit={handleSubmit} className="mt-8">
                    <input
                        type="email"
                        placeholder="Email Address"
                        className={`w-full bg-inherit rounded-md border px-5 py-3 outline-none ${errors.email ? "border-red-500" : "border-gray-400"}`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}

                    <button
                        className="w-full bg-green-900 text-white py-3 rounded-full tracking-wide font-medium mt-8 flex items-center justify-center gap-2"
                        type="submit"
                    >
                        Continue <img className="w-5" src={rightArrow} alt="right-up-arrow" />
                    </button>
                </form>
            </div>
            <Toaster position="bottom-center" />
        </div>
    );
};

export default SendOTP;