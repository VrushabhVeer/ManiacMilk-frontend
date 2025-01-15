import { Link } from "react-router-dom";
import { aboutContent, address } from "../utils/data";

const About = () => {
  const { header, description, highlights, whyChooseUs, mission, contact } =
    aboutContent;

  return (
    <div className="about-section hero w-full pb-20 pt-10">
      <div className="container mx-auto px-5 lg:px-20">
        {/* Header Section */}
        <h1 className="text-4xl font-extrabold text-center text-[#1a1d20] mb-2">
          {header}
        </h1>

        <p className="mt-2 mb-10 md:mb-20 text-gray-600 text-center md:w-[70%] mx-auto">{description}</p>

        {/* Highlights Section */}
        <div className="highlights bg-white shadow-md rounded-md p-5">
          <h2 className="text-2xl font-bold text-[#1a1d20] mb-6">Our Highlights</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-600">
            {highlights.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Why Choose Us Section */}
        <div className="why-choose-us mt-16 bg-white shadow-md rounded-md p-5">
          <h2 className="text-2xl font-bold text-[#1a1d20] mb-6">Why Choose Us?</h2>
          <p className="text-gray-600">{whyChooseUs}</p>
        </div>

        {/* Our Mission Section */}
        <div className="our-mission mt-16 bg-white shadow-md rounded-md p-5">
          <h2 className="text-2xl font-bold text-[#1a1d20] mb-6">Our Mission</h2>
          <p className="text-gray-600">{mission}</p>
        </div>

        {/* Contact Section */}
        <div className="contact-us mt-16 bg-white shadow-md rounded-md p-5">
          <h2 className="text-2xl font-bold text-[#1a1d20] mb-6">{contact.header}</h2>
          <p className="text-gray-600 mb-4">{contact.description}</p>
          <address className="mt-3 space-y-1">
            {address.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </address>
          <p className="text-blue-500 mt-4 text-sm">
            <Link to="/contact">{contact.linkText}</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
