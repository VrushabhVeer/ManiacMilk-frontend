import heroImage from "../../assets/images/heroImage.jpg";
import rightArrow from "../../assets/icons/rightArrow.png";
import leaf from "../../assets/icons/leaf.png";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero flex items-center flex-col-reverse md:flex-col-reverse lg:flex-row xl:flex-row gap-6 md:gap-0">
      <div className="w-full">
        <div className="w-11/12 md:w-11/12 lg:w-10/12 mx-auto">
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#1a1d20] leading-tight md:leading-tight">
            Get Organic & Fresh <br /> Dairy Products
          </h1>
          <p className="mt-4 text-gray-600">
            Experience the freshness and purity of our high-quality milk
            products, sourced from local farms. Whether you are enjoying a glass
            of milk, making your favorite recipe, or treating yourself to dairy
            delights, we ensure every product is as fresh as nature intended.
          </p>

          <div className="mt-8 flex">
            <Link to="/products">
              <button className="bg-green-900 text-white px-6 py-3 rounded-full tracking-wide font-medium flex items-center gap-2">
                Explore Now{" "}
                <img className="w-4" src={rightArrow} alt="right-arrow" loading="lazy" />
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full relative">
        <img
          className="w-full h-[60vh] md:h-[80vh] object-cover"
          src={heroImage}
          alt="hero-image"
          loading="lazy"
        />

        <div className="absolute top-10 md:top-20 left-5 md:left-10 p-3 bg-white bg-opacity-70 rounded-lg">
          <p className="text-sm md:text-base">
            Forest Grazed <br /> Happy Cows
          </p>
        </div>

        <div className="absolute bottom-5 md:bottom-10 right-5 md:right-20 p-3 bg-white bg-opacity-70 rounded-lg">
          <p className="text-sm md:text-base">
            Free of Antibiotics <br /> & Hormones
          </p>
        </div>

        <div className="absolute bottom-20 md:bottom-20 left-5 md:left-20 p-3 bg-white bg-opacity-70 rounded-lg">
          <h2 className="text-xl font-bold text-[#1a1d20]">100%</h2>
          <div className="flex items-center gap-2">
            <p className="text-sm md:text-base">Natural</p>
            <img className="w-6" src={leaf} alt="leaf" loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
