import InfiniteScroll from "./InfiniteScroll";

const Testimonials = () => {
  return (
    <div>
      <h2 className="text-2xl md:text-4xl font-bold mt-24 text-center">
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
