import { useState } from "react";
import rightUpArrow from "../assets/icons/rightUpArrow.png";
import { contactUs } from "../utils/apis.js";
import { contactInfo, address, icons } from "../utils/data.js";
import { Toaster } from "react-hot-toast";

const Contact = () => {
  const [fullname, setFullname] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contactData = {
      fullname,
      mobile,
      email,
      message,
    };

    try {
      const response = await contactUs(contactData);
      console.log(response);
      setFullname("");
      setMobile("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="hero w-full pb-20 pt-10">
      <div className="w-11/12 mx-auto flex flex-col md:flex-col lg:flex-row xl:flex-row items-center gap-10 md:gap-20">
        <div className="w-full">
          <h1 className="text-4xl font-extrabold text-[#1a1d20]">Contact Us</h1>
          <p className="mt-2 mb-5 text-gray-600">
            We’d love to hear from you! Whether you have questions, feedback, or
            need assistance, feel free to reach out through the form below. You
            can also connect with us via mobile or email. Let’s make your
            experience with us exceptional!
          </p>

          {contactInfo.map((info, index) => (
            <div key={index} className="flex items-center gap-2">
              <img className="w-4" src={info.icon} alt={info.alt} loading="lazy" />
              <p>{info.text}</p>
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