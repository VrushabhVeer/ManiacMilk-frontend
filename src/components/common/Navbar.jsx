import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/icons/cow.png";
import bag from "../../assets/icons/bag.png";
import user from "../../assets/icons/user.png";
import { useSelector } from "react-redux";
import { selectCartDetails } from "../../redux/cartSlice";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollUp, setScrollUp] = useState(false);
  const { totalItemsInCart } = useSelector(selectCartDetails);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { data: profile } = useSelector((state) => state.profile);
  const location = useLocation();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolledUp = window.scrollY > 0;
      setScrollUp(isScrolledUp);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`w-full bg-white sticky top-0 z-50 border ${scrollUp ? "shadow-md" : ""
          }`}
      >
        <div className="w-11/12 mx-auto flex flex-row md:flex-row lg:flex-row py-4 items-center justify-between">
          <button className="lg:hidden" onClick={handleToggle}>
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>

          <Link state={{ from: location.pathname }} to="/">
            <div className="flex items-center gap-2">
              <img className="w-6 md:w-8" src={logo} alt="logo" />
              <div>
                <h1 className="font-gloria text-[#2c3b69] text-sm md:text-base tracking-tight">
                  maniac
                </h1>
                <h1 className="font-gloria text-[#2c3b69] text-sm md:text-base tracking-tight mt-[-6px]">
                  {" "}
                  milk
                </h1>
              </div>
            </div>
          </Link>

          <div className="hidden md:hidden lg:flex font-medium items-center space-x-8">
            <Link state={{ from: location.pathname }} to="/">
              <p>Home</p>{" "}
            </Link>
            <Link state={{ from: location.pathname }} to="/products">
              <p>Products</p>{" "}
            </Link>
            <Link state={{ from: location.pathname }} to="/about">
              <p>About</p>{" "}
            </Link>
            <Link state={{ from: location.pathname }} to="/contact">
              <p>Contact Us</p>{" "}
            </Link>
          </div>

          <div className="flex space-x-5">
            <Link to="/login">
              <p className="font-medium">{isAuthenticated ? "Logout" : "Login"}</p>
              <p className="text-[11px] mt-[-3px]">{profile?.firstname}</p>
            </Link>

            <Link state={{ from: location.pathname }} to="/cart" className="relative">
              <img className="w-6" src={bag} alt="bag" loading="lazy" />
              {totalItemsInCart > 0 && (
                <span className="absolute top-[-4px] left-[13px] bg-green-700 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {totalItemsInCart}
                </span>
              )}
            </Link>

            <Link state={{ from: location.pathname }} to="/profile">
              <img className="w-6" src={user} alt="user" loading="lazy" />
            </Link>

          </div>
        </div>

        {isOpen ? (
          <div className="pb-8 pt-4 pl-4 lg:hidden">
            <div className="flex flex-col space-y-5 ml-2 font-medium">
              <Link state={{ from: location.pathname }} to="/">
                <p>Home</p>{" "}
              </Link>
              <Link state={{ from: location.pathname }} to="/products">
                <p>Products</p>{" "}
              </Link>
              <Link state={{ from: location.pathname }} to="/contact">
                <p>Contact Us</p>{" "}
              </Link>
              <Link to="/login">
                <p>Login</p>{" "}
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
