import { Link } from "react-router-dom";
import leftArrow from "../assets/icons/leftArrow.png";
import errorImage from "../assets/images/error.png";

const NotFound = () => {
  return (
    <div className="hero pb-20 text-center">
      <div className="w-full md:w-8/12 lg:w-3/12 mx-auto">
        <img
          className="w-full"
          src={errorImage}
          alt="error-image"
          loading="lazy"
        />
      </div>
      <h1 className="text-4xl md:text-6xl font-bold">Oops!</h1>
      <p className="text-gray-600 mt-3 font-medium">
        We couldnt find the page you were looking for.
      </p>
      <div className="flex items-center justify-center">
        <Link to="/">
          <button className="bg-green-900 text-white px-6 py-3 rounded-full tracking-wide font-medium mt-8 flex items-center gap-2">
            <img className="w-5" src={leftArrow} alt="left-arrow" /> Go home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
