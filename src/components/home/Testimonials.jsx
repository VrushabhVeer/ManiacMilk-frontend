import InfiniteScroll from "./InfiniteScroll";

const Testimonials = () => {
  return (
    <div className="mt-20 md:mt-24 lg:mt-40 mb-10">
      <h2 className="text-xl md:text-3xl font-bold text-center">
        What customer&#39;s says
      </h2>
      <p className="text-center text-gray-500 mt-1 mb-8">
        Insights from Our Customer&lsquo;s Experiences
      </p>

      <InfiniteScroll />
    </div>
  );
};

export default Testimonials;
