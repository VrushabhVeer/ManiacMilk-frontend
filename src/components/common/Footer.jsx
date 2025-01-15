import { Link } from "react-router-dom";
import logo from "../../assets/icons/cow.png";
import { policies, socialMedia, address } from "../../utils/data.js";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#1a1d20] text-gray-200">
      <div className="w-11/12 mx-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 py-10 gap-10">
        {/* Logo Section */}
        <div>
          <Link to="/" className="flex items-center gap-2">
            <img
              className="w-6 md:w-8"
              src={logo}
              alt="Maniac Milk Logo"
              loading="lazy"
            />
            <div>
              <h1 className="font-gloria text-[#b5c6f9] text-sm md:text-base tracking-tight">
                maniac
              </h1>
              <h1 className="font-gloria text-[#b5c6f9] text-sm md:text-base tracking-tight mt-[-6px]">
                milk
              </h1>
            </div>
          </Link>
          <p className="mt-1 text-sm">Fresh from Farm to You.</p>
        </div>

        {/* Policy Section */}
        <div>
          <h3 className="font-semibold">Policy</h3>
          <ul className="mt-3 space-y-1">
            {policies.map((policy, index) => (
              <li key={index} className="hover:underline">
                 <Link to={policy.path}>{policy.text}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Address Section */}
        <div>
          <h3 className="font-semibold">Address</h3>
          <address className="mt-3 space-y-1">
            {address.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </address>
        </div>

        {/* Social Media Section */}
        <div>
          <h3 className="font-semibold">Follow Us</h3>
          <div className="flex items-center gap-4 mt-3">
            {socialMedia.map((media, index) => (
              <a
                key={index}
                href={media.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={media.alt}
              >
                <img
                  className="w-7"
                  src={media.src}
                  alt={media.alt}
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center py-4 border-t border-gray-400">
        <p className="text-sm">Copyright © Maniac Milk, {currentYear}</p>
      </div>
    </footer>
  );
};

export default Footer;
