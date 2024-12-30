import { highlightsData } from "../../utils/data";

const Highlights = () => {
  return (
    <div className="w-11/12 mx-auto mt-20 md:mt-24 lg:mt-40 mb-10 md:mb-20">
      <h1 className="text-center text-xl md:text-3xl font-bold text-[#1a1d20]">
        Our Highlights
      </h1>
      <p className="text-center text-gray-600 mt-1">
        Learn about our standout highlights and offerings.
      </p>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10 mt-10">
        {highlightsData.map((item, index) => (
          <div className="border p-5 rounded-md" key={index}>
            <img
              className="w-11 mx-auto md:mx-0"
              src={item.icon}
              alt={item.alt}
              loading="lazy"
            />

            <div className="text-center md:text-left">
              <h2 className="text-base md:text-lg mt-2 font-semibold text-[#1a1d20]">
                {item.title}
              </h2>
              <p className="mt-1 text-sm md:text-base text-gray-600">
                {item.description}
              </p>
            </div>
          </div>
        ))}

        {/* <div className="border p-5 rounded-md">
          <img
            className="w-10 mx-auto md:mx-0"
            src={hygiene}
            alt="hygiene"
            loading="lazy"
          />

          <div className="text-center md:text-left">
            <h2 className="text-base md:text-lg mt-2 font-semibold text-[#1a1d20]">
              Hygienically Produced
            </h2>
            <p className="mt-1 text-sm md:text-base text-gray-600">
              Strict hygiene protocols ensure healthy cows and high-quality
              milk.
            </p>
          </div>
        </div>

        <div className="border p-5 rounded-md">
          <img
            className="w-10 mx-auto md:mx-0"
            src={leaf}
            alt=""
            loading="lazy"
          />

          <div className="text-center md:text-left">
            <h2 className="text-base md:text-lg mt-2 font-semibold text-[#1a1d20]">
              100% Natural
            </h2>
            <p className="mt-1 text-sm md:text-base text-gray-600">
              Naturally grazed cows, fed wholesome fodder. No hormones,
              antibiotics, or preservatives—just pure milk.
            </p>
          </div>
        </div>

        <div className="border p-5 rounded-md">
          <img
            className="w-11 mx-auto md:mx-0"
            src={process}
            alt="process"
            loading="lazy"
          />

          <div className="text-center md:text-left">
            <h2 className="text-base md:text-lg mt-2 font-semibold text-[#1a1d20]">
              Unprocessed Milk
            </h2>
            <p className="mt-1 text-sm md:text-base text-gray-600">
              Fresh, unprocessed milk retains more vitamins, minerals, and
              natural flavor.
            </p>
          </div>
        </div>

        <div className="border p-5 rounded-md">
          <img
            className="w-12 mx-auto md:mx-0"
            src={antibiotics}
            alt="antibiotics"
            loading="lazy"
          />

          <div className="text-center md:text-left">
            <h2 className="text-base md:text-lg mt-2 font-semibold text-[#1a1d20]">
              No Antibiotics & Hormones
            </h2>
            <p className="mt-1 text-sm md:text-base text-gray-600">
              Milk is free from antibiotics and growth hormones, ensuring it’s
              safe and healthy.
            </p>
          </div>
        </div>

        <div className="border p-5 rounded-md">
          <img
            className="w-12 mx-auto md:mx-0"
            src={cattle}
            alt="cattle"
            loading="lazy"
          />

          <div className="text-center md:text-left">
            <h2 className="text-base md:text-lg mt-2 font-semibold text-[#1a1d20]">
              From Happy Cows
            </h2>
            <p className="mt-1 text-sm md:text-base text-gray-600">
              Cows are treated with care, quality feed, and comfortable living
              for better milk.
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Highlights;
