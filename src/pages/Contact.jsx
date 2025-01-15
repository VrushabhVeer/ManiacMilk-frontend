import emailjs from "emailjs-com";
import rightUpArrow from "../assets/icons/rightUpArrow.png";
import { contactInfo, address, icons } from "../utils/data.js";
import toast, { Toaster } from "react-hot-toast";
import copy from "../assets/icons/copy.png";
import check from "../assets/icons/check.png";
import { useState } from "react";

const Contact = () => {
  const [fullname, setFullname] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const validateForm = () => {
    if (!fullname || !mobile || !email || !message) {
      toast.error("Please fill out all fields.");
      return false;
    }
    if (!/^[a-zA-Z ]{2,30}$/.test(fullname)) {
      toast.error("Please enter a valid name.");
      return false;
    }
    if (!/^\d{10}$/.test(mobile)) {
      toast.error("Please enter a valid mobile number.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const templateParams = {
      to_email: "maniacmilkstore@gmail.com",
      from_name: fullname,
      from_email: email,
      message: message,
      mobile: mobile,
    };

    try {
      await emailjs.send(
        "service_huukivi", // Your Email.js service ID
        "template_yzrxes8", // Your Email.js template ID
        templateParams,
        "XReuypQAgE-m6QxC-" // Your Email.js user ID
      );
      toast.success("Your message sent successfully!");
      setFullname("");
      setMobile("");
      setEmail("");
      setMessage("");
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="hero w-full pb-20 pt-10">
      <div className="w-11/12 mx-auto flex flex-col md:flex-col lg:flex-row xl:flex-row items-center gap-10 md:gap-20">
        <div className="w-full">
          <h1 className="text-4xl font-extrabold text-[#1a1d20]">Contact Us</h1>
          <p className="mt-2 mb-10 text-gray-600">
            We’d love to hear from you! Whether you have questions, feedback, or
            need assistance, feel free to reach out through the form below. You
            can also connect with us via mobile or email. Let’s make your
            experience with us exceptional!
          </p>

          {contactInfo.map((info, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <img className="w-4" src={info.icon} alt={info.alt} loading="lazy" />
              <p>{info.text}</p>

              <button className="ml-2" onClick={() => handleCopy(info.text, index)}>
                {copiedIndex === index ? (
                  <img src={check} alt="Check" className="w-5" loading="lazy" />
                ) : (
                  <img src={copy} alt="Copy" className="w-4" loading="lazy" />
                )}
              </button>
            </div>
          ))}

          <div className="flex items-center gap-2 mt-8">
            <img className="w-5" src={icons.location} alt="Location Icon" loading="lazy" />
            <p className="font-semibold">Address</p>
          </div>
          <address className="mt-1 not-italic">
            {address.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </address>
        </div>

        <div className="w-full">
          <h1 className="text-4xl font-bold text-[#1a1d20]">Get In Touch</h1>
          <p className="text-gray-600 mt-1">
            Let us know how we can assist you!
          </p>

          <form onSubmit={handleSubmit} className="mt-8">
            <div className="">
              <input
                placeholder="Fullname"
                className="w-full bg-inherit rounded-md border outline-none border-gray-400 px-5 py-3 "
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                required
              />
            </div>

            <div className="mt-4">
              <input
                placeholder="Mobile Number"
                className="w-full bg-inherit rounded-md border outline-none border-gray-400 px-5 py-3 "
                type="number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </div>

            <div className="mt-4">
              <input
                placeholder="Email Address"
                className="w-full bg-inherit rounded-md border outline-none border-gray-400 px-5 py-3 "
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mt-4">
              <textarea
                placeholder="Message"
                className="w-full bg-inherit rounded-md border outline-none border-gray-400 px-5 py-3 h-40"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <button
              className="w-full bg-green-900 text-white py-3 rounded-full tracking-wide font-medium mt-5 flex items-center justify-center gap-2"
              type="submit"
            >
              Submit{" "}
              <img className="w-5" src={rightUpArrow} alt="right-up-arrow" />
            </button>
          </form>
        </div>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default Contact;